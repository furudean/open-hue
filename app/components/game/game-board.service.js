angular.module('game')
  .factory('gameBoardService', (boardService, matrixParserService, $timeout, $log) => {
    const {Board, Tile} = boardService;

    class GameTile extends Tile {
      constructor(color, index, isLocked) {
        super(color, index, isLocked);

        this.isHidden = false;
        this.style = {
          background: color,
        };
      }

      async hide(delay) {
        return _setHiddenTile(this, true, delay);
      }

      async show(delay) {
        return _setHiddenTile(this, false, delay);
      }
    }

    class GameBoard extends Board {
      constructor(template) {
        super(template, GameTile);

        this.name = template.name;
        this.style = {
          gridTemplateRows: `repeat(${this.height}, 1fr)`,
          gridTemplateColumns: `repeat(${this.width}, 1fr)`,
        };
      }

      get draggableTiles() {
        return this.tiles
          .map((tile) => tile.locked === false);
      }

      get lockedTiles() {
        return this.tiles
          .map((tile) => tile.locked === true);
      }

      async hide(tweenTime, filterFn) {
        return _setHiddenBoard(this.tiles, true, tweenTime, filterFn);
      }

      async show(tweenTime, filterFn) {
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

        const indicesToShuffle = this.tiles
          .map((tile, i) => tile.isLocked ? null : i)
          .filter((i) => i !== null);

        shuffleIndices(this.tiles, indicesToShuffle);
      }
    }

    function _setHiddenTile(tile, hidden, delay) {
      return new Promise((resolve, reject) => {
        $timeout(() => {
          $log.info(delay);
          tile.isHidden = hidden;
          $timeout(() => {
            resolve();
          }, 300, false); // wait for tween before resolving
        }, delay);
      });
    }

    function _setHiddenBoard(tiles, hidden, delay, filterFn = () => true) {
      const hiddenPromises = tiles
        .filter(filterFn)
        .map((tile, i) => _setHiddenTile(tile, hidden, i * delay));

      return Promise.all(hiddenPromises);
    }

    return {
      GameBoard,
    };
  });
