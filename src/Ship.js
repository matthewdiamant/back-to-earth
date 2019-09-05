import Projectile from "./Projectile.js";

let x = 0,
  y = 0,
  dx = 0,
  dy = 0,
  yaw = 0.5,
  turnSpeed = 0.05,
  maxSpeed = 1,
  acceleration = -0.01,
  size = 10,
  weaponCooldown = 0.3,
  weaponCanFire = true,
  state = {
    engineOn: false
  },
  earthIndicator = false;

export default class Ship {
  constructor() {
    this.projectiles = [];
  }
  tick(keyboard, sound, drawer) {
    if (keyboard.isDown(keyboard.LEFT)) yaw -= turnSpeed;
    if (keyboard.isDown(keyboard.RIGHT)) yaw += turnSpeed;
    state.engineOn = keyboard.isDown(keyboard.UP);

    if (state.engineOn) {
      dx += Math.sin(yaw) * -acceleration;
      dy += Math.cos(yaw) * acceleration;
      var velocity = Math.sqrt(dx * dx + dy * dy);
      if (velocity > maxSpeed) {
        dx = (dx / velocity) * maxSpeed;
        dy = (dy / velocity) * maxSpeed;
      }
      sound.engineOn();
    } else {
      sound.engineOff();
    }

    if (keyboard.isDown(keyboard.SPACE)) {
      if (weaponCanFire) {
        this.projectiles.push(new Projectile({ x, y, yaw, damage: 1 }));
        weaponCanFire = false;
        window.setTimeout(() => (weaponCanFire = true), weaponCooldown * 1000);
        sound.playerShot();
      }
    }

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
