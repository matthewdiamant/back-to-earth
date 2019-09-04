let stars = [];

export default class Background {
  constructor({ cw, ch }) {
    for (let i = 0; i < 100; i++)
      stars.push([Math.random() * cw, Math.random() * ch]);
  }
  draw(drawer) {
    drawer.draw(() => {
      drawer.clearBackground();
      drawer.drawBackground("#111");
      stars.map(star =>
        drawer.fillRectUnadjusted({
          rect: [star[0], star[1], 1, 1],
          color: "#fff"
        })
      );
    });
  }
}
