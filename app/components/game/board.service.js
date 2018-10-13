angular.module('game')
  .factory('boardService', () => {
    class Tile {
      constructor(cell, index) {
        this.color = cell?.[0];
        this.locked = cell?.[1] === true;
        this.index = index;
        this.style = {
          background: this.color,
        };
      }
    }

    class Board {
      constructor(matrix) {
        this.tiles = toTiles(matrix);
        this.height = matrix.length;
        this.width = matrix[0].length;
        this.style = {
          'grid-template-rows': `repeat(${this.height}, 1fr)`,
          'grid-template-columns': `repeat(${this.width}, 1fr)`,
        };
      }
    }

    const toTiles = (matrix) => matrix.flat()
      .map((cell, index) => new Tile(cell, index));

    return {
      Board,
    };
  });
