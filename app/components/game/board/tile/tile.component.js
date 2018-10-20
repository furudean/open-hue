angular.module('game')
  .component('tile', {
    bindings: {
      tile: '<',
      index: '<',
      isDraggable: '<',
      dropFn: '=',
    },
    templateUrl: 'components/game/board/tile/tile.html',
  });
