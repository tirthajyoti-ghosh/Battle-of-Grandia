/* eslint no-undef: 0 */
import LeaderBoardScene from '../src/Scenes/LeaderBoardScene';

test('LeaderBoardScene is a subclass of Phaser.Scene', () => {
  expect(LeaderBoardScene).toBeSubclassOf(Phaser.Scene);
});
