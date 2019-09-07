export default class Debris {
  constructor({ x, y, color = "#fff" }) {
    this.x = x;
    this.y = y;
    this.color = color;

    this.dx = Math.random() * 4 - 2;
    this.dy = Math.random() * 4 - 2;
    this.shouldDie = false;
    this.exploding = false;
  }

  tick() {
    this.x += this.dx;
    this.y += this.dy;
  }

  draw(drawer) {
    drawer.draw(() => {
      drawer.rect({
        rect: [this.x, this.y, 2, 2],
        fillColor: this.color,
        shadowBlur: 2,
        shadowColor: this.color
      });
    });
  }
}
