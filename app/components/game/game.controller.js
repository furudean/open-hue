angular.module('game')
  .controller('GameController', function(gameBoardService, levelTemplateService, $log, $timeout, $window,
    $stateParams) {
    const vm = this;
    const {GameBoard} = gameBoardService;
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

      vm.board = board = new GameBoard(template);
      const tweenDelay = 1200 / board.draggableTiles.length;

      await sleep(2000);

      await board.hide(tweenDelay, notLockedFilter);

      board.shuffle();
      board.show(tweenDelay, notLockedFilter);
    }

    init();
  });
