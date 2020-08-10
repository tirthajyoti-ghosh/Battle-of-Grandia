/* eslint no-undef: 0 */
import CreditsScene from '../src/Scenes/CreditsScene';

test('CreditsScene is a subclass of Phaser.Scene', () => {
  expect(CreditsScene).toBeSubclassOf(Phaser.Scene);
});
