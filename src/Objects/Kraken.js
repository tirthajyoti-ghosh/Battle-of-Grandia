import 'phaser';
import Entity from './Entity';

export default class Kraken extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'kraken', 6, 0.9);

    this.body.immovable = true;
    this.body.moves = false;

    scene.anims.create({
      key: 'idle',
      frames: scene.anims.generateFrameNumbers('kraken', { frames: [6, 7, 8]}),
      frameRate: 10,
      repeat: -1
    });
  }
}
