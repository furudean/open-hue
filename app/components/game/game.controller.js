angular.module('game')
  .controller('GameController', function(boardService, levelTemplateService, $log, $timeout, $window, $stateParams) {
    const vm = this;
    const {Board} = boardService;
    let board;

    const sleep = async (ms) => new Promise((resolve) => $timeout(resolve, ms));

    vm.onTileMoved = function(event) {
      const isWin = board.isWin();
      if (isWin) {
        $timeout(() => {
          $window.alert('you win!');
        }, 500);
        // board.hide(true, 20, true);
      }
    };

    async function init() {
      const template = levelTemplateService.templates[$stateParams.id - 1];
      const notLockedFilter = (tile) => tile.isLocked === false;

      board = new Board(template);
      board.hide();

      $timeout(async () => {
        const longTween = 800 / board.tiles.length;
        const shortTween = 600 / board.draggableTiles.length;

        vm.board = board;

        await board.show(longTween);
        await sleep(2500);

        await board.hide(shortTween, notLockedFilter);

        board.shuffle();
        board.show(shortTween, notLockedFilter);
      });
    }

    init();
  });
