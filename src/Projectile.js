export default class Projectile {
  constructor({ x, y, yaw, damage }) {
    this.x = x;
    this.y = y;
    this.yaw = yaw;
    this.speed = 4;
    this.lifeSpan = (3 * 1000) / 60;
    this.size = 1;
    this.shouldDie = false;
    this.damage = damage;
    this.exploding = false;
  }

  tick() {
    this.lifeSpan -= 1;
    if (this.lifeSpan < 0) this.shouldDie = true;
    if (this.exploding) return;
    this.x += Math.sin(this.yaw) * this.speed;
    this.y -= Math.cos(this.yaw) * this.speed;
  }

  destroy() {
    this.exploding = true;
    this.lifeSpan = 2;
  }

  draw(drawer) {
    drawer.draw(() => {
      if (this.exploding) {
        drawer.arc({
          arc: [this.x, this.y, 4 / this.lifeSpan, 0, 2 * Math.PI],
          strokeColor: "#ff3",
          shadowBlur: 10,
          shadowColor: "#ff0"
        });
      } else {
        drawer.fillRect({
          rect: [this.x, this.y, 2, 2],
          color: "#f66",
          shadowBlur: 2,
          shadowColor: "#f00"
        });
      }
    });
  }
}
