import 'phaser';

export default class Fireball extends Phaser.GameObjects.Sprite {
  constructor(scene){
    super(scene, 400, 320, 'fireball');

    scene.projectiles.add(this);

    scene.physics.world.enableBody(this);
    this.setScale(0.3);
    this.body.velocity.x = -Phaser.Math.Between(50, 100);
    this.body.velocity.y = -Phaser.Math.Between(50, 100);
  }

  update() {
    if ((this.x < 100) && (this.y < 100)) {
      this.destroy();
    }
  }
}
