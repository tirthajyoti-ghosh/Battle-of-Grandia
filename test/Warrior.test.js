/* eslint no-undef: 0 */
import Warrior from '../src/Objects/Warrior';
import Entity from '../src/Objects/Entity';

test('Warrior is a subclass of Entity', () => {
  expect(Warrior).toBeSubclassOf(Entity);
});
