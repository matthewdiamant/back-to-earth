let path = new Path2D("m 6 0 l -6 5 l 6 5 z");

export default class Compasses {
  constructor() {
    this.compasses = [
      // earth
      { x: 0, y: 0, theta: 0, color: "#fff", visible: false }
    ];
    this.timer = 0;
    this.worlds = [];
  }

  createWorld() {
    let theta = Math.random() * Math.PI * 2;
    let x = Math.sin(theta) * 2000;
    let y = Math.cos(theta) * 2000;
    this.worlds.push({ x, y, color: 'red' });
    this.compasses.push({ x, y, theta: 0, color: "red", visible: false })
  }

  distanceToWorld(ship, compass) {
    return Math.sqrt(Math.pow(ship.getX() - compass.x, 2) + Math.pow(ship.getY() - compass.y, 2))
  }

  tick(ship) {
    this.timer += 1;
    this.compasses = this.compasses.map(compass => {
      compass.visible = this.distanceToWorld(ship, compass) > 300;
      compass.theta = Math.atan2(ship.getY() - compass.y, ship.getX() - compass.x);
      return compass;
    });
  }

  draw(drawer) {
    this.worlds.forEach(
      world => drawer.draw(() => {
        drawer.arc({
          arc: [
            world.x,
            world.y,
            200,
            0,
            2 * Math.PI
          ],
          fillColor: "#ff8",
          shadowBlur: 10,
          shadowColor: "#ff0"
        });
      })
    );
    this.compasses.forEach(
      compass =>
        compass.visible &&
        drawer.draw(() => {
          drawer.fill({
            path: path,
            x:
              Math.cos(compass.theta) * (Math.sin(this.timer / 10) * 5 - 200) +
              320,
            y:
              Math.sin(compass.theta) * (Math.sin(this.timer / 10) * 5 - 200) +
              240,
            rotation: compass.theta,
            fillColor: compass.color,
            adjusted: false
          });
        })
    );
  }
}
