import shipDesigns from "./ship-designs";

let speed = {
  slow: { acceleration: 0.01, turnSpeed: 0.05, maxSpeed: 1 },
  medium: { acceleration: 0.05, turnSpeed: 0.1, maxSpeed: 1.5 },
  fast: { acceleration: 0.07, turnSpeed: 0.12, maxSpeed: 2 }
};

let size = {
  small: { path: shipDesigns.enemies.small, size: 10 },
  medium: { path: shipDesigns.enemies.medium, size: 20 },
  large: { path: shipDesigns.enemies.large, size: 40 }
};

let health = {
  weak: { health: 3 },
  medium: { health: 5 },
  strong: { health: 20 }
};

let weapons = {
  main: { weapon: "enemy-laser", mainLaserCooldown: 0.5 },
  secondary: { weapon: "enemy-secondary-laser", secondaryLaserCooldown: 0.2 },
  missile: { weapon: "enemy-missile", missileCooldown: 0.2 },
  beam: { weapon: "enemy-beam" }
};

let range = {
  short: {},
  medium: {},
  long: {}
};

export default {
  speed,
  size,
  health,
  weapons,
  range
};
