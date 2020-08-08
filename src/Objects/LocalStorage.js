const LocalStorage = (() => {
  const saveScore = (score) => { localStorage.setItem('score', JSON.stringify(score)); };

  const readScore = () => {
    const score = JSON.parse(localStorage.getItem('score'));

    if (!score) {
      return 0;
    }
    return score;
  };

  const saveName = (name) => { localStorage.setItem('name', JSON.stringify(name)); };

  const readName = () => {
    const name = JSON.parse(localStorage.getItem('name'));

    if (!name) {
      return `Player ${Math.floor((Math.random() * 100) + 1)}`;
    }

    return name;
  };

  return {
    saveScore, readScore, saveName, readName,
  };
})();

export default LocalStorage;
