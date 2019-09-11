import Projectile from "./Projectile.js";

export function fireMainWeapon({
  canFire,
  cooldown,
  x,
  y,
  yaw,
  type,
  owner,
  sound
}) {
  if (canFire) {
    owner.projectiles.push(
      new Projectile({ x, y, yaw, damage: 1, type, owner: owner })
    );
    owner.mainLaserCanFire = false;
    window.setTimeout(() => (owner.mainLaserCanFire = true), cooldown * 1000);
    sound();
  }
}

export function fireSecondaryWeapon({
  canFire,
  cooldown,
  x,
  y,
  yaw,
  type,
  owner,
  sound
}) {
  if (canFire) {
    owner.projectiles.push(
      new Projectile({ x, y, yaw, damage: 1, type, owner: owner })
    );
    owner.secondaryLaserPosition *= -1;
    owner.secondaryLaserCanFire = false;
    window.setTimeout(
      () => (owner.secondaryLaserCanFire = true),
      cooldown * 1000
    );
    sound();
  }
}

export function fireMissile({
  canFire,
  cooldown,
  x,
  y,
  yaw,
  type,
  owner,
  target,
  sound
}) {
  if (canFire) {
    owner.projectiles.push(
      new Projectile({ x, y, yaw, damage: 1, type, owner, target })
    );
    owner.missilePosition *= -1;
    owner.missileCanFire = false;
    window.setTimeout(() => (owner.missileCanFire = true), cooldown * 1000);
    sound();
  }
}

export function fireBeam({
  canFire,
  cooldown,
  x,
  y,
  yaw,
  type,
  owner,
  target,
  sound
}) {
  if (canFire) {
    owner.projectiles.push(
      new Projectile({ x, y, yaw, damage: 0.03, type, owner, target })
    );
    sound();
  }
}
