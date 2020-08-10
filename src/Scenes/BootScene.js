/* eslint no-undef: 0 */
import 'phaser';
import gameLogo from '../assets/rpg-game.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('game-logo', gameLogo);
  }

  create() {
    this.scene.start('Preloader');
  }
}
