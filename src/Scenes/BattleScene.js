import 'phaser';

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super('Battle');
  }

  create() {
    var battleMap = this.make.tilemap({ key: 'battle-map' });

    var tiles = battleMap.addTilesetImage('spritesheet', 'tiles');

    var tile1 = battleMap.createStaticLayer('Tile Layer 1', tiles, 0, 0);

    var border = battleMap.createStaticLayer('border', tiles, 0, 0);
    border.setCollisionByExclusion([-1]);

    this.player = this.physics.add.sprite(400, 590, 'player', 4);

    this.player.setScale(0.15);

    this.physics.add.collider(this.player, border);
    
    this.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { frames: [8, 9, 10, 11]}),
      frameRate: 10,
      repeat: -1
    });
      
    // animation with key 'right'
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { frames: [12, 13, 14, 15] }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { frames: [4, 5, 6, 7]}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { frames: [0, 1, 2, 3] }),
      frameRate: 10,
      repeat: -1
    });
  }
  
  update() {
    this.player.body.setVelocity(0);
 
    // Horizontal movement
    if (this.inputKeys.left.isDown) {
      this.player.body.setVelocityX(-100);
    }
    else if (this.inputKeys.right.isDown) {
      this.player.body.setVelocityX(100);
    }

    // Vertical movement
    if (this.inputKeys.up.isDown) {
      this.player.body.setVelocityY(-100);
    }
    else if (this.inputKeys.down.isDown) {
      this.player.body.setVelocityY(100);
    }  

    if (this.inputKeys.left.isDown) {
      this.player.anims.play('left', true);
    }
    else if (this.inputKeys.right.isDown) {
      this.player.anims.play('right', true);
    }
    else if (this.inputKeys.up.isDown) {
      this.player.anims.play('up', true);
    }
    else if (this.inputKeys.down.isDown) {
      this.player.anims.play('down', true);
    }
    else {
      this.player.anims.stop();
    }
  }
}
