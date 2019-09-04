export default class Ship {
  x = 320;
  y = 240;
  dx = 0;
  dy = 0;
  yaw = 0;
  turnSpeed = 0.05;
  maxSpeed = 1;
  acceleration = -0.01;
  size = 10;
  state = {
    engineOn: false
  };

  tick(keyboard) {
    if (keyboard.isDown(keyboard.LEFT)) this.yaw -= this.turnSpeed;
    if (keyboard.isDown(keyboard.RIGHT)) this.yaw += this.turnSpeed;
    this.state.engineOn = keyboard.isDown(keyboard.UP);

    if (this.state.engineOn) {
      this.dx += Math.sin(this.yaw) * -this.acceleration;
      this.dy += Math.cos(this.yaw) * this.acceleration;
      var velocity = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
      if (velocity > this.maxSpeed) {
        this.dx = (this.dx / velocity) * this.maxSpeed;
        this.dy = (this.dy / velocity) * this.maxSpeed;
      }
    }

    this.x += this.dx;
    this.y += this.dy;
  }
  draw(cx) {
    cx.save();

    // Draw ship
    cx.fillStyle = "#009900";
    cx.translate(this.x + this.size / 2, this.y + this.size / 2);
    cx.rotate(this.yaw);
    cx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);

    // Draw engine burners
    if (this.state.engineOn) {
      cx.beginPath();
      cx.moveTo(this.size * -0.5, this.size * 0.5);
      cx.lineTo(this.size * 0.5, this.size * 0.5);
      cx.lineTo(0, this.size * 0.5 + Math.random() * 5);
      cx.lineTo(this.size * -0.5, this.size * 0.5);
      cx.closePath();
      cx.fillStyle = "orange";
      cx.fill();
    }

    cx.restore();
  }
}
