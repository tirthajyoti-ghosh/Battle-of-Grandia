import Button from '../src/Objects/Button';

test('Button is a subclass of Phaser.GameObjects.Container', () => {
  expect(Button).toBeSubclassOf(Phaser.GameObjects.Container);
});
