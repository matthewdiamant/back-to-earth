export default class EarthScreen {
  constructor() {
    this.timeout = 15;
  }

  tick(keyboard, ship, asteroids, enemies) {
    if (keyboard.isDown(keyboard.ENTER) && this.timeout < 0) {
      this.timeout = 15;
      ship.landed = false;
      ship.timeout = 15;
      ship.setDx(0);
      ship.setDy(0);
      asteroids.initializeAsteroids();
      ship.heal();
      if (ship.level >= 1)
        enemies.addEnemy(
          (300 + 300 * Math.random()) * (Math.round(Math.random()) * 2 - 1) +
            ship.getX(),
          (300 + 300 * Math.random()) * (Math.round(Math.random()) * 2 - 1) +
            ship.getY()
        );
    }
    this.timeout -= 1;

    if (keyboard.isDown(keyboard.SPACE) && this.timeout < 0) {
      this.timeout = 15;
      if (ship.level >= ship.shipLevels.length - 1) return;
      let upgradeCost = ship.shipLevels[ship.level + 1].cost;
      if (ship.ore >= upgradeCost) {
        ship.ore -= upgradeCost;
        ship.setLevel(ship.level + 1);
      }
    }
  }

  draw(drawer, ship) {
    let text = t =>
      drawer.text({
        text: t[2],
        x: t[0],
        y: t[1],
        adjusted: false
      });
    drawer.draw(() => {
      drawer.rect({
        rect: [0, 0, 640, 480],
        fillColor: "rgba(0, 0, 0, 0.6)",
        adjusted: false
      });
      drawer.rect({
        rect: [150, 90, 340, 300],
        fillColor: "#fff",
        adjusted: false
      });
      drawer.rect({
        rect: [151, 91, 338, 298],
        fillColor: "#000",
        shadowBlur: 2,
        shadowColor: "#fff",
        adjusted: false
      });
      drawer.text({
        text: "Welcome to Earth",
        x: 210,
        y: 140,
        size: "20px",
        font: "serif",
        letterSpacing: true,
        adjusted: false
      });
      if (ship.level >= ship.shipLevels.length - 1) {
        drawer.text({
          text: "You have all ship upgrades",
          x: 245,
          y: 180,
          adjusted: false
        });
      } else {
        let upgradeCost = ship.shipLevels[ship.level + 1].cost;
        drawer.text({
          text: "If you have " + upgradeCost + " ore,",
          x: 245,
          y: 180,
          adjusted: false
        });
        drawer.text({
          text: "you may upgrade your ship",
          x: 215,
          y: 205,
          adjusted: false
        });
        drawer.text({
          text: "by pressing SPACE",
          x: 247,
          y: 230,
          adjusted: false
        });
        drawer.text({
          text: "You have " + ship.ore + " ore",
          x: 260,
          y: 270,
          adjusted: false
        });
      }
      drawer.text({
        text: "Leave Earth by pressing ENTER",
        x: 195,
        y: 360,
        adjusted: false
      });
    });
  }
}
