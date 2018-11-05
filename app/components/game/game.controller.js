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
      const delay = 40;

      vm.board = board = new GameBoard(template);

      await sleep(2000);

      await board.hide(delay, notLockedFilter);

      board.shuffle();
      board.show(delay, notLockedFilter);
    }

    init();
  });
