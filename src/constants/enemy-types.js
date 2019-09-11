import shipDesigns from "./ship-designs";

export default [
  {
    draw: (drawer, x, y, size, rotation) => {
      drawer.draw(() => {
        drawer.fill({
          path: new Path2D(shipDesigns.enemies.medium),
          x: x,
          y: y,
          rotation: rotation,
          fillColor: "#700",
          strokeColor: "#a44",
          centered: false,
          size
        });
      });
    },
    acceleration: 0.01,
    turnSpeed: 0.05,
    maxSpeed: 1,
    weapons: ["enemy-laser"],
    mainLaserCooldown: 0.5,
    health: 5,
    bounty: 100,
    size: 20
  },
  {
    draw: (drawer, x, y, size, rotation) => {
      drawer.draw(() => {
        drawer.fill({
          path: new Path2D(shipDesigns.enemies.small),
          x: x,
          y: y,
          rotation: rotation,
          fillColor: "#700",
          strokeColor: "#a44",
          centered: false,
          size
        });
      });
    },
    acceleration: 0.05,
    turnSpeed: 0.1,
    maxSpeed: 1.5,
    weapons: ["enemy-laser"],
    mainLaserCooldown: 0.5,
    health: 3,
    bounty: 100,
    size: 10
  },

  {
    draw: (drawer, x, y, size, rotation) => {
      drawer.draw(() => {
        drawer.fill({
          path: new Path2D(shipDesigns.enemies.large),
          x: x,
          y: y,
          rotation: rotation,
          fillColor: "#700",
          strokeColor: "#a44",
          centered: false,
          size
        });
      });
    },
    acceleration: 0.05,
    turnSpeed: 0.1,
    maxSpeed: 1.5,
    weapons: ["enemy-laser"],
    mainLaserCooldown: 0.5,
    health: 10,
    bounty: 100,
    size: 40
  }
];
