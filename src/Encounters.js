export default class Encounters {
  constructor() {
    this.timeout = 30 * 60;
  }

  makeEnemy(ship) {
    let theta = Math.random() * Math.PI * 2;
    return [
      (500 + 100 * Math.random()) * Math.sin(theta) + ship.getX(),
      (500 + 100 * Math.random()) * Math.cos(theta) + ship.getY(),
      ship.level
    ];
  }

  makeEncounter(ship, enemies) {
    if (ship.level >= 1) {
      for (let i = 0; i < ship.level; i++) {
        enemies.addEnemy(...this.makeEnemy(ship));
      }
    }
    this.timeout = (Math.random() * 10 + 10 + ship.level) * 60;
  }

  tick(ship, enemies) {
    this.timeout -= 1;

    if (this.timeout <= 0) {
      this.makeEncounter(ship, enemies);
      this.timeout = (Math.random() * 10 + 30) * 60;
    }
  }
}