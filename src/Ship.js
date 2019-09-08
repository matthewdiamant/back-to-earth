import Debris from "./Debris.js";
import Projectile from "./Projectile.js";

let shipLevels = [
  {
    turnSpeed: 0.05,
    maxSpeed: 1,
    acceleration: 0.01,
    size: 10,
    mainLaserCooldown: 0.3,
    mainLaserCanFire: true,
    health: 10
  },
  {
    cost: 100,
    turnSpeed: 0.07,
    maxSpeed: 2,
    acceleration: 0.03,
    size: 15,
    mainLaserCooldown: 0.3,
    mainLaserCanFire: true,
    secondaryLaserCooldown: 0.2,
    secondaryLaserCanFire: true,
    health: 20
  },
  {
    cost: 400,
    turnSpeed: 0.09,
    maxSpeed: 3,
    acceleration: 0.2,
    size: 20,
    mainLaserCooldown: 0.3,
    mainLaserCanFire: true,
    secondaryLaserCooldown: 0.2,
    secondaryLaserCanFire: true,
    missileCooldown: 0.2,
    missileCanFire: true,
    health: 40
  }
];

let yaw = 3.4,
  turnSpeed = 0.05,
  maxSpeed = 1,
  acceleration = 0.01,
  size = 10,
  mainLaserCooldown = 0.3,
  mainLaserCanFire = true,
  secondaryLaserCanFire = false,
  secondaryLaserPosition = 1,
  secondaryLaserCooldown = 0.2,
  missileCanFire = false,
  missilePosition = 1,
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
    this.x = 100;
    this.y = -400;
    this.dx = -0.1;
    this.dy = 0.5;
    this.projectiles = [];
    this.landed = false;
    this.ore = 0;
    this.timeout = 0;
    this.level = 0;
    this.shipLevels = shipLevels;
    this.health = 10;
    this.exploding = false;
    this.size = size;
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

  takeDamage({ damage, dx1, dy1 }) {
    // this.dx += dx1 / 30;
    // this.dy += dy1 / 30;
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
    this.health = shipLevels[this.level].health;
  }

  setLevel(level) {
    ({
      turnSpeed,
      maxSpeed,
      acceleration,
      size,
      mainLaserCooldown,
      mainLaserCanFire,
      secondaryLaserCooldown,
      secondaryLaserCanFire,
      missileCooldown,
      missileCanFire
    } = shipLevels[level]);

    this.level = level;
  }

  weaponsTick(keyboard, sound, enemies) {
    if (keyboard.isDown(keyboard.SPACE)) {
      if (mainLaserCanFire) {
        this.projectiles.push(
          new Projectile({
            x: this.x,
            y: this.y,
            yaw,
            damage: 1,
            type: "main-laser",
            owner: this
          })
        );
        mainLaserCanFire = false;
        window.setTimeout(
          () => (mainLaserCanFire = true),
          mainLaserCooldown * 1000
        );
        sound.mainLaser();
      }
      if (secondaryLaserCanFire) {
        this.projectiles.push(
          new Projectile({
            x: secondaryLaserPosition * Math.cos(yaw) * (size / 2) + this.x,
            y: secondaryLaserPosition * Math.sin(yaw) * (size / 2) + this.y,
            yaw,
            damage: 1,
            type: "secondary-laser",
            owner: this
          })
        );
        secondaryLaserPosition *= -1;
        secondaryLaserCanFire = false;
        window.setTimeout(
          () => (secondaryLaserCanFire = true),
          secondaryLaserCooldown * 1000
        );
        sound.secondaryLaser();
      }
      if (missileCanFire) {
        this.projectiles.push(
          new Projectile({
            x: missilePosition * Math.cos(yaw) * (size / 2) + this.x,
            y: missilePosition * Math.sin(yaw) * (size / 2) + this.y,
            yaw: yaw + (Math.PI / 2) * missilePosition,
            damage: 1,
            type: "missile",
            owner: this,
            target: getClosestEnemy(this.x, this.y, enemies, 260)
          })
        );
        missilePosition *= -1;
        missileCanFire = false;
        window.setTimeout(
          () => (missileCanFire = true),
          missileCooldown * 1000
        );
        sound.missile();
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
      if (this.timeout < 0 && keyboard.isDown(keyboard.ENTER)) {
        this.landed = true;
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

      // drawer.draw(() => drawer.hitbox({ x, y, size })); // hitbox

      drawer.draw(() => {
        drawer.lines({
          x: this.x,
          y: this.y,
          lines: [
            [this.x, this.y - 7],
            [this.x + 5, this.y + 5],
            [this.x - 5, this.y + 5]
          ],
          rotation: yaw,
          fillColor: "#070"
        });
      });
    }
  }

  drawEngine(drawer) {
    drawer.draw(() => {
      drawer.lines({
        x: this.x,
        y: this.y,
        lines: [
          [this.x + size * -0.5, this.y + size * 0.5],
          [this.x + size * 0.5, this.y + size * 0.5],
          [this.x, this.y + size * 0.5 + Math.random() * 5],
          [this.x + size * -0.5, this.y + size * 0.5]
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
