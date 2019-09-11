export default [
  {
    turnSpeed: 0.05,
    maxSpeed: 1,
    acceleration: 0.01,
    size: 20,
    mainLaserCooldown: 0.3,
    mainLaserCanFire: true,
    maxHealth: 10
  },
  {
    cost: 100,
    turnSpeed: 0.07,
    maxSpeed: 2,
    acceleration: 0.03,
    size: 20,
    mainLaserCooldown: 0.3,
    mainLaserCanFire: true,
    secondaryLaserCooldown: 0.2,
    secondaryLaserCanFire: true,
    maxHealth: 20,
    speed: "fast",
    weapons: "dual-blasters",
    hull: "strong"
  },
  {
    cost: 400,
    turnSpeed: 0.09,
    maxSpeed: 3,
    acceleration: 0.2,
    size: 20,
    mainLaserCooldown: 0.3,
    mainLaserCanFire: true,
    secondaryLaserCooldown: 0.2,
    secondaryLaserCanFire: true,
    missileCooldown: 0.2,
    missileCanFire: true,
    maxHealth: 40,
    speed: "fastest",
    weapons: "missiles",
    hull: "strong"
  }
];
