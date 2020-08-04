import 'phaser';
 
export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }
 
  preload () {
    this.load.image('game-logo', '../src/assets/zenva_logo.png');
  }
 
  create () {
    this.scene.start('Preloader');
  }
};
