function boardController($log) {
  const vm = this;

  function onDrop(index, tile) {
    const tiles = vm.board.tiles;
    const otherTile = tiles[index]; // find the other tile using the dragged tile index
    const otherIndex = tiles.indexOf(tile); // find the other index using dragged tile

    $log.debug({tiles, index, tile, otherTile, otherIndex});

    tiles[index] = tile;
    tiles[otherIndex] = otherTile;
  }

  vm.onDrop = onDrop;
}

angular.module('game')
  .component('board', {
    templateUrl: 'components/game/board/board.html',
    controller: boardController,
    bindings: {
      board: '=',
    },
  });
