/* eslint no-undef: 0 */
import Fireball from '../src/Fireball';

test('Fireball is a subclass of Phaser.GameObjects.Sprite', () => {
  expect(Fireball).toBeSubclassOf(Phaser.GameObjects.Sprite);
});
