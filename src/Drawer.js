export default class Drawer {
  constructor(canvas) {
    this.canvas = canvas;
    this.cx = this.canvas.getContext("2d");
    this.map = {};
  }

  draw(d) {
    this.cx.save();
    d();
    this.cx.restore();
  }

  clearBackground() {
    this.cx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBackground(color) {
    this.cx.fillStyle = color;
    this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  fillRect({ rect, color }) {
    this.cx.fillStyle = color;
    this.cx.fillRect(...rect);
  }

  fillArc({ arc, color, shadowBlur, shadowColor }) {
    this.cx.fillStyle = color;
    this.cx.beginPath();
    this.cx.arc(...arc);
    this.cx.shadowBlur = shadowBlur;
    this.cx.shadowColor = shadowColor;
    this.cx.fill();
  }

  fillRotatedRect({ x, y, size, rotation, color }) {
    this.cx.fillStyle = color;
    this.cx.translate(x + size / 2, y + size / 2);
    this.cx.rotate(rotation);
    this.cx.fillRect(-size / 2, -size / 2, size, size);
  }

  fillLines({ lines, color }) {
    this.cx.beginPath();
    this.cx.moveTo(...lines[0]);
    lines.slice(1).map(line => this.cx.lineTo(...line));
    this.cx.closePath();
    this.cx.fillStyle = color;
    this.cx.fill();
  }
}
