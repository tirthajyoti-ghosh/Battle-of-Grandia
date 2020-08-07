import 'phaser';
import Entity from './Entity';

export default class Kraken extends Entity {
  constructor(scene, x, y, scale) {
    super(scene, x, y, 'kraken', 6, scale);

    this.body.immovable = true;
    this.body.moves = false;

    scene.anims.create({
      key: 'idle',
      frames: scene.anims.generateFrameNumbers('kraken', { frames: [0, 4, 7, 10]}),
      frameRate: 5,
      repeat: -1
    });
  }
}
