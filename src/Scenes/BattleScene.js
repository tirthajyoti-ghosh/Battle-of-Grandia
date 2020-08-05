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

    this.warrior = this.physics.add.sprite(400, 590, 'warrior', 4);

    this.warrior.setScale(1.5);

    this.physics.add.collider(this.warrior, border);
    
    this.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('warrior', { frames: [8, 9, 10, 11]}),
      frameRate: 10,
      repeat: -1
    });
      
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('warrior', { frames: [12, 13, 14, 15] }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('warrior', { frames: [4, 5, 6, 7]}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('warrior', { frames: [0, 1, 2, 3] }),
      frameRate: 10,
      repeat: -1
    });

    this.kraken = this.physics.add.sprite(400, 320, 'kraken', 6);

    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('kraken', { frames: [6, 7, 8]}),
      frameRate: 10,
      repeat: -1
    });
  }
  
  update() {
    this.kraken.anims.play('idle', true);

    this.warrior.body.setVelocity(0);
 
    // Horizontal movement
    if (this.inputKeys.left.isDown) {
      this.warrior.body.setVelocityX(-100);
    }
    else if (this.inputKeys.right.isDown) {
      this.warrior.body.setVelocityX(100);
    }

    // Vertical movement
    if (this.inputKeys.up.isDown) {
      this.warrior.body.setVelocityY(-100);
    }
    else if (this.inputKeys.down.isDown) {
      this.warrior.body.setVelocityY(100);
    }  

    if (this.inputKeys.left.isDown) {
      this.warrior.anims.play('left', true);
    }
    else if (this.inputKeys.right.isDown) {
      this.warrior.anims.play('right', true);
    }
    else if (this.inputKeys.up.isDown) {
      this.warrior.anims.play('up', true);
    }
    else if (this.inputKeys.down.isDown) {
      this.warrior.anims.play('down', true);
    }
    else {
      this.warrior.anims.stop();
    }
  }
}
