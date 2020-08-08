/* eslint no-undef: 0 */
import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('game-logo', '../src/assets/rpg-game.png');
  }

  create() {
    this.scene.start('Preloader');
  }
}
