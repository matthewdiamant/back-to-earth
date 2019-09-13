import Debris from "./Debris.js";

import {
  fireMainWeapon,
  fireSecondaryWeapon,
  fireMissile,
  fireBeam
} from "./weaponsHelper.js";

import shipDesigns from "./constants/ship-designs.js";
import shipLevels from "./constants/ship-levels.js";

let yaw = 3.4,
  turnSpeed = 0.05,
  maxSpeed = 1,
  acceleration = 0.01,
  size = 20,
  mainLaserCooldown = 0.3,
  secondaryLaserCooldown = 0.2,
  missileCooldown = 0.2,
  state = {
    engineOn: false
  },
  haloSize = 0;

function getClosestEnemy(x, y, enemies, maxDistance) {
  let closestEnemy = null;
  let closestEnemyDistance = 99999999;
  enemies.forEach(enemy => {
    if (enemy.exploding) return;
    let dx = enemy.x - x;
    let dy = enemy.y - y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > maxDistance) return;
    if (distance < closestEnemyDistance) {
      closestEnemy = enemy;
      closestEnemyDistance = distance;
    }
  });
  return closestEnemy;
}

export default class Ship {
  constructor() {
    this.x = 85;
    this.y = -400;
    this.dx = -0.1;
    this.dy = 0.5;
    this.projectiles = [];
    this.landed = false;
    this.ore = 0;
    this.timeout = 0;
    this.level = 0;
    this.shipLevels = shipLevels;
    this.maxHealth = 10;
    this.health = 10;
    this.healed = false;
    this.exploding = false;
    this.size = size;
    this.mainLaserCanFire = true;
    this.secondaryLaserCanFire = false;
    this.secondaryLaserPosition = 1;
    this.missileCanFire = false;
    this.missilePosition = 1;
    this.beamCanFire = false;
  }

  getX() {
    return this.x;
  }

  getY() {
    return this.y;
  }

  setDx(d) {
    this.dx = d;
  }

  setDy(d) {
    this.dy = d;
  }

  takeDamage({ damage }) {
    this.health -= damage;
    if (this.health <= 0) {
      this.exploding = true;
      this.debris = Array(100)
        .fill()
        .map(d => new Debris({ x: this.x, y: this.y, color: "#aa3" }))
        .concat(
          Array(100)
            .fill()
            .map(d => new Debris({ x: this.x, y: this.y, color: "#a33" }))
        );
      this.lifeSpan = 80;
    }
  }

  heal() {
    this.health = shipLevels[this.level].maxHealth;
  }

  setLevel(level) {
    ({
      turnSpeed,
      maxSpeed,
      acceleration,
      mainLaserCooldown,
      secondaryLaserCooldown,
      missileCooldown
    } = shipLevels[level]);

    this.mainLaserCanFire = shipLevels[level].mainLaserCanFire;
    this.secondaryLaserCanFire = shipLevels[level].secondaryLaserCanFire;
    this.missileCanFire = shipLevels[level].missileCanFire;
    this.beamCanFire = shipLevels[level].beamCanFire;
    this.maxHealth = shipLevels[level].maxHealth;
    this.level = level;
  }

  weaponsTick(keyboard, sound, enemies) {
    if (keyboard.isDown(keyboard.SPACE)) {
      let closestEnemy = getClosestEnemy(this.x, this.y, enemies, 260);
      fireMainWeapon({
        canFire: this.mainLaserCanFire,
        cooldown: mainLaserCooldown,
        x: this.x + (Math.sin(yaw) * size) / 2,
        y: this.y - (Math.cos(yaw) * size) / 2,
        yaw,
        type: "main-laser",
        owner: this,
        sound: () => sound.mainLaser()
      });
      fireSecondaryWeapon({
        canFire: this.secondaryLaserCanFire,
        cooldown: secondaryLaserCooldown,
        x: this.secondaryLaserPosition * Math.cos(yaw) * (size / 2) + this.x,
        y: this.secondaryLaserPosition * Math.sin(yaw) * (size / 2) + this.y,
        size,
        yaw,
        type: "secondary-laser",
        owner: this,
        sound: () => sound.secondaryLaser()
      });
      fireMissile({
        canFire: this.missileCanFire,
        cooldown: missileCooldown,
        x: this.missilePosition * Math.cos(yaw) * (size / 2) + this.x,
        y: this.missilePosition * Math.sin(yaw) * (size / 2) + this.y,
        yaw: yaw + (Math.PI / 2) * this.missilePosition,
        type: "missile",
        owner: this,
        target: closestEnemy,
        sound: () => sound.missile()
      });
      if (closestEnemy) {
        fireBeam({
          canFire: this.beamCanFire,
          x: this.x + (Math.sin(yaw) * size) / 2,
          y: this.y - (Math.cos(yaw) * size) / 2,
          type: "beam",
          owner: this,
          target: closestEnemy,
          sound: () => { }
        });
      }
    }
  }

