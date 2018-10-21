angular.module('game')
  .controller('gameController', function(boardService, levelTemplateService, $log, $timeout, $window) {
    const vm = this;
    const {Board} = boardService;
    let board;

    vm.onTileMoved = function(event) {
      const isWin = board.isWin();
      if (isWin) {
        $window.alert('you win!');
        // board.setHiddenAll(true, 20, true);
      }
    };

    function init(params) {
      const template = levelTemplateService.templates[0];
      board = vm.board = new Board(template);
      $timeout(async () => {
        await board.setHiddenAll(true, 20);
        board.shuffle();
        board.setHiddenAll(false, 20);
      }, 1000);
    }

    init();
  });
