angular.module('game')
  .controller('gameController', function(boardService, levelTemplateService, $log, $timeout, $window, $stateParams) {
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
        // board.setHiddenAll(true, 20, true);
      }
    };

    async function init() {
      const template = levelTemplateService.templates[$stateParams.id - 1];
      vm.board = board = new Board(template);
      board.setHiddenAll(true, 0, true);

      await sleep(); // run an angular cycle to make sure the board is loaded
      await board.setHiddenAll(false, 20, true);
      await sleep(2000);
      await board.setHiddenAll(true);
      board.shuffle();
      board.setHiddenAll(false);
    }

    init();
  });
