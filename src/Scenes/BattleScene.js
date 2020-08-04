import 'phaser';

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super('Battle');
  }

  create() {
    var battleMap = this.make.tilemap({ key: 'battle-map' });

    var tiles = battleMap.addTilesetImage('spritesheet', 'tiles');

    var border = battleMap.createStaticLayer('border', tiles, 0, 0);
    border.setCollisionByExclusion([-1]);

    this.player = this.physics.add.sprite(25, 25, 'player', 0);

    this.player.setScale(0.15);

    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, obstacles);
  }
}
