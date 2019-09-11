import Projectile from "./Projectile.js";
import Debris from "./Debris.js";

import enemyTypes from "./constants/enemy-types.js";

class Enemy {
  constructor(type, x, y) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.yaw = 0;
    this.shouldDie = false;
    this.exploding = false;

    this.type = type;
    this.projectiles = [];

    this.size = type.size;
    this.acceleration = type.acceleration;
    this.maxSpeed = type.maxSpeed;
    this.turnSpeed = type.turnSpeed;
    this.health = type.health;
    this.bounty = type.bounty;
    this.engineOn = true;

    this.mainLaserCanFire = type.weapons.includes("enemy-laser");
    this.mainLaserCooldown = type.mainLaserCooldown;
  }

  takeDamage({ damage, dx, dy, owner }) {
    this.dx += dx / 30;
    this.dy += dy / 30;
    this.health -= damage;
    if (this.health <= 0) {
      this.exploding = true;
      this.debris = Array(40)
        .fill()
        .map(d => new Debris({ x: this.x, y: this.y, color: "#aa3" }));
      this.lifeSpan = 80;
      owner.ore += this.bounty;
    }
  }

  weaponsTick(sound) {
    if (this.mainLaserCanFire) {
      this.projectiles.push(
        new Projectile({
          x: this.x,
          y: this.y,
          yaw: this.yaw,
          damage: 1,
          type: "enemy-laser",
          owner: this
        })
      );
      this.mainLaserCanFire = false;
      window.setTimeout(
        () => (this.mainLaserCanFire = true),
        this.mainLaserCooldown * 1000
      );
      sound.enemyLaser();
    }
  }

  tick(sound, ship) {
    this.projectiles.map(p => p.tick());
    this.projectiles = this.projectiles.filter(p => !p.shouldDie);

    if (this.exploding) {
      this.lifeSpan -= 1;
      this.debris.map(d => d.tick());
      if (this.lifeSpan <= 0) this.shouldDie = true;
    } else {
      let theta = Math.atan2(ship.getX() - this.x, -ship.getY() + this.y);
      this.yaw += this.yaw - theta > 0 ? -this.turnSpeed : this.turnSpeed;
      this.yaw %= Math.PI * 2;

      this.engineOn = true;

      if (this.engineOn) {
        this.dx += Math.sin(this.yaw) * this.acceleration;
        this.dy += Math.cos(this.yaw) * -this.acceleration;
        let velocity = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
        if (velocity > this.maxSpeed) {
          this.dx = (this.dx / velocity) * this.maxSpeed;
          this.dy = (this.dy / velocity) * this.maxSpeed;
        }
        // sound.engineOn();
      } else {
        // sound.engineOff();
      }

      let distanceFromShip = Math.sqrt(
        (this.x - ship.x) * (this.x - ship.x) +
          (this.y - ship.y) * (this.y - ship.y)
      );
      if (!ship.exploding && distanceFromShip < 320)
        this.weaponsTick(sound, [ship]);
    }

    this.x += this.dx;
    this.y += this.dy;
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
      this.type.draw(drawer, this.x, this.y, this.size, this.yaw);
    }
    // drawer.draw(() => drawer.hitbox({ x: this.x, y: this.y, size: this.size })); // hitbox
  }
}

export default class Enemies {
  constructor() {
    this.enemies = [];
  }

  addEnemy(x, y) {
    let enemyType = Math.floor(Math.random() * 2);
    this.enemies.push(new Enemy(enemyTypes[enemyType], x, y));
  }

  tick(sound, ship) {
    this.enemies.forEach(enemy => enemy.tick(sound, ship));
    this.enemies = this.enemies.filter(a => !a.shouldDie);
  }

  draw(drawer) {
    this.enemies.forEach(enemy => enemy.draw(drawer));
  }
}
