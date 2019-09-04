let x = 320,
  y = 240,
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
  tick(keyboard) {
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
    }

    x += dx;
    y += dy;
  }
  draw(cx) {
    cx.save();

    // Draw ship
    cx.fillStyle = "#009900";
    cx.translate(x + size / 2, y + size / 2);
    cx.rotate(yaw);
    cx.fillRect(-size / 2, -size / 2, size, size);

    // Draw engine burners
    if (state.engineOn) {
      cx.beginPath();
      cx.moveTo(size * -0.5, size * 0.5);
      cx.lineTo(size * 0.5, size * 0.5);
      cx.lineTo(0, size * 0.5 + Math.random() * 5);
      cx.lineTo(size * -0.5, size * 0.5);
      cx.closePath();
      cx.fillStyle = "orange";
      cx.fill();
    }

    cx.restore();
  }
}