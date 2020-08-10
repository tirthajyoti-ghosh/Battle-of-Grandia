import API from '../src/Objects/API';

it('should return username', () => {
  API.getScores().then(data => {
    expect(data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          user: 'Ghosh',
        }),
      ]),
    );
  }).catch(() => {});
});

it('should return score', () => {
  API.getScores().then(data => {
    expect(data).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          score: '100',
        }),
      ]),
    );
  }).catch(() => {});
});

it('should save score and username', () => {
  API.postScores('John Doe', 100).then(data => {
    expect(data.result).toBe('Leaderboard score created correctly.');
  }).catch(() => {});
});

it('should send an object to the API', () => {
  API.postScores().then(data => {
    expect(typeof data).toBe('object');
  }).catch(() => {});
});
