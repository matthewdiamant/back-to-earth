let projectileTypes = {
  "main-laser": {
    color: "#f66",
    shadowColor: "#f00",
    speed: 4,
    lifeSpan: 4
  },
  "enemy-laser": {
    color: "#a0f",
    shadowColor: "#a0f",
    speed: 4,
    lifeSpan: 4
  },
  "secondary-laser": {
    color: "#f6f",
    shadowColor: "#f0f",
    speed: 10,
    lifeSpan: 1,
    line: 8
  },
  missile: {
    type: "missile",
    color: "#ff0",
    shadowColor: "#ff0",
    speed: 0.8,
    lifeSpan: 10,
    maxSpeed: 5,
    arc: 2,
    largeExplosion: true
  }
};

export default class Projectile {
  constructor({ x, y, yaw, damage, type, owner, target }) {
    this.type = projectileTypes[type];

    this.x = x;
    this.y = y;
    this.yaw = yaw;

    this.owner = owner;
    this.lifeSpan = (this.type.lifeSpan * 1000) / 60;
    this.size = 1;
    this.shouldDie = false;
    this.damage = damage;
    this.exploding = false;

    this.dx = Math.sin(this.yaw) * this.type.speed;
    this.dy = -Math.cos(this.yaw) * this.type.speed;

    this.target = target;
  }

  tick() {
    this.lifeSpan -= 1;
    if (this.lifeSpan <= 0) this.shouldDie = true;
    if (this.exploding) return;

    if (this.type.type === "missile") {
      let dx, dy;

      if (
        this.target &&
        !this.target.exploding &&
        // missiles take a half second to lock on to target
        this.lifeSpan < ((this.type.lifeSpan - 0.5) * 1000) / 60
      ) {
        dx = this.x - this.target.x;
        dy = this.y - this.target.y;
        let amplitude = Math.sqrt(dx * dx + dy * dy);
        dx = (dx / amplitude) * this.type.speed;
        dy = (dy / amplitude) * this.type.speed;
      } else {
        dx = this.dx * -this.type.speed;
        dy = this.dy * -this.type.speed;
      }

      this.dx -= dx;
      this.dy -= dy;

      let velocity = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
      if (velocity > this.type.maxSpeed) {
        this.dx = (this.dx / velocity) * this.type.maxSpeed;
        this.dy = (this.dy / velocity) * this.type.maxSpeed;
      }
    }

    this.x += this.dx;
    this.y += this.dy;
  }

  destroy() {
    this.exploding = true;
    this.lifeSpan = 2;
  }

  draw(drawer) {
    drawer.draw(() => {
      if (this.exploding) {
        drawer.arc({
          arc: [
            this.x,
            this.y,
            (4 / this.lifeSpan) * (this.type.largeExplosion ? 2 : 1),
            0,
            2 * Math.PI
          ],
          fillColor: "#ff8",
          shadowBlur: 10,
          shadowColor: "#ff0"
        });
      } else {
        if (this.type.line) {
          drawer.rect({
            rect: [this.x, this.y, 1, this.type.line],
            fillColor: this.type.color,
            shadowBlur: 2,
            shadowColor: this.type.shadowColor,
            rotation: this.yaw,
            size: 1
          });
        } else if (this.type.arc) {
          drawer.arc({
            arc: [this.x, this.y, this.type.arc, 0, 2 * Math.PI],
            fillColor: this.type.color,
            shadowBlur: 1,
            shadowColor: this.type.color
          });
        } else {
          drawer.rect({
            rect: [this.x, this.y, 2, 2],
            fillColor: this.type.color,
            shadowBlur: 2,
            shadowColor: this.type.shadowColor
          });
        }
      }
    });
  }
}
