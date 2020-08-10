/* eslint no-undef: 0 */
import WelcomeScene from '../src/Scenes/WelcomeScene';

test('WelcomeScene is a subclass of Phaser.Scene', () => {
  expect(WelcomeScene).toBeSubclassOf(Phaser.Scene);
});
