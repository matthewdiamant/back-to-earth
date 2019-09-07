export default class Compasses {
  constructor() {
    this.compasses = [
      // earth
      { x: 0, y: 0, theta: 0, color: "#4f4", visible: false }
    ];
  }

  tick(ship) {
    this.compasses = this.compasses.map(compass => {
      compass.visible =
        Math.sqrt(ship.getX() * ship.getX() + ship.getY() * ship.getY()) > 400;
      compass.theta = Math.atan2(ship.getY(), ship.getX());
      return compass;
    });
  }

  draw(drawer) {
    this.compasses.forEach(
      compass =>
        compass.visible &&
        drawer.draw(() => {
          drawer.rect({
            rect: [
              Math.cos(compass.theta) * -230 + 320,
              Math.sin(compass.theta) * -230 + 240,
              5,
              5
            ],
            fillColor: compass.color,
            adjusted: false
          });
        })
    );
  }
}
