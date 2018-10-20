angular.module('game')
  .factory('gradientService', ($log) => {
    const lerp = (start, end, t) => start * (1 - t) + end * t;

    function lerpAngle(start, end, t) {
      start = start % 360
      end = end % 360
      if (end - start > 180) {
        end -= 360
      } else if (end - start < -180) {
        end += 360
      }
      return start + (end - start) * t
    }

    function biLerp(x0y0, x1y0, x0y1, x1y1, dx, dy) {
      const top = chroma.scale([x0y0, x1y0])(dx);
      const bottom = chroma.scale([x0y1, x1y1])(dx);
      return chroma.scale([top, bottom])(dy);
    }

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

      const [tl, tr, bl, br] = Object.values(corners);

      function interpolate(cell, x, y) {
        const dx = x/(width - 1);
        const dy = y/(height - 1);

        $log.debug({x, y, dx, dy});
        // const l = biLerp(lerp)(tl[0], tr[0], bl[0], br[0], dx, dy);
        // const c = biLerp(lerp)(tl[1], tr[1], bl[1], br[1], dx, dy);
        // const h = biLerp(lerpAngle)(tl[2], tr[2], bl[2], br[2], dx, dy);

        // const combined = chroma(l, c, h, 'lch').toString();
        const combined = biLerp(tl, tr, bl, br, dx, dy);

        cell.color = combined;
      }

      matrixEach(matrix, interpolate);

      return matrix;
    }

    return {
      gradientize,
    };
  });
