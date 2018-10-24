angular.module('game')
  .factory('matrixParserService', ($log) => {
    const toObject = (element) => ({
      isLocked: element === 'x',
    });

    const expand = (acc, curr) => {
      const quantifier = Number(acc[acc.length - 1]);

      if (isNaN(quantifier)) {
        return acc + curr;
      }

      return acc.slice(0, -1) + curr.repeat(quantifier);
    };

    function parse(matrix) {
      const mapped = matrix.split(/\n/)
        .filter((element) => element.length > 0)
        .map((row) => {
          return row.trim()
            .split('')
            .reduce(expand, '')
            .split('')
            .map(toObject);
        });

      return mapped;
    }

    return {
      parse,
    };
  });
