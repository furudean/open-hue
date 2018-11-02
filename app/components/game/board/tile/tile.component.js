angular.module('game')
  .component('tile', {
    bindings: {
      tile: '<',
      index: '<',
      isDraggable: '<',
      dropFn: '=',
    },
    templateUrl: 'tile.html',
  });
