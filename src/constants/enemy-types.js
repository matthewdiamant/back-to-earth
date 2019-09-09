export default [
  {
    draw: (drawer, x, y, size, rotation) => {
      drawer.draw(() => {
        drawer.rect({
          rect: [x - size / 2, y - size / 2, size, size],
          fillColor: "#fff",
          rotation: rotation,
          size: size
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
        drawer.rect({
          rect: [x - size / 2, y - size / 2, size, size],
          fillColor: "#fff",
          rotation: rotation,
          size: size
        });
      });
    },
    acceleration: 0.05,
    turnSpeed: 0.1,
    maxSpeed: 1.5,
    weapons: ["enemy-laser"],
    mainLaserCooldown: 0.5,
    health: 5,
    bounty: 100,
    size: 10
  }
];
