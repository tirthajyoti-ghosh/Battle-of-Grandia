import 'phaser';
import Fireball from '../Fireball';
import Warrior from '../Objects/Warrior';
import Kraken from '../Objects/Kraken';

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super('Battle');
  }

  showWinBanner() {
    this.winText = this.add.text(330, 115, 'You Won!!', { fontSize: '26px', fill: '#000' });
    this.banner = this.add.graphics();

    this.banner.lineStyle(1, 0xffffff, 0.8);
    this.banner.fillStyle(0x031f4c, 0.3);        
    this.banner.strokeRect(250, 100, 300, 60);
    this.banner.fillRect(250, 100, 300, 60);
  }

  shootFireball(angle) {
    const fireball = new Fireball(this, angle);
  }

  onAttack(warrior, kraken) {    
    if (Phaser.Input.Keyboard.JustDown(this.space)) {
      this.krakenHealth -= 100;  

      this.swordFlash.visible = true;
      this.warrior.anims.play('flash', true);
    } else {
      this.swordFlash.visible = false;
    }
  }

  warriorDied() {
    this.scene.start('GameOver');
  }

  krakenDied() {
    this.showWinBanner();   

    this.projectiles.destroy();

    this.explosion.visible = true;
    this.explosion.anims.play('explode', true);

    this.time.delayedCall(5000, () => {  

      this.scene.stop('Battle');
      this.scene.start('World');
    }, [], this);
  }
  
  create() {
    this.warriorHealth = 100;
    this.krakenHealth = 1000;

    var battleMap = this.make.tilemap({ key: 'battle-map' });
    
    var tiles = battleMap.addTilesetImage('spritesheet', 'tiles');
    
    var tile1 = battleMap.createStaticLayer('Tile Layer 1', tiles, 0, 0);
    
    var border = battleMap.createStaticLayer('border', tiles, 0, 0);
    border.setCollisionByExclusion([-1]);
    
    this.warrior = new Warrior(this, 400, 590);
    
    this.physics.add.collider(this.warrior, border);
    
    this.warrior.createAnimation();
    
    this.inputKeys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    });   
    
    this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    
    this.kraken = new Kraken(this);
    
    this.physics.add.collider(this.warrior, this.kraken, this.onAttack, false, this);  
    
    this.lastFired = 0;
    this.projectiles = this.add.group();
    
    this.physics.add.collider(this.projectiles, this.warrior, this.damageWarrior, false, this);
    
    this.explosion = this.add.sprite(400, 320, 'explosion');
    this.explosion.visible = false;
    
    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion', {
        start: 0,
        end: 15
      }),
      frameRate: 5,
      repeat: 0,
      hideOnComplete: true
    }); 

    this.swordFlash = this.add.sprite(this.warrior.x + 20, this.warrior.y + 20, 'sword_flash');
    this.swordFlash.visible = false;
    
    this.anims.create({
      key: 'flash',
      frames: this.anims.generateFrameNumbers('sword_flash', {
        start: 0,
        end: 4
      }),
      frameRate: 10,
      repeat: 0,
      hideOnComplete: true
    });     
  }

  damageWarrior(projectile, warrior) {
    projectile.destroy();

    this.warriorHealth -= 10;    
  }
  
  update(time) {
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
      this.warrior.setFrame(0);
    }

    if (time > this.lastFired){
      const value = Phaser.Math.Between(0, 360);
      this.shootFireball(value);
      this.lastFired = time + 250;
    }    

    for (let i = 0; i < this.projectiles.getChildren().length; i++) {
      const fireball = this.projectiles.getChildren()[i];    

      fireball.update();
    }

    if(this.warriorHealth <= 0) {
      this.warriorDied();
    }

    if(this.krakenHealth <= 0) {
      this.krakenDied();
    }
  }
}
