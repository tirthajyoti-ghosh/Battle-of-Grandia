import 'phaser';
import Entity from './Entity';

export default class Warrior extends Entity {
  constructor(scene) {
    super(scene, 400, 590, 'warrior', 4, 1.5);

    this.scene = scene;
  }

  createAnimation() {
    this.scene.anims.create({
      key: 'left',
      frames: this.scene.anims.generateFrameNumbers('warrior', { frames: [8, 9, 10, 11]}),
      frameRate: 10,
      repeat: -1
    });
      
    this.scene.anims.create({
      key: 'right',
      frames: this.scene.anims.generateFrameNumbers('warrior', { frames: [12, 13, 14, 15] }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'up',
      frames: this.scene.anims.generateFrameNumbers('warrior', { frames: [4, 5, 6, 7]}),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'down',
      frames: this.scene.anims.generateFrameNumbers('warrior', { frames: [0, 1, 2, 3] }),
      frameRate: 10,
      repeat: -1
    });
  }
}
