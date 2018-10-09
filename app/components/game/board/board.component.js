function boardController($log, board, map) {
  const vm = this;

  const level = map.getLevel(0);

  vm.board = board.deseralize(level);
  $log.debug(vm.board);
}

angular.module('game')
  .component('board', {
    templateUrl: 'components/game/board/board.html',
    controller: boardController,
  });
