let path = new Path2D("m 6 0 l -6 5 l 6 5 z");

export default class Compasses {
  constructor() {
    this.compasses = [
      // earth
      { x: 0, y: 0, theta: 0, color: "#fff", visible: false }
    ];
    this.timer = 0;
  }

  tick(ship) {
    this.timer += 1;
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
          drawer.fill({
            path: path,
            x:
              Math.cos(compass.theta) * (Math.sin(this.timer / 10) * 5 - 230) +
              320,
            y:
              Math.sin(compass.theta) * (Math.sin(this.timer / 10) * 5 - 230) +
              240,
            rotation: compass.theta,
            fillColor: compass.color,
            adjusted: false
          });
        })
    );
  }
}
