let stars = [];

export default class Background {
  constructor({ cw, ch }) {
    for (let i = 0; i < 100; i++)
      stars.push([Math.random() * cw, Math.random() * ch]);
  }
  draw(cx, canvas) {
    cx.fillStyle = "#111";
    cx.fillRect(0, 0, canvas.cw, canvas.ch);

    cx.fillStyle = "#fff";
    stars.map(star => cx.fillRect(star[0], star[1], 1, 1));
  }
}
