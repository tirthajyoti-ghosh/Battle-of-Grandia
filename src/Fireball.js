import 'phaser';
import config from './Config/config';

export default class Fireball extends Phaser.GameObjects.Sprite {
  constructor(scene, angle){
    super(scene, 400, 320, 'fireball');

    scene.projectiles.add(this);

    // scene.add.existing(this);

    scene.physics.world.enableBody(this);
    this.setScale(0.3);

    const vec = scene.physics.velocityFromAngle(angle, 320);
    this.body.velocity.x = vec.x;
    this.body.velocity.y = vec.y;
  }

  update() {
    if ((this.x < 100) || (this.y < 100)) {
      this.destroy();
    }
  }
}
