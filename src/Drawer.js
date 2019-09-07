let cx = null;

export default class Drawer {
  constructor(canvas) {
    this.canvas = canvas;
    cx = this.canvas.getContext("2d");
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
    cx.save();
    d();
    cx.restore();
  }

  clearBackground() {
    cx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawBackground(color) {
    cx.fillStyle = color;
    cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  rect({
    rect,
    fillColor,
    shadowBlur,
    shadowColor,
    adjusted = true,
    rotation,
    size
  }) {
    if (adjusted) {
      rect[0] = this.cameraAdjustX(rect[0]);
      rect[1] = this.cameraAdjustY(rect[1]);
    }
    if (rotation) {
      cx.translate(rect[0] + size / 2, rect[1] + size / 2);
      cx.rotate(rotation);
      cx.translate(-1 * rect[0] - size / 2, -1 * rect[1] - size / 2);
    }
    cx.fillStyle = fillColor;
    cx.shadowBlur = shadowBlur;
    cx.shadowColor = shadowColor;
    cx.fillRect(...[rect[0], rect[1], ...rect.slice(2)]);
  }

  arc({ arc, fillColor, strokeColor, shadowBlur, shadowColor }) {
    cx.beginPath();
    cx.arc(
      this.cameraAdjustX(arc[0]),
      this.cameraAdjustY(arc[1]),
      ...arc.slice(2)
    );
    cx.shadowBlur = shadowBlur;
    cx.shadowColor = shadowColor;
    if (fillColor) {
      cx.fillStyle = fillColor;
      cx.fill();
    }
    if (strokeColor) {
      cx.strokeStyle = strokeColor;
      cx.stroke();
    }
  }

  text({
    text,
    x,
    y,
    size = "14px",
    font = "Courier",
    letterSpacing = false,
    isUnadjusted = false,
    filter
  }) {
    if (!isUnadjusted) {
      x = this.cameraAdjustX(x);
      y = this.cameraAdjustY(y);
    }
    if (filter) cx.filter = filter;
    cx.font = size + " " + font;
    text = letterSpacing ? text.split("").join(" ") : text;
    cx.fillStyle = "#fff";
    cx.fillText(text, x, y);
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
      cx.translate(this.cameraAdjustX(x), this.cameraAdjustY(y));
      cx.rotate(rotation);
      cx.translate(-1 * this.cameraAdjustX(x), -1 * this.cameraAdjustY(y));
    }
    cx.beginPath();
    cx.moveTo(this.cameraAdjustX(lines[0][0]), this.cameraAdjustY(lines[0][1]));
    lines
      .slice(1)
      .map(line =>
        cx.lineTo(this.cameraAdjustX(line[0]), this.cameraAdjustY(line[1]))
      );
    cx.closePath();
    cx.shadowBlur = shadowBlur;
    cx.shadowColor = shadowColor;
    if (strokeColor) {
      cx.strokeStyle = strokeColor;
      cx.stroke();
    }
    if (fillColor) {
      cx.fillStyle = fillColor;
      cx.fill();
    }
  }

  hitbox({ x, y, size }) {
    this.rect({
      rect: [x - size / 2, y - size / 2, size, size],
      color: "#f00"
    });
  }
}
