import 'phaser';
import Entity from './Entity';

export default class Warrior extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'warrior', 0, 0.6);

    this.scene = scene;
  }

  createAnimation() {
    this.scene.anims.create({
      key: 'left',
      frames: this.scene.anims.generateFrameNumbers('warrior', { frames: [13, 14, 15, 16, 17]}),
      frameRate: 10,
      repeat: -1
    });
      
    this.scene.anims.create({
      key: 'right',
      frames: this.scene.anims.generateFrameNumbers('warrior', { frames: [19, 20, 21, 22, 23] }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'up',
      frames: this.scene.anims.generateFrameNumbers('warrior', { frames: [6, 7, 8, 9, 10, 11]}),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'down',
      frames: this.scene.anims.generateFrameNumbers('warrior', { frames: [0, 1, 2, 3, 4, 5] }),
      frameRate: 10,
      repeat: -1
    });
  }
}
