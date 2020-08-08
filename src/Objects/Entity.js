/* eslint no-undef: 0 */
import 'phaser';

export default class Entity extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key, frame, scale) {
    super(scene, x, y, key, frame);

    scene.add.existing(this);

    scene.physics.world.enableBody(this);
    this.setScale(scale);

    this.body.setCollideWorldBounds(true);
  }
}
