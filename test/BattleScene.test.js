/* eslint no-undef: 0 */
import BattleScene from '../src/Scenes/BattleScene';

const scene = new BattleScene();

test('updateWarriorHealth()', () => {
  expect(scene.updateWarriorHealth(100, 10)).toBe(90);
});

test('updateKrakenHealth()', () => {
  expect(scene.updateKrakenHealth(1000, 20)).toBe(980);
});

test('BattleScene is a subclass of Phaser.Scene', () => {
  expect(BattleScene).toBeSubclassOf(Phaser.Scene);
});
