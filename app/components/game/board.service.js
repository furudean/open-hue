angular.module('game')
  .factory('boardService', (gradientService, matrixParserService) => {
    class Tile {
      constructor(color, locked, index) {
        this.color = color;
        this.locked = locked;
        this.index = index;
        this.style = {
          background: this.color,
        };
      }
    }

    class Board {
      constructor(template) {
        const matrix = matrixParserService.parse(template.matrix);
        const coloredMatrix = gradientService.gradientize(matrix, template.corners);
        const tiles = toTiles(coloredMatrix);

        this.tiles = tiles;
        this.width = matrix[0].length;
        this.height = matrix.length;
        this.style = {
          'grid-template-rows': `repeat(${this.height}, 1fr)`,
          'grid-template-columns': `repeat(${this.width}, 1fr)`,
        };
      }

      shuffle() {
        const shuffleIndices = angular.copy(this.tiles)
          .map((tile, i) => tile.locked ? null : i)
          .filter((i) => i !== null);

        function swap(array, i, j) {
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }

        for (let i = shuffleIndices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const k = shuffleIndices[i];
          const l = shuffleIndices[j];

          swap(this.tiles, k, l);
        }
      }
    }

    const toTiles = (template) => template.flat()
      .map(({color, locked}, index) => new Tile(color, locked, index));

    return {
      Board,
    };
  });
