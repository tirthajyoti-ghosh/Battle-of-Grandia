import 'phaser';
import Fireball from '../Fireball';
import Warrior from '../Objects/Warrior';
import Kraken from '../Objects/Kraken';

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super('Battle');

    this.warriorHealth = 100;
    this.krakenHealth = 1000;
  }

  shootFireball(angle) {
    const fireball = new Fireball(this, angle);
  }

  onAttack(warrior, kraken) {
    if (Phaser.Input.Keyboard.JustDown(this.space)) {
      this.krakenHealth -= 100;  
    }    
  }

  warriorDied() {
    this.scene.start('GameOver');
  }

  krakenDied() {
    
  }

  create() {
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
