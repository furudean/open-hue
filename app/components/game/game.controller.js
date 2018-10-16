angular.module('game')
  .controller('gameController', function(boardService, levelTemplateService, $log) {
    const vm = this;
    const {Board} = boardService;
    const template = levelTemplateService.templates[0];
    const board = vm.board = new Board(template);

    board.shuffle();

    $log.info(vm.board);
  });
