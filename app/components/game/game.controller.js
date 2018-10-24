angular.module('game')
  .controller('gameController', function(boardService, levelTemplateService, $log, $timeout, $window) {
    const vm = this;
    const {Board} = boardService;
    let board;

    vm.onTileMoved = function(event) {
      const isWin = board.isWin();
      if (isWin) {
        $timeout(() => {
          $window.alert('you win!');
        }, 500);
        // board.setHiddenAll(true, 20, true);
      }
    };

    function init(params) {
      const template = levelTemplateService.templates[1];
      board = vm.board = new Board(template);
      $timeout(async () => {
        await board.setHiddenAll(true);
        board.shuffle();
        board.setHiddenAll(false);
      }, 2000);
    }

    init();
  });
