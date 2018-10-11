angular.module('game')
  .factory('boardService', () => {
    function deseralize(map) {
      const {tiles, height, width} = map;
      const style = {
        'grid-template-rows': `repeat(${height}, 1fr)`,
        'grid-template-columns': `repeat(${width}, 1fr)`,
      };

      return {
        tiles,
        style,
      };
    }
    return {
      deseralize,
    };
  });
