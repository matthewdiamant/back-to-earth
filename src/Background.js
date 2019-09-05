let stars = [];

export default class Background {
  constructor({ cw, ch }) {
    for (let i = 0; i < 100; i++)
      stars.push([Math.random() * cw, Math.random() * ch]);
  }
  draw(drawer) {
    drawer.draw(() => {
      drawer.drawBackground("#111");
      stars.map(star =>
        drawer.fillRectUnadjusted({
          rect: [star[0], star[1], 1, 1],
          color: "#fff"
        })
      );
      drawer.text({
        text: "back to earth",
        x: -140,
        y: -100,
        size: "36px",
        font: "serif",
        letterSpacing: true
      });
      drawer.text({
        text: "Arrow keys to move. SPACE to shoot.",
        x: -140,
        y: 100
      });
      drawer.text({
        text: "ENTER to land back on earth.",
        x: -110,
        y: 125
      });
      drawer.text({
        text: "Shoot things. Collect ore. Upgrade weapons.",
        x: -173,
        y: 150
      });
    });
  }
}
