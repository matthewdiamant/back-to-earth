let x = 0,
  y = 0,
  dx = 0,
  dy = 0,
  yaw = 0,
  turnSpeed = 0.05,
  maxSpeed = 1,
  acceleration = -0.01,
  size = 10,
  state = {
    engineOn: false
  };

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

    x += dx;
    y += dy;
    drawer.camera.x = x;
    drawer.camera.y = y;
  }
  draw(drawer) {
    drawer.draw(() => {
      drawer.fillRotatedRect({ x, y, size, rotation: yaw, color: "#009900" });
      if (state.engineOn) {
        drawer.fillLines({
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
