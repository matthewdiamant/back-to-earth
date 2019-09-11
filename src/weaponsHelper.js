import Projectile from "./Projectile.js";

export function fireMainWeapon({
  canFire,
  cooldown,
  x,
  y,
  size,
  yaw,
  type,
  owner,
  sound
}) {
  if (canFire) {
    owner.projectiles.push(
      new Projectile({
        x: x + (Math.sin(yaw) * size) / 2,
        y: y - (Math.cos(yaw) * size) / 2,
        yaw,
        damage: 1,
        type,
        owner: owner
      })
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
      new Projectile({ x, y, yaw, damage: 1, type: type, owner: owner })
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
