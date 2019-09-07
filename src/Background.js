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
        x: -145,
        y: -95,
        size: "36px",
        font: "serif",
        letterSpacing: true
      });
      drawer.text({
        text: "Arrow keys to move. SPACE to shoot.",
        x: -145,
        y: 105
      });
      drawer.text({
        text: "ENTER to land back on earth.",
        x: -115,
        y: 130
      });
      drawer.text({
        text: "Shoot things. Collect ore. Upgrade weapons.",
        x: -178,
        y: 155
      });
    });
  }
}
