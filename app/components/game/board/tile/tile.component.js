function tileController() {
  const vm = this;
}

angular.module('game')
  .component('tile', {
    bindings: {
      style: '<',
    },
    templateUrl: 'components/game/board/tile/tile.html',
    controller: tileController,
  });
