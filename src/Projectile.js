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
  }

  tick() {
    this.x += Math.sin(this.yaw) * this.speed;
    this.y -= Math.cos(this.yaw) * this.speed;
    this.lifeSpan -= 1;
    if (this.lifeSpan < 0) this.shouldDie = true;
  }

  destroy() {
    this.shouldDie = true;
  }

  draw(drawer) {
    drawer.draw(() => {
      drawer.fillRect({
        rect: [this.x, this.y, 2, 2],
        color: "#f66",
        shadowBlur: 2,
        shadowColor: "#f00"
      });
    });
  }
}
