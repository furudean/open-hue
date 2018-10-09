angular.module('game')
  .factory('board', () => {
    function deseralize(map) {
      const {rows, cols} = map;
      const style = `
      grid-template-rows: repeat(${rows}, 1fr);
      grid-template-columns: repeat(${cols}, 1fr);
      `.replace(/\s/g, ''); // trims whitespace

      const tiles = map.matrix
        .flat()
        .map((tile) => ({
          style: `background: ${tile.color}`,
        }));

      return {
        tiles,
        style,
      };
    }
    return {
      deseralize,
    };
  });
