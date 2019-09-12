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

let maxHealth = [10, 10, 60, 60, 100, 100, 200, 200, 400, 400];

let descriptions = [
  [],
  [[245, 195, `Speed:     good`, "#ffa"]],
  [[245, 195, `Speed:     great`, "#ffa"]],
];

`
1: start
2: faster
3: stronger
4: secondary laser
5: faster/stronger
6: missiles
7: stronger/fire rate
8: beam
9: stronger/faster/fire rate
10: compass
`

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