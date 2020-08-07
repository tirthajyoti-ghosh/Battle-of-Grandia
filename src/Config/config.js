import 'phaser';
 
export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 640,
  pixelArt: true,
  roundPixels: true,
  dom: {
    createContainer: true,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true
    }
  }
};
