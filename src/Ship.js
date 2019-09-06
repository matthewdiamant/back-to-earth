import Projectile from "./Projectile.js";

let shipLevels = [
  {
    turnSpeed: 0.05,
    maxSpeed: 1,
    acceleration: 0.01,
    size: 10,
    mainLaserCooldown: 0.3,
    mainLaserCanFire: true
  },
  {
    cost: 100,
    turnSpeed: 0.05,
    maxSpeed: 1,
    acceleration: 0.01,
    size: 10,
    mainLaserCooldown: 0.3,
    mainLaserCanFire: true,
    secondaryLaserCooldown: 0.2,
    secondaryLaserCanFire: true
  },
  {
    cost: 400,
    turnSpeed: 0.05,
    maxSpeed: 1,
    acceleration: 0.01,
    size: 10,
    mainLaserCooldown: 0.3,
    mainLaserCanFire: true,
    secondaryLaserCooldown: 0.2,
    secondaryLaserCanFire: true,
    missileCooldown: 0.2,
    missileCanFire: true
  }
];

let x = 100,
  y = -400,
  dx = -0.1,
  dy = 0.5,
  yaw = 3.4,
  turnSpeed = 0.05,
  maxSpeed = 1,
  acceleration = 0.01,
  size = 10,
  mainLaserCooldown = 0.3,
  mainLaserCanFire = true,
  secondaryLaserCanFire = true,
  secondaryLaserPosition = 1,
  secondaryLaserCooldown = 0.2,
  missileCanFire = true,
  missilePosition = 1,
  missileCooldown = 0.2,
  state = {
    engineOn: false
  },
  earthIndicator = false;

function getClosestEnemy(x, y, enemies) {
  let closestEnemy = null;
  let closestEnemyDistance = 99999999;
  enemies.forEach(enemy => {
    if (enemy.exploding) return;
    let dx = enemy.x - x;
    let dy = enemy.y - y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < closestEnemyDistance) {
      closestEnemy = enemy;
      closestEnemyDistance = distance;
    }
  });
  return closestEnemy;
}

export default class Ship {
  constructor() {
    this.projectiles = [];
    this.landed = false;
    this.ore = 1000;
    this.timeout = 0;
    this.level = 0;
    this.shipLevels = shipLevels;
  }

  weaponsTick(keyboard, sound, enemies) {
    if (keyboard.isDown(keyboard.SPACE)) {
      if (mainLaserCanFire) {
        this.projectiles.push(
          new Projectile({ x, y, yaw, damage: 1, type: "main-laser" })
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
            x: secondaryLaserPosition * Math.cos(yaw) * (size / 2) + x,
            y: secondaryLaserPosition * Math.sin(yaw) * (size / 2) + y,
            yaw,
            damage: 1,
            type: "secondary-laser"
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
            x: missilePosition * Math.cos(yaw) * (size / 2) + x,
            y: missilePosition * Math.sin(yaw) * (size / 2) + y,
            yaw: yaw + (Math.PI / 2) * missilePosition,
            damage: 1,
            type: "missile",
            target: getClosestEnemy(x, y, enemies)
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
    if (
      this.timeout < 0 &&
      keyboard.isDown(keyboard.ENTER) &&
      x * x + y * y < 60 * 60
    ) {
      this.landed = true;
    }
    this.timeout -= 1;

    if (keyboard.isDown(keyboard.LEFT)) yaw -= turnSpeed;
    if (keyboard.isDown(keyboard.RIGHT)) yaw += turnSpeed;
    state.engineOn = keyboard.isDown(keyboard.UP);

    if (state.engineOn) {
      dx += Math.sin(yaw) * acceleration;
      dy += Math.cos(yaw) * -acceleration;
      let velocity = Math.sqrt(dx * dx + dy * dy);
      if (velocity > maxSpeed) {
        dx = (dx / velocity) * maxSpeed;
        dy = (dy / velocity) * maxSpeed;
      }
      sound.engineOn();
    } else {
      sound.engineOff();
    }

    this.weaponsTick(keyboard, sound, enemies);

    x += dx;
    y += dy;
    drawer.camera.x = x;
    drawer.camera.y = y;

    earthIndicator = Math.sqrt(x * x + y * y) > 400;

    this.projectiles.map(p => p.tick());
    this.projectiles = this.projectiles.filter(p => !p.shouldDie);
  }

  draw(drawer) {
    this.projectiles.map(p => p.draw(drawer));
    earthIndicator && this.drawEarthIndicator(drawer);
    state.engineOn && this.drawEngine(drawer);

    // drawer.draw(() => drawer.hitbox({ x, y, size })); // hitbox

    drawer.draw(() => {
      drawer.lines({
        x,
        y,
        lines: [[x, y - 7], [x + 5, y + 5], [x - 5, y + 5]],
        size,
        rotation: yaw,
        fillColor: "#070"
      });
    });
  }

  drawEngine(drawer) {
    drawer.draw(() => {
      drawer.lines({
        x,
        y,
        lines: [
          [x + size * -0.5, y + size * 0.5],
          [x + size * 0.5, y + size * 0.5],
          [x, y + size * 0.5 + Math.random() * 5],
          [x + size * -0.5, y + size * 0.5]
        ],
        rotation: yaw,
        fillColor: "orange"
      });
    });
  }

  drawEarthIndicator(drawer) {
    drawer.draw(() => {
      let theta = Math.atan2(y, x);
      drawer.fillRectUnadjusted({
        rect: [
          Math.cos(theta) * -230 + 320,
          Math.sin(theta) * -230 + 240,
          5,
          5
        ],
        color: "#4f4"
      });
    });
  }
}
