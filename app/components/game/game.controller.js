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

      vm.board = board = new Board(template);
      await board.hide(0);

      await board.show();
      await sleep(2000);

      await board.hide(undefined, notLockedFilter);

      board.shuffle();
      board.show(undefined, notLockedFilter);
    }

    init();
  });
