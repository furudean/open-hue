angular.module('game')
  .factory('mapService', ($log) => {
    const maps = [
      [
        [['#0A2342'], ['#2CA58D']],
        [['#FFFDF7'], ['#84BC9C']],
        [['#F46197'], ['#0A2342']],
      ],
    ];

    class Tile {
      constructor(tile, initialIndex) {
        this.color = tile?.[0];
        this.locked = tile?.[1] || false;
        this.initialIndex = initialIndex;
        this.style = {
          background: this.color,
        };
      }
    }

    class Map {
      constructor(matrix) {
        this.height = matrix.length;
        this.width = matrix[0].length;
        this.tiles = toTiles(matrix);
      }
    }

    function toTiles(matrix) {
      const tiles = [];
      let index = 0;

      $log.debug(matrix);

      for (const row of matrix) {
        for (const cell of row) {
          tiles.push(new Tile(cell, index));
          index++;
        }
      }
      return tiles;
    }

    return {
      maps,
      Map,
    };
  });
