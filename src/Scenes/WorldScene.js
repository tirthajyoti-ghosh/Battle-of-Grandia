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

    this.player = this.physics.add.sprite(25, 25, 'player', 4);

    this.player.setScale(1.5);

    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    this.physics.add.collider(this.player, obstacles);
    
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    this.cameraDolly = new Phaser.Geom.Point(this.player.x, this.player.y);
    this.cameras.main.startFollow(this.cameraDolly);

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
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { frames: [4, 5, 6, 7]}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { frames: [0, 1, 2, 3] }),
      frameRate: 10,
      repeat: -1
    });

    this.spawns = this.physics.add.group({ classType: Phaser.GameObjects.Zone });

    for(var i = 0; i < 30; i++) {
      var x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      var y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

      // parameters are x, y, width, height
      this.spawns.create(x, y, 50, 50);            
    }        

    this.physics.add.overlap(this.player, this.spawns, this.onMeetEnemy, false, this);

  }

  update() {
    this.cameraDolly.x = Math.floor(this.player.x);
    this.cameraDolly.y = Math.floor(this.player.y);

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
      this.player.setFrame(4);
    }
  }
};
