/* eslint no-undef: 0 */
import 'phaser';
import Warrior from '../Objects/Warrior';
import Kraken from '../Objects/Kraken';

export default class WorldScene extends Phaser.Scene {
  constructor() {
    super('World');
  }

  onMeetEnemy() {
    // shake the world
    this.cameras.main.shake(3000);

    // start battle

    this.scene.start('Battle');
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });

    const tiles = map.addTilesetImage('spritesheet', 'tiles');

    map.createStaticLayer('Tile Layer 1', tiles, 0, 0);
    map.createStaticLayer('Tile Layer 2', tiles, 0, 0);

    const obstacles = map.createStaticLayer('obstacles', tiles, 0, 0);
    obstacles.setCollisionByExclusion([-1]);

    this.warrior = new Warrior(this, 25, 25);

    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;

    this.physics.add.collider(this.warrior, obstacles);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.roundPixels = true;

    this.cameraDolly = new Phaser.Geom.Point(this.warrior.x, this.warrior.y);
    this.cameras.main.startFollow(this.cameraDolly);

    this.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });

    this.warrior.createAnimation();

    this.anims.create({
      key: 'rotate',
      frames: this.anims.generateFrameNumbers('kraken', { frames: [6, 7, 8] }),
      frameRate: 10,
      repeat: -1,
    });

    this.spawns = this.add.group();

    for (let i = 0; i < 30; i += 1) {
      const x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      const y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

      const kraken = new Kraken(this, x, y);
      kraken.setVisible(false);

      // parameters are x, y, width, height
      this.spawns.add(new Kraken(this, x, y));
    }

    this.physics.add.collider(this.warrior, this.spawns, this.onMeetEnemy, false, this);
  }

  update() {
    for (let i = 0; i < 30; i += 1) {
      this.spawns.getChildren()[i].setVisible(true);
      this.spawns.getChildren()[i].setScale(0.4);
      this.spawns.getChildren()[i].anims.play('rotate', true);
    }

    this.cameraDolly.x = Math.floor(this.warrior.x);
    this.cameraDolly.y = Math.floor(this.warrior.y);

    this.warrior.body.setVelocity(0);

    // Horizontal movement
    if (this.inputKeys.left.isDown) {
      this.warrior.body.setVelocityX(-100);
    } else if (this.inputKeys.right.isDown) {
      this.warrior.body.setVelocityX(100);
    }

    // Vertical movement
    if (this.inputKeys.up.isDown) {
      this.warrior.body.setVelocityY(-100);
    } else if (this.inputKeys.down.isDown) {
      this.warrior.body.setVelocityY(100);
    }

    if (this.inputKeys.left.isDown) {
      this.warrior.anims.play('left', true);
    } else if (this.inputKeys.right.isDown) {
      this.warrior.anims.play('right', true);
    } else if (this.inputKeys.up.isDown) {
      this.warrior.anims.play('up', true);
    } else if (this.inputKeys.down.isDown) {
      this.warrior.anims.play('down', true);
    } else {
      this.warrior.anims.stop();
      this.warrior.setFrame(0);
    }
  }
}
