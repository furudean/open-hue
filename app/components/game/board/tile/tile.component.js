function tileController($log) {
  const vm = this;
}

angular.module('game')
  .component('tile', {
    bindings: {
      color: '<',
    },
    replace: true,
    templateUrl: 'components/game/board/tile/tile.html',
    controller: tileController,
  });
