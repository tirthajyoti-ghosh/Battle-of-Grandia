import WorldScene from '../src/Scenes/WorldScene';

test('WorldScene is a subclass of Phaser.Scene', () => {
  expect(WorldScene).toBeSubclassOf(Phaser.Scene);
});
