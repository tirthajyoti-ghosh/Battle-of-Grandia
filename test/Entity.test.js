import Entity from '../src/Objects/Entity';

test('Entity is a subclass of Phaser.GameObjects.Sprite', () => {
  expect(Entity).toBeSubclassOf(Phaser.GameObjects.Sprite);
});
