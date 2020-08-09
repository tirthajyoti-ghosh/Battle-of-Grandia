/* eslint no-undef: 0 */
import 'phaser';
import box from '../assets/ui/grey_box.png';
import blueButton1 from '../assets/ui/blue_button1.png';
import blueButton2 from '../assets/ui/blue_button2.png';
import checkedBox from '../assets/ui/blue_boxCheckmark.png';
import bgMusic from '../assets/TownTheme.mp3';

import tiles from '../assets/map/spritesheet.png';
import map from '../assets/map/map.json';
import battleMap from '../assets/map/battle.json';
import warrior from '../assets/hero_sprite.png';
import fireball from '../assets/fireball.png';
import explosion from '../assets/explosion.png';
import swordFlash from '../assets/sword_flash.png';
import kraken from '../assets/kraken.png';

import LocalStorage from '../Objects/LocalStorage';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    this.readyCount = 0;
  }

  isNamePresent() {
    if (LocalStorage.readName() !== null) {
      return true;
    } else {
      return false;
    }
  }

  ready() {
    this.readyCount += 1;
    if (this.readyCount === 2) {
      if (this.isNamePresent()) {
        this.scene.start('Title');
      } else {
        this.scene.start('Welcome');
      }
    }
  }

  preload() {
    // add logo image
    this.add.image(400, 200, 'game-logo');

    // display progress bar
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();

    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 290, 320, 50);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    // update progress bar
    this.load.on('progress', (value) => {
      percentText.setText(`${parseInt(value * 100, 10)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 300, 300 * value, 30);
    });

    // update file progress text
    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    // remove progress bar when complete
    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    // load assets needed in our game
    this.load.image('box', box);
    this.load.image('blueButton1', blueButton1);
    this.load.image('blueButton2', blueButton2);
    this.load.image('checkedBox', checkedBox);
    this.load.audio('bgMusic', [bgMusic]);

    // map tiles
    this.load.image('tiles', tiles);

    // map in json format
    this.load.tilemapTiledJSON('map', map);

    // battle map in json format
    this.load.tilemapTiledJSON('battle-map', battleMap);

    // hero spritesheet
    this.load.spritesheet('warrior', warrior, { frameWidth: 32, frameHeight: 64 });

    // fireball image
    this.load.image('fireball', fireball);

    // explosion image
    this.load.spritesheet('explosion', explosion, { frameWidth: 400, frameHeight: 400 });

    // sword flash image
    this.load.spritesheet('sword_flash', swordFlash, { frameWidth: 33, frameHeight: 33 });

    // kraken spritesheet
    this.load.spritesheet('kraken', kraken, { frameWidth: 96, frameHeight: 128 });
  }
}
