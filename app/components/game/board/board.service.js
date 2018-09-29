'use strict';

angular.module('game')
  .factory('board', ($log) => ({
    new: (rows, cols) => {
      const numberOfTiles = rows * cols;
      const tiles = new Array(numberOfTiles);
      const style = `
        grid-template-rows: repeat(${rows}, 1fr);
        grid-template-columns: repeat(${cols}, 1fr);
      `.replace(/^(\s{2})+/gm, ''); // trims whitespace

      return {
        tiles,
        style,
      };
    },
  }));
