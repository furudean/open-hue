function tileController() {
  const vm = this;
}

angular.module('game')
  .component('tile', {
    bindings: {
      tileStyle: '<',
    },
    templateUrl: 'components/game/board/tile/tile.html',
    controller: tileController,
  });
