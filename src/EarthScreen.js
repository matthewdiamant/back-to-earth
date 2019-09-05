export default class EarthScreen {
  constructor() {
    this.timeout = 15;
  }
  tick(keyboard, ship) {
    if (keyboard.isDown(keyboard.ENTER) && this.timeout < 0) {
      this.timeout = 15;
      ship.landed = false;
      ship.timeout = 15;
    }
    this.timeout -= 1;
  }

  draw(drawer, ship) {
    drawer.draw(() => {
      drawer.fillRectUnadjusted({
        rect: [0, 0, 640, 480],
        color: "rgba(0, 0, 0, 0.6)"
      });
      drawer.fillRectUnadjusted({
        rect: [150, 90, 340, 300],
        color: "#fff"
      });
      drawer.fillRectUnadjusted({
        rect: [151, 91, 338, 298],
        color: "#000",
        shadowBlur: 2,
        shadowColor: "#fff"
      });
      drawer.text({
        text: "Welcome to Earth",
        x: 210,
        y: 140,
        size: "20px",
        font: "serif",
        letterSpacing: true,
        isUnadjusted: true
      });
      drawer.text({
        text: "If you have " + ship.ore + " ore,",
        x: 245,
        y: 180,
        isUnadjusted: true
      });
      drawer.text({
        text: "you may upgrade your ship",
        x: 215,
        y: 205,
        isUnadjusted: true
      });
      drawer.text({
        text: "by pressing SPACE",
        x: 247,
        y: 230,
        isUnadjusted: true
      });
      drawer.text({
        text: "You have " + ship.ore + " ore",
        x: 260,
        y: 270,
        isUnadjusted: true
      });
    });
  }
}
