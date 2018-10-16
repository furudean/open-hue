angular.module('game')
  .factory('matrixParserService', ($log) => {
    const toObject = (element) => ({
      locked: element === 'x',
    });

    function parse(matrix) {
      const mapped = matrix.split(/\n/)
        .map((element) => element.trim()
          .split('')
          .map(toObject))
        .filter((element) => element.length > 0);

      $log.info(mapped);

      return mapped;
    }

    return {
      parse,
    };
  });
