function boardController($log, boardService, mapService) {
  const vm = this;
  const {Map} = mapService;

  const matrix = mapService.maps[0];
  const level = new Map(matrix);

  vm.board = boardService.deseralize(level);
  $log.debug(vm.board);
}

angular.module('game')
  .component('board', {
    templateUrl: 'components/game/board/board.html',
    controller: boardController,
  });
