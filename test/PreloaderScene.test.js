/* eslint no-undef: 0 */
import PreloaderScene from '../src/Scenes/PreloaderScene';

test('PreloaderScene is a subclass of Phaser.Scene', () => {
  expect(PreloaderScene).toBeSubclassOf(Phaser.Scene);
});
