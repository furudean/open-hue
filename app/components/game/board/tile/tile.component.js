angular.module('game')
  .component('tile', {
    bindings: {
      tile: '=',
    },
    templateUrl: 'components/game/board/tile/tile.html',
  });
