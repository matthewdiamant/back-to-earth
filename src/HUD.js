export default class HUD {
  constructor() {
    this.ore = 0;
  }
  tick(ship) {
    this.ore = ship.ore;
    this.health = ship.health;
  }
  draw(drawer) {
    drawer.draw(() => {
      if (this.ore > 0) {
        drawer.text({
          text: "ore: " + this.ore,
          x: "305",
          y: "20",
          size: "11px",
          adjusted: false
        });
      }
      drawer.text({
        text: "health: " + this.health,
        x: "305",
        y: "40",
        size: "11px",
        adjusted: false
      });
      // drawer.fillRectUnadjusted({
      //   rect: [
      //     Math.cos(theta) * -230 + 320,
      //     Math.sin(theta) * -230 + 240,
      //     5,
      //     5
      //   ],
      //   color: "#4f4"
      // });
    });
  }
}
