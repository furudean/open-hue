angular.module('game')
  .factory('map', () => {
    const maps = [
      [
        [{color: 'red'}, {color: 'blue'}],
        [{color: 'green'}, {color: 'orange'}],
        [{color: 'purple'}, {color: 'pink'}],
      ],
    ];

    const getLevel = (numLevel) => {
      const matrix = maps[numLevel];

      return {
        matrix,
        rows: matrix.length,
        cols: matrix[0].length,
      };
    };

    return {
      getLevel,
    };
  });
