angular.module('game')
  .controller('gameController', function(boardService, levelTemplateService, $log, $timeout) {
    const vm = this;
    const {Board} = boardService;
    const template = levelTemplateService.templates[0];
    const board = vm.board = new Board(template);

    function init(params) {
      $timeout(() => {
        board.shuffle();
      }, 2000);
    }

    init();
  });
