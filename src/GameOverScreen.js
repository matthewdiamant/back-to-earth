export default class GameOverScreen {
  tick() {}
  draw(drawer) {
    drawer.draw(() => {
      drawer.drawBackground("rgba(0,0,0,0.85)");
      drawer.text({
        text: "game over",
        x: 170,
        y: 200,
        size: "48px",
        font: "serif",
        adjusted: false,
        letterSpacing: true
      });
    });
  }
}
