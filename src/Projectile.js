export default class Projectile {
  constructor({ x, y, yaw }) {
    this.x = x;
    this.y = y;
    this.yaw = yaw;
    this.speed = 4;
    this.lifeSpan = (3 * 1000) / 60;
  }

  isExpired() {
    return this.lifeSpan < 0;
  }

  tick() {
    this.x += Math.sin(this.yaw) * this.speed;
    this.y -= Math.cos(this.yaw) * this.speed;
    this.lifeSpan -= 1;
  }

  draw(drawer) {
    drawer.draw(() => {
      drawer.fillRect({ rect: [this.x, this.y, 2, 2], color: "red" });
    });
  }
}
