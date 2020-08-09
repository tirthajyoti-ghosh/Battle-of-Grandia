import 'regenerator-runtime';

const fetch = require('node-fetch');

const API = (() => {
  async function getScores() {
    try {
      const scores = await fetch(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/awrtkiMDOOhi5bAP1ojY/scores',
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );

      return scores.json();
    } catch (error) {
      return error.json();
    }
  }

  async function postScores(name, score) {
    try {
      const result = await fetch(
        'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/awrtkiMDOOhi5bAP1ojY/scores',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user: name,
            score,
          }),
        },
      );

      return result.json();
    } catch (error) {
      return error.json();
    }
  }

  return { getScores, postScores };
})();

export default API;
