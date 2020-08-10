import LocalStorage from '../src/Objects/LocalStorage';

it('should save score to local storage', () => {
  LocalStorage.saveScore('This is a score');
  expect(JSON.parse(localStorage.getItem('score'))).toBe('This is a score');
});

it('should save name to local storage', () => {
  LocalStorage.saveName('This is a name');
  expect(JSON.parse(localStorage.getItem('name'))).toBe('This is a name');
});

it('should read score from local storage', () => {
  localStorage.setItem('score', JSON.stringify('This is second score'));
  expect(LocalStorage.readScore()).toBe('This is second score');
});

it('should read name from local storage', () => {
  localStorage.setItem('name', JSON.stringify('This is second name'));
  expect(LocalStorage.readName()).toBe('This is second name');
});
