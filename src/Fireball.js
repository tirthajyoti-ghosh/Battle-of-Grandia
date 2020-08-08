/* eslint no-undef: 0 */
import 'phaser';

export default class Fireball extends Phaser.GameObjects.Sprite {
  constructor(scene, angle) {
    super(scene, 400, 320, 'fireball');

    scene.add.existing(this);

    scene.physics.world.enableBody(this);
    this.setScale(0.3);

    const vec = scene.physics.velocityFromAngle(angle, 80);
    this.body.velocity.x = vec.x;
    this.body.velocity.y = vec.y;

    scene.projectiles.add(this);
  }

  update() {
    if ((this.x < 100) || (this.y < 100)) {
      this.destroy();
    }
  }
}
