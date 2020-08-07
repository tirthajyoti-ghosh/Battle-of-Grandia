import 'phaser';
import './style.css';
import config from './Config/config';
import Model from './Model';
import WorldScene from './Scenes/WorldScene';
import BattleScene from './Scenes/BattleScene';
import GameOverScene from './Scenes/GameOverScene';
import BootScene from './Scenes/BootScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import WelcomeScene from './Scenes/WelcomeScene';
import OptionsScene from './Scenes/OptionsScene';
import CreditsScene from './Scenes/CreditsScene';
 
class Game extends Phaser.Game {
  constructor () {
    super(config);

    const model = new Model();
    this.globals = { model, bgMusic: null };

    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Welcome', WelcomeScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('World', WorldScene);
    this.scene.add('Battle', BattleScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.start('Boot');
  }
}
 
window.game = new Game();
