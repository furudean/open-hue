angular.module('game')
  .factory('boardService', (gradientService, matrixParserService, $timeout, $log) => {
    class Tile {
      constructor(color, locked, index) {
        this.color = color;
        this.locked = locked;
        this.index = index;
        this.hidden = false;
        this.style = {
          background: this.color,
        };
      }

      async setHidden(hidden, delay, doLocked = false) {
        return new Promise((resolve, reject) => {
          if (doLocked || !this.locked) {
            $timeout(() => {
              this.hidden = hidden;
              $timeout(() => {
                resolve();
              }, 300); // wait for tween before resolving
            }, delay);
          } else {
            resolve();
          }
        });
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

      async setHiddenAll(hidden, tweenTime = 0, doLocked = false) {
        const hiddenPromises = this.tiles.map((tile, i) =>
          tile.setHidden(hidden, i * tweenTime, doLocked));

        return Promise.all(hiddenPromises);
      }

      async shuffle() {
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
          .map((tile, i) => tile.locked ? null : i)
          .filter((i) => i !== null);
        const tweenTime = 800 / this.tiles.length;

        await this.setHiddenAll(true, tweenTime);
        shuffleIndices(this.tiles, indicesToShuffle);
        await this.setHiddenAll(false, tweenTime);
      }

      isWin() {
        return this.tiles.every((tile, i) => tile.index === i);
      }
    }

    const toTiles = (template) => template.flat()
      .map(({color, locked}, index) => new Tile(color, locked, index));

    return {
      Board,
    };
  });
