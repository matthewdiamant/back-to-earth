import Projectile from "./Projectile.js";

let enemyTypes = [
  {
    draw: (drawer, x, y, size, rotation) => {
      drawer.draw(() => {
        drawer.rect({
          rect: [x - size / 2, y - size / 2, size, size],
          fillColor: "#fff",
          rotation: rotation,
          size: size
        });
      });
    },
    acceleration: 0.01,
    turnSpeed: 0.05,
    maxSpeed: 1,
    weapons: ["main-laser"],
    mainLaserCooldown: 0.3
  }
];

class Enemy {
  constructor(type) {
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.yaw = 0;
    this.projectiles = [];

    this.type = type;

    this.size = 10;
    this.acceleration = type.acceleration;
    this.maxSpeed = type.maxSpeed;
    this.turnSpeed = type.turnSpeed;
    this.engineOn = true;

    this.mainLaserCanFire = type.weapons.includes("main-laser");
    this.mainLaserCooldown = type.mainLaserCooldown;
  }

  weaponsTick(sound, enemies) {
    if (this.mainLaserCanFire) {
      this.projectiles.push(
        new Projectile({
          x: this.x,
          y: this.y,
          yaw: this.yaw,
          damage: 1,
          type: "main-laser",
          owner: this
        })
      );
      this.mainLaserCanFire = false;
      window.setTimeout(
        () => (this.mainLaserCanFire = true),
        this.mainLaserCooldown * 1000
      );
      // sound.mainLaser();
    }
    this.projectiles.map(p => p.tick());
    this.projectiles = this.projectiles.filter(p => !p.shouldDie);
  }

  tick(sound, ship) {
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
    this.x += this.dx;
    this.y += this.dy;

    this.weaponsTick(sound, [ship]);
  }

  draw(drawer) {
    this.projectiles.map(p => p.draw(drawer));
    this.type.draw(drawer, this.x, this.y, this.size, this.yaw);
    // drawer.draw(() => drawer.hitbox({ x: this.x, y: this.y, size: this.size })); // hitbox
  }
}

export default class Enemies {
  constructor() {
    this.enemies = [];
    this.addEnemy();
  }

  addEnemy() {
    this.enemies.push(new Enemy(enemyTypes[0]));
  }

  tick(sound, ship) {
    this.enemies.forEach(enemy => enemy.tick(sound, ship));
  }

  draw(drawer) {
    this.enemies.forEach(enemy => enemy.draw(drawer));
  }
}
