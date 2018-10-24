angular.module('game')
  .factory('boardService', (gradientService, matrixParserService, $timeout, $log) => {
    function _setHiddenTile(tile, hidden, delay) {
      return new Promise((resolve, reject) => {
        $timeout(() => {
          tile.isHidden = hidden;
          $timeout(() => {
            resolve();
          }, 300); // wait for tween before resolving
        }, delay);
      });
    }

    function _setHiddenBoard(tiles, hidden, tweenTime, filterFn = () => true) {
      const hiddenPromises = tiles
        .filter(filterFn)
        .map((tile, i) => _setHiddenTile(tile, hidden, i * tweenTime));

      return Promise.all(hiddenPromises);
    }

    class Tile {
      constructor(color, index, isLocked) {
        this.color = color;
        this.index = index;
        this.isLocked = isLocked;
        this.isHidden = false;
        this.style = {};
      }

      async hide(delay) {
        return _setHiddenTile(this, true, delay);
      }

      async show(delay) {
        return _setHiddenTile(this, false, delay);
      }
    }

    class Board {
      constructor(template) {
        const matrix = matrixParserService.parse(template.matrix);
        const coloredMatrix = gradientService.gradientize(matrix, template.corners);
        const tiles = toTiles(coloredMatrix);

        this.name = template.name;
        this.tiles = tiles;
        this.width = matrix[0].length;
        this.height = matrix.length;
        this.style = {
          gridTemplateRows: `repeat(${this.height}, 1fr)`,
          gridTemplateColumns: `repeat(${this.width}, 1fr)`,
        };
      }

      async hide(tweenTime = 20, filterFn) {
        return _setHiddenBoard(this.tiles, true, tweenTime, filterFn);
      }

      async show(tweenTime = 20, filterFn) {
        return _setHiddenBoard(this.tiles, false, tweenTime, filterFn);
      }

      isWin() {
        return this.tiles.every((tile, i) => tile.index === i);
      }

      shuffle() {
        function shuffleIndices(array, indicesToShuffle, i = (indicesToShuffle.length - 1)) {
          if (i > 0) {
            const j = Math.floor(Math.random() * (i + 1));
            const k = indicesToShuffle[i];
            const l = indicesToShuffle[j];

            swapIndex(array, k, l);
            shuffleIndices(array, indicesToShuffle, --i);
          }
        }
        function swapIndex(array, i, j) {
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }

        const indicesToShuffle = angular.copy(this.tiles)
          .map((tile, i) => tile.isLocked ? null : i)
          .filter((i) => i !== null);

        shuffleIndices(this.tiles, indicesToShuffle);
      }
    }

    const toTiles = (template) => template.flat()
      .map(({color, isLocked}, index) => new Tile(color, index, isLocked));

    return {
      Board,
    };
  });
