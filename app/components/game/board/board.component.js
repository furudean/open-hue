function boardController($log) {
  const vm = this;

  function onDrop(i, tile0) {
    const tiles = vm.board.tiles;
    const j = tiles.indexOf(tile0); // find the other index using dragged tile
    const tile1 = tiles[i]; // find the other tile using the dragged tile index

    $log.debug({i, j, tile0, tile1, tiles});

    tiles[i] = tile0;
    tiles[j] = tile1;

    // execute callback function
    vm.tileMovedFn?.({
      tile0,
      tile1,
    });
  }

  vm.onDrop = onDrop;
}

angular.module('game')
  .component('board', {
    templateUrl: 'board.html',
    controller: boardController,
    bindings: {
      board: '=',
      tileMovedFn: '=',
    },
  });
