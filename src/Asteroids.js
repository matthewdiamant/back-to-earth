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

class Debris {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
    this.dx = Math.random() * 4 - 2;
    this.dy = Math.random() * 4 - 2;
    this.shouldDie = false;
    this.exploding = false;
  }

  tick() {
    this.x += this.dx;
    this.y += this.dy;
  }

  draw(drawer) {
    drawer.draw(() => {
      drawer.fillRect({
        rect: [this.x, this.y, 2, 2],
        color: "#fff",
        shadowBlur: 2,
        shadowColor: "#fff"
      });
    });
  }
}

class Asteroid {
  constructor({ x, y }) {
    this.x = x;
    this.y = y;
    this.dx = 0;
    this.dy = 0;
    this.asteroidStyle = Math.floor(Math.random() * asteroidStyles.length);
    this.rotation = Math.random() * Math.PI;
    this.turnSpeed = Math.random() * 0.03;
    this.size = 20;
    this.health = 3;
    this.shouldDie = false;
    this.exploding = false;
  }

  takeDamage({ damage, dx, dy, owner }) {
    this.dx += dx / 30;
    this.dy += dy / 30;
    this.health -= damage;
    if (this.health <= 0) {
      this.exploding = true;
      this.debris = Array(20)
        .fill()
        .map(d => new Debris({ x: this.x, y: this.y }));
      this.lifeSpan = 50;
      owner.ore += 10;
    }
  }

  tick() {
    if (this.exploding) {
      this.lifeSpan -= 1;
      this.debris.map(d => d.tick());
      if (this.lifeSpan <= 0) this.shouldDie = true;
    }
    this.x += this.dx;
    this.y += this.dy;
    this.rotation += this.turnSpeed;
  }

  draw(drawer) {
    drawer.draw(() => {
      if (this.exploding) {
        this.debris.map(d => d.draw(drawer));
      } else {
        drawer.lines({
          lines: asteroidStyles[this.asteroidStyle].map(vertex => [
            this.x + vertex[0],
            this.y + vertex[1]
          ]),
          strokeColor: "#fff",
          shadowBlur: 8,
          shadowColor: "#fff",
          rotation: this.rotation,
          x: this.x,
          y: this.y
        });
        // drawer.draw(() => drawer.hitbox(asteroid)); // hitbox
      }
    });
  }
}

export default class Asteroids {
  constructor() {
    this.asteroids = [];
  }

  initializeAsteroids() {
    this.asteroids = [];
    for (let i = 0; i < 40; i++) {
      let theta = Math.random() * Math.PI * 2;
      let x = Math.sin(theta) * (210 + Math.random() * 400);
      let y = Math.cos(theta) * (210 + Math.random() * 400);
      this.asteroids.push(new Asteroid({ x, y }));
    }
  }

  tick() {
    this.asteroids.forEach(asteroid => asteroid.tick());
    this.asteroids = this.asteroids.filter(a => !a.shouldDie);
  }

  draw(drawer) {
    this.asteroids.map(asteroid => asteroid.draw(drawer));
  }
}
