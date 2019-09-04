export default class Earth {
  draw(cx) {
    cx.save();

    cx.beginPath();
    cx.arc(320, 240, 50, 0, 2 * Math.PI);
    cx.shadowBlur = 10;
    cx.shadowColor = "#fff";
    cx.fill();
    cx.restore();
  }
}
