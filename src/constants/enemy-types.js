import shipDesigns from "./ship-designs";

/*

  TODO:
  * Small, fast enemy with just beam
  * Medium enemy with primary and secondary
  * Medium missile boat
  * Slow goliath with all weapons
  * HUGE ENEMY / BOSS

*/

export default [
  {
    path: shipDesigns.enemies.medium,
    acceleration: 0.01,
    turnSpeed: 0.05,
    maxSpeed: 1,
    weapons: ["enemy-laser", "enemy-secondary-laser"],
    mainLaserCooldown: 0.5,
    secondaryLaserCooldown: 0.2,
    health: 5,
    bounty: 100,
    size: 20
  },
  {
    path: shipDesigns.enemies.small,
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
    path: shipDesigns.enemies.large,
    acceleration: 0.05,
    turnSpeed: 0.1,
    maxSpeed: 1.5,
    weapons: ["enemy-laser", "enemy-secondary-laser", "enemy-missile"],
    mainLaserCooldown: 0.5,
    secondaryLaserCooldown: 0.2,
    missileCooldown: 0.2,
    health: 10,
    bounty: 100,
    size: 40
  }
];
