/* eslint no-undef: 0 */
import 'phaser';
import Button from '../Objects/Button';
import API from '../Objects/API';

export default class LeaderBoardScene extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }

  create() {
    API.getScores().then((data) => {
      const { result } = data;

      result.sort((a, b) => b.score - a.score);
      this.add.text(195, 50, 'RANK      NAME                 SCORE');
      this.size = result.length < 10 ? result.length : 10;

      let padding = 40;
      for (let i = 0; i < this.size; i += 1) {
        this.add.text(210, 50 + padding, (i + 1));
        this.add.text(290, 50 + padding, result[i].user);
        this.add.text(500, 50 + padding, result[i].score);

        padding += 40;
      }
    });

    this.menuButton = new Button(this, 400, 550, 'blueButton1', 'blueButton2', 'Menu', 'Title');
  }
}
