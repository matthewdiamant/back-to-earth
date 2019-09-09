export default class HUD {
  constructor() {
    this.ore = 0;
  }
  tick(ship) {
    this.health = ship.health;
    this.maxHealth = ship.maxHealth;
    this.ore = ship.ore;
  }
  draw(drawer) {
    drawer.draw(() => {
      drawer.rect({
        rect: ["270", "10", 100, 5],
        strokeColor: "#fff",
        adjusted: false
      });
    });
    drawer.draw(() => {
      let hp = this.health / this.maxHealth;
      drawer.rect({
        rect: ["270", "10", hp * 100, 5],
        fillColor: `rgb(${200 - hp * 255}, ${hp * 200}, 0)`,
        adjusted: false
      });
      if (this.ore > -10) {
        let text = `ore: ${this.ore}`;
        drawer.text({
          text,
          x: "299" - (text.length - 6) * 3.5,
          y: "30",
          size: "11px",
          adjusted: false
        });
      }
    });
  }
}
