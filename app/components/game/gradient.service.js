angular.module('app')
  .factory('gradientService', ($log, colorService) => {
    function matrixEach(matrix, fn, y = 0) {
      if (y < matrix.length) {
        matrix[y].forEach((v, x) => fn(v, x, y));
        matrixEach(matrix, fn, y + 1);
      }
    }

    function gradientize(matrix, corners) {
      const width = matrix[0].length;
      const height = matrix.length;
      const {topLeft, topRight, bottomLeft, bottomRight} = corners;
      const interpolate = colorService.biLerpColor(topLeft, topRight, bottomLeft, bottomRight, 'lab');

      matrixEach(matrix, (cell, x, y) => {
        cell.color = interpolate(x/(width - 1), y/(height - 1)).hex();
      });

      $log.debug({
        message: 'matrix with interpolated gradient',
        matrix,
      });

      return matrix;
    }

    return {
      gradientize,
    };
  });
