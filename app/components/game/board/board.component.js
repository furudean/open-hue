angular.module('game')
  .component('board', {
    templateUrl: 'components/game/board/board.html',
    bindings: {
      board: '=',
    },
  });
