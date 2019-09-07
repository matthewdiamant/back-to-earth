export default class HUD {
  constructor() {
    this.ore = 0;
  }
  tick(ship) {
    this.ore = ship.ore;
  }
  draw(drawer) {
    drawer.draw(() => {
      if (this.ore > 0) {
        drawer.text({
          text: "ore: " + this.ore,
          x: "305",
          y: "20",
          size: "11px",
          isUnadjusted: true
        });
      }
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
