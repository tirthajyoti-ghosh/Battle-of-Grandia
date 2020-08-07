import 'phaser';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class GameOverScene extends Phaser.Scene {
  constructor () {
    super('GameOver');
  }

  create() {
    this.title = this.add.text(this.game.config.width * 0.5, 128, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.title.setOrigin(0.5);

    this.title = this.add.text(
      this.game.config.width * 0.5,
      200,
      `Your score is: 123456`,
      {
        fontFamily: 'monospace',
        fontSize: 32,
        fontStyle: 'bold',
        color: '#ffffff',
        align: 'center',
      },
    );
    this.title.setOrigin(0.5);

    this.topScore = new Button(
      this,
      config.width / 2,
      config.height - 350,
      'blueButton1',
      'blueButton2',
      'Top Score',
      'LeaderBoard',
    );

    this.gameButton = new Button(
      this,
      config.width / 2,
      config.height - 200,
      'blueButton1',
      'blueButton2',
      'Play Again',
      'World',
    );
  }

}
