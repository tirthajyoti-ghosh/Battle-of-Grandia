import 'phaser';
 
export default class PreloaderScene extends Phaser.Scene {
  constructor () {
    super('Preloader');
  }

  init () {
    this.readyCount = 0;
  }
   
  ready () {
    this.scene.start('Battle');
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
 
  preload () {
    // add logo image
    this.add.image(400, 200, 'game-logo');
   
    // display progress bar
    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();

    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 290, 320, 50);
   
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    var loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff'
      }
    });
    loadingText.setOrigin(0.5, 0.5);
   
    var percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    percentText.setOrigin(0.5, 0.5);
   
    var assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff'
      }
    });
    assetText.setOrigin(0.5, 0.5);
   
    // update progress bar
    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 300, 300 * value, 30);
    });
   
    // update file progress text
    this.load.on('fileprogress', function (file) {
      assetText.setText('Loading asset: ' + file.key);
    });
   
    // remove progress bar when complete
    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    }.bind(this));
     
    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);
   
    // load assets needed in our game
    this.load.image('phaserLogo', '../src/assets/logo.png');
    this.load.image('box', '../src/assets/ui/grey_box.png');
    this.load.image('blueButton1', '../src/assets/ui/blue_button1.png');
    this.load.image('blueButton2', '../src/assets/ui/blue_button2.png');
    this.load.image('checkedBox', '../src/assets/ui/blue_boxCheckmark.png');
    this.load.audio('bgMusic', ['../src/assets/TownTheme.mp3']);

    // map tiles
    this.load.image('tiles', '../src/assets/map/spritesheet.png');
    
    // map in json format
    this.load.tilemapTiledJSON('map', '../src/assets/map/map.json');
    
    // battle map in json format
    this.load.tilemapTiledJSON('battle-map', '../src/assets/map/battle.json');

    // hero spritesheet
    this.load.spritesheet('warrior', '../src/assets/hero_sprite.png', { frameWidth: 32, frameHeight: 64 });

    // fireball image
    this.load.image('fireball', '../src/assets/fireball.png');

    // sword flash image
    this.load.spritesheet('explosion', '../src/assets/explosion.png', { frameWidth: 400, frameHeight: 400 });

    // fireball image
    this.load.spritesheet('sword_flash', '../src/assets/sword_flash.png', { frameWidth: 33, frameHeight: 33 });

    // kraken spritesheet
    this.load.spritesheet('kraken', '../src/assets/kraken.png', { frameWidth: 96, frameHeight: 128 });

  }
};
