/* eslint no-undef: 0 */
import GameOverScene from '../src/Scenes/GameOverScene';

test('GameOverScene is a subclass of Phaser.Scene', () => {
  expect(GameOverScene).toBeSubclassOf(Phaser.Scene);
});
