let projectileTypes = {
  "main-laser": {
    color: "#f66",
    shadowColor: "#f00",
    speed: 4,
    lifespan: 3
  },
  "secondary-laser": {
    color: "#f6f",
    shadowColor: "#f0f",
    speed: 10,
    lifeSpan: 1
  }
};

export default class Projectile {
  constructor({ x, y, yaw, damage, type }) {
    this.x = x;
    this.y = y;
    this.yaw = yaw;

    this.type = projectileTypes[type];
    this.lifeSpan = (this.type.lifeSpan * 1000) / 60;
    this.size = 1;
    this.shouldDie = false;
    this.damage = damage;
    this.exploding = false;
  }

  tick() {
    this.lifeSpan -= 1;
    if (this.lifeSpan < 0) this.shouldDie = true;
    if (this.exploding) return;
    this.x += Math.sin(this.yaw) * this.type.speed;
    this.y -= Math.cos(this.yaw) * this.type.speed;
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
          fillColor: "#ff8",
          shadowBlur: 10,
          shadowColor: "#ff0"
        });
      } else {
        drawer.fillRect({
          rect: [this.x, this.y, 2, 2],
          color: this.type.color,
          shadowBlur: 2,
          shadowColor: this.type.shadowColor
        });
      }
    });
  }
}
