const asteroidStyles = [
  [
    [-6, -10],
    [2, -10],
    [10, -7],
    [10, -5],
    [2, 0],
    [10, 3],
    [4, 10],
    [1, 8],
    [-6, 10],
    [-10, 2],
    [-10, -5],
    [-5, -5]
  ],
  [
    [-5, -10],
    [0, -7],
    [5, -10],
    [10, -3],
    [5, 0],
    [9, 5],
    [4, 10],
    [-3, 7],
    [-7, 9],
    [-10, 5],
    [-7, 0],
    [-9, -6]
  ]
];

class Asteroid {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
    this.asteroidStyle = Math.floor(Math.random() * asteroidStyles.length);
    this.rotation = Math.random() * Math.PI;
    this.turnSpeed = Math.random() * 0.03;
  }
}

export default class Asteroids {
  constructor() {
    this.asteroids = [];
    for (let i = 0; i < 40; i++) {
      let theta = Math.random() * Math.PI * 2;
      let x = Math.sin(theta) * (210 + Math.random() * 400);
      let y = Math.cos(theta) * (210 + Math.random() * 400);
      this.asteroids.push(new Asteroid({ x, y }));
    }
  }

  tick() {
    this.asteroids.map(asteroid => (asteroid.rotation += asteroid.turnSpeed));
  }
  draw(drawer) {
    this.asteroids.map(asteroid =>
      drawer.draw(() =>
        drawer.lines({
          lines: asteroidStyles[asteroid.asteroidStyle].map(vertex => [
            asteroid.x + vertex[0],
            asteroid.y + vertex[1]
          ]),
          strokeColor: "#fff",
          shadowBlur: 8,
          shadowColor: "#fff",
          rotation: asteroid.rotation,
          x: asteroid.x,
          y: asteroid.y
        })
      )
    );
  }
}
