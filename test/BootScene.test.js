/* eslint no-undef: 0 */
import BootScene from '../src/Scenes/BootScene';

test('BootScene is a subclass of Phaser.Scene', () => {
  expect(BootScene).toBeSubclassOf(Phaser.Scene);
});
