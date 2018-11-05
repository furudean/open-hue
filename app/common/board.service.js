angular.module('game')
  .factory('boardService', (gradientService, matrixParserService, $timeout, $log) => {
    class Tile {
      constructor(color, index, isLocked) {
        this.color = color;
        this.index = index;
        this.isLocked = isLocked;
      }
    }

    class Board {
      constructor(template, TileClass = Tile) {
        const matrix = matrixParserService.parse(template.matrix);
        const coloredMatrix = gradientService.gradientize(matrix, template.corners);
        const tiles = coloredMatrix.flat()
          .map(({color, isLocked}, index) => new TileClass(color, index, isLocked));

        this.tiles = tiles;
        this.width = matrix[0].length;
        this.height = matrix.length;
      }
    }

    return {
      Board,
      Tile,
    };
  });
