angular.module('game')
  .controller('gameController', function(boardService, levelTemplateService, $log) {
    const vm = this;
    const {Board} = boardService;
    const template = levelTemplateService.templates[0];
    const board = new Board(template);
    vm.board = board;
    $log.info(vm.board);
  });
