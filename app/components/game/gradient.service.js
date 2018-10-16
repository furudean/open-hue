angular.module('game')
  .factory('gradientService', ($log) => {
    const lerp = (start, end, t) => start * (1 - t) + end * t;

    const biLerp = (x0y0, x1y0, x0y1, x1y1, dx, dy) => lerp(lerp(x0y0, x1y0, dx), lerp(x0y1, x1y1, dx), dy);

    const toCompositeColor = (corners) => Object.values(corners)
      .map((color) => chroma(color).lch());

    function matrixEach(matrix, fn, y = 0) {
      if (y < matrix.length) {
        matrix[y].forEach((v, x) => fn(v, x, y));
        matrixEach(matrix, fn, y + 1);
      }
    }

    function gradientize(matrix, corners) {
      const width = matrix[0].length;
      const height = matrix.length;

      const [tl, tr, bl, br] = toCompositeColor(corners);

      function interpolate(cell, x, y) {
        const dx = x/(width - 1);
        const dy = y/(height - 1);

        $log.debug({x, y, dx, dy});

        const l = biLerp(tl[0], tr[0], bl[0], br[0], dx, dy);
        const c = biLerp(tl[1], tr[1], bl[1], br[1], dx, dy);
        const h = biLerp(tl[2], tr[2], bl[2], br[2], dx, dy);

        const combined = chroma(l, c, h, 'lch').toString();

        cell.color = combined;
      }

      matrixEach(matrix, interpolate);

      return matrix;
    }

    return {
      gradientize,
    };
  });
