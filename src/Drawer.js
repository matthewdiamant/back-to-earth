export default class Drawer {
  constructor(canvas) {
    this.canvas = canvas;
    this.cx = this.canvas.getContext("2d");
    this.camera = {
      x: 0,
      y: 0
    };
  }

  cameraAdjustX(x) {
    return x - this.camera.x + this.canvas.width / 2;
  }

  cameraAdjustY(y) {
    return y - this.camera.y + this.canvas.height / 2;
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

  fillRect({ rect, color, shadowBlur, shadowColor }) {
    this.cx.fillStyle = color;
    this.cx.shadowBlur = shadowBlur;
    this.cx.shadowColor = shadowColor;
    this.cx.fillRect(
      ...[
        this.cameraAdjustX(rect[0]),
        this.cameraAdjustY(rect[1]),
        ...rect.slice(2)
      ]
    );
  }

  fillRectUnadjusted({ rect, color }) {
    this.cx.fillStyle = color;
    this.cx.fillRect(...rect);
  }

  arc({ arc, fillColor, strokeColor, shadowBlur, shadowColor }) {
    this.cx.beginPath();
    this.cx.arc(
      this.cameraAdjustX(arc[0]),
      this.cameraAdjustY(arc[1]),
      ...arc.slice(2)
    );
    this.cx.shadowBlur = shadowBlur;
    this.cx.shadowColor = shadowColor;
    if (fillColor) {
      this.cx.fillStyle = fillColor;
      this.cx.fill();
    }
    if (strokeColor) {
      this.cx.strokeStyle = strokeColor;
      this.cx.stroke();
    }
  }

  fillText({
    text,
    x,
    y,
    size = "14px",
    font = "Courier",
    letterSpacing = false
  }) {
    this.cx.font = size + " " + font;
    text = letterSpacing ? text.split("").join(" ") : text;
    this.cx.fillText(text, this.cameraAdjustX(x), this.cameraAdjustY(y));
  }

  lines({
    lines,
    shadowBlur = 0,
    shadowColor,
    rotation,
    x,
    y,
    fillColor,
    strokeColor
  }) {
    if (rotation) {
      this.cx.translate(this.cameraAdjustX(x), this.cameraAdjustY(y));
      this.cx.rotate(rotation);
      this.cx.translate(-1 * this.cameraAdjustX(x), -1 * this.cameraAdjustY(y));
    }
    this.cx.beginPath();
    this.cx.moveTo(
      this.cameraAdjustX(lines[0][0]),
      this.cameraAdjustY(lines[0][1])
    );
    lines
      .slice(1)
      .map(line =>
        this.cx.lineTo(this.cameraAdjustX(line[0]), this.cameraAdjustY(line[1]))
      );
    this.cx.closePath();
    this.cx.shadowBlur = shadowBlur;
    this.cx.shadowColor = shadowColor;
    if (strokeColor) {
      this.cx.strokeStyle = strokeColor;
      this.cx.stroke();
    }
    if (fillColor) {
      this.cx.fillStyle = fillColor;
      this.cx.fill();
    }
  }

  hitbox({ x, y, size }) {
    this.fillRect({
      rect: [x - size / 2, y - size / 2, size, size],
      color: "#f00"
    });
  }
}
