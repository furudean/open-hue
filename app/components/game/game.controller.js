angular.module('game')
  .controller('gameController', function(boardService, levelTemplateService, $log) {
    const vm = this;
    const {Board} = boardService;
    const level = levelTemplateService.levels[0];
    const board = new Board(level);
    vm.board = board;
    $log.info(vm.board);
  });
