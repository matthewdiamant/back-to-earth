let cost = [0, 50, 100, 200, 500, 1200, 4000, 10000, 20000, 50000];

let turnSpeed = [0.05, 0.06, 0.06, 0.06, 0.07, 0.07, 0.07, 0.07, 0.08, 0.08];
let maxSpeed = [1, 1.5, 1.5, 1.5, 2, 2, 2, 2, 3, 3];
let acceleration = [0.01, 0.03, 0.03, 0.03, 0.05, 0.05, 0.05, 0.05, 0.1, 0.1];

let mainLaserCooldown = [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3];
let mainLaserCanFire = [true, true, true, true, true, true, true, true, true, true];

let secondaryLaserCooldown = [false, false, false, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2];
let secondaryLaserCanFire = [false, false, false, true, true, true, true, true, true, true];

let beamCanFire = [false, false, false, false, false, false, false, true, true, true];

let missileCooldown = [false, false, false, false, false, 0.2, 0.2, 0.2, 0.2, 0.2];
let missileCanFire = [false, false, false, false, false, true, true, true, true, true];

let maxHealth = [10, 10, 60, 60, 100, 100, 150, 150, 600, 600];

let descriptions = [
  [],
  [[262, 215, `Speed upgrade`, "#ffa"]],
  [[255, 215, `Shields upgrade`, "#ffa"]],
  [[245, 215, `Dual-blaster lasers`, "#ffa"]],
  [[262, 200, `Speed upgrade`, "#ffa"], [255, 225, `Shields upgrade`, "#ffa"]],
  [[227, 215, `Auto-targeting missiles`, "#ffa"]],
  [[262, 200, `Shields upgrade`, "#ffa"], [223, 225, `Weapon fire rate upgrade`, "#ffa"]],
  [[280, 215, `Beam laser`, "#ffa"]],
  [[262, 195, `Speed upgrade`, "#ffa"], [255, 215, `Shields upgrade`, "#ffa"], [223, 235, `Weapon fire rate upgrade`, "#ffa"]],
  [[222, 215, `Compass to another world`, "#ffa"]],
];

let types = [];
for (let i = 0; i < 10; i++) {
  types.push({
    cost: cost[i],
    turnSpeed: turnSpeed[i],
    maxSpeed: maxSpeed[i],
    acceleration: acceleration[i],
    mainLaserCooldown: mainLaserCooldown[i],
    mainLaserCanFire: mainLaserCanFire[i],
    secondaryLaserCooldown: secondaryLaserCooldown[i],
    secondaryLaserCanFire: secondaryLaserCanFire[i],
    beamCanFire: beamCanFire[i],
    missileCooldown: missileCooldown[i],
    missileCanFire: missileCanFire[i],
    maxHealth: maxHealth[i],
    descriptions: descriptions[i],
  })
}

export default types;