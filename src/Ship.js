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
  projectiles = [];

export default class Ship {
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
        projectiles.push(new Projectile({ x, y, yaw }));
        weaponCanFire = false;
        window.setTimeout(() => (weaponCanFire = true), weaponCooldown * 1000);
        sound.playerShot();
      }
    }

    x += dx;
    y += dy;
    drawer.camera.x = x;
    drawer.camera.y = y;

    projectiles.map(p => p.tick());
    projectiles = projectiles.filter(p => !p.isExpired());
  }
  draw(drawer) {
    projectiles.map(p => p.draw(drawer));
    drawer.draw(() => {
      // drawer.strokeLinesRotated({
      //   x: x,
      //   y: y,
      //   lines: [[x - 5, y - 5], [x + 5, y - 5], [x + 5, y + 5], [x - 5, y + 5]],
      //   size,
      //   rotation: yaw,
      //   color: "#009900"
      // });
      drawer.fillRotatedRect({ x, y, size, rotation: yaw, color: "#090" });
      if (state.engineOn) {
        drawer.fillLinesUnadjusted({
          lines: [
            [size * -0.5, size * 0.5],
            [size * 0.5, size * 0.5],
            [0, size * 0.5 + Math.random() * 5],
            [size * -0.5, size * 0.5]
          ],
          color: "orange"
        });
      }
    });
  }
}