  tick(keyboard, sound, drawer, enemies) {
    this.projectiles.map(p => p.tick());
    this.projectiles = this.projectiles.filter(p => !p.shouldDie);
    if (this.exploding) {
      this.lifeSpan -= 1;
      this.debris.map(d => d.tick());
      if (this.lifeSpan <= 0) this.death = true;
    } else {
      let distanceToEarth = Math.sqrt(this.x * this.x + this.y * this.y);
      if (this.timeout < 0 && keyboard.isDown(keyboard.ENTER) && distanceToEarth < 50) {
        this.landed = true;
        if (this.health < this.maxHealth) {
          this.healed = true;
        }
      }
      this.timeout -= 1;

      haloSize += 1;

      if (keyboard.isDown(keyboard.LEFT)) yaw -= turnSpeed;
      if (keyboard.isDown(keyboard.RIGHT)) yaw += turnSpeed;
      state.engineOn = keyboard.isDown(keyboard.UP);

      if (state.engineOn) {
        this.dx += Math.sin(yaw) * acceleration;
        this.dy += Math.cos(yaw) * -acceleration;
        let velocity = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        if (velocity > maxSpeed) {
          this.dx = (this.dx / velocity) * maxSpeed;
          this.dy = (this.dy / velocity) * maxSpeed;
        }
        sound.engineOn();
      } else {
        sound.engineOff();
      }

      this.weaponsTick(keyboard, sound, enemies);

      this.x += this.dx;
      this.y += this.dy;
      drawer.camera.x = this.x;
      drawer.camera.y = this.y;
    }
  }

  draw(drawer) {
    this.projectiles.map(p => p.draw(drawer));
    if (this.exploding) {
      this.debris.map(d => d.draw(drawer));
      drawer.draw(() => {
        drawer.arc({
          arc: [
            this.x + Math.random() * 20 - 10,
            this.y + Math.random() * 20 - 10,
            2 + 6 * Math.random(),
            0,
            2 * Math.PI
          ],
          strokeColor:
            "rgb(255," +
            Math.floor(Math.random() * 155 + 100) +
            "," +
            Math.floor(Math.random() * 50) +
            ")",
          shadowBlur: 10,
          shadowColor: "#f00"
        });
      });
    } else {
      state.engineOn && this.drawEngine(drawer);
      let distanceToEarth = this.x * this.x + this.y * this.y;
      distanceToEarth < 60 * 60 && this.drawHalo(drawer, distanceToEarth);

      drawer.draw(() => {
        drawer.fill({
          path: new Path2D(shipDesigns.ship),
          x: this.x,
          y: this.y,
          rotation: yaw,
          strokeColor: "#070",
          centered: false,
          size
        });
      });
      // drawer.draw(() =>
      //   drawer.hitbox({ x: this.x, y: this.y, size: this.size })
      // ); // hitbox
    }
  }

  drawEngine(drawer) {
    drawer.draw(() => {
      drawer.lines({
        x: this.x,
        y: this.y,
        lines: [
          [this.x + size * -0.25, this.y + size * 0.25],
          [this.x + size * 0.25, this.y + size * 0.25],
          [this.x, this.y + size * 0.25 + Math.random() * 5],
          [this.x + size * -0.25, this.y + size * 0.25]
        ],
        rotation: yaw,
        fillColor: "orange"
      });
    });
  }

  drawHalo(drawer, distanceToEarth) {
    drawer.draw(() => {
      drawer.arc({
        arc: [
          this.x,
          this.y,
          (distanceToEarth * 4) / 60 + Math.sin(haloSize / 8) + 10,
          0,
          2 * Math.PI
        ],
        strokeColor: `rgba(255, 255, 255, ${1 - distanceToEarth / (60 * 60)})`
      });
    });
  }
}
