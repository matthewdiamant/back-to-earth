export default class CollisionDetector {
  handle(projectile, object) {
    if (
      !(projectile.exploding || object.exploding) &&
      projectile.x < object.x + object.size / 2 &&
      projectile.x + projectile.size > object.x - object.size / 2 &&
      projectile.y < object.y + object.size / 2 &&
      projectile.y + projectile.size > object.y - object.size / 2
    ) {
      projectile.destroy();
      object.takeDamage(projectile);
    }
  }
}
