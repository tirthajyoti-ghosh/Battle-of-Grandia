import Kraken from '../src/Objects/Kraken';
import Entity from '../src/Objects/Entity';

test('Kraken is a subclass of Entity', () => {
  expect(Kraken).toBeSubclassOf(Entity);
});
