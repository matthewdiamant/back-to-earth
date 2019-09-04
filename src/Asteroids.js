class Asteroid {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
  }
}

export default class Asteroids {
  constructor() {
    this.asteroids = [];
    for (let i = 0; i < 10; i++) {
      let x = Math.random() * 400 - 200;
      let y = Math.random() * 400 - 200;
      this.asteroids.push(new Asteroid({ x, y }));
    }
  }

  tick() {}
  draw(drawer) {
    this.asteroids.map(asteroid =>
      drawer.draw(() =>
        drawer.fillLines({
          lines: [
            [asteroid.x - 5, asteroid.y - 5],
            [asteroid.x + 5, asteroid.y - 5],
            [asteroid.x + 5, asteroid.y + 5],
            [asteroid.x - 5, asteroid.y + 5]
          ],
          color: "#fff"
        })
      )
    );
  }
}
