'use strict';

function tileController($log, board) {
  const vm = this;

  vm.board = board.new(4, 6);
  $log.debug(vm.board);
}

angular.module('game')
  .component('board', {
    templateUrl: 'components/game/board/board.html',
    controller: tileController,
  });
