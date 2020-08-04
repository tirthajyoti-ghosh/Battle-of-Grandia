import 'phaser';
 
export default class WorldScene extends Phaser.Scene {
  constructor () {
    super('World');
  }
 
  create () {
    var map = this.make.tilemap({ key: 'map' });

    var tiles = map.addTilesetImage('spritesheet', 'tiles');
        
    var tile1 = map.createStaticLayer('Tile Layer 1', tiles, 0, 0);

    var tile2 = map.createStaticLayer('Tile Layer 2', tiles, 0, 0);

    var obstacles = map.createStaticLayer('obstacles', tiles, 0, 0);

    obstacles.setCollisionByExclusion([-1]);
  }
};
