angular.module('game')
  .factory('gradientService', ($log) => {
    const hexToRgb = (hex) =>
      hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m, r, g, b) => '#' + r + r + g + g + b + b)
      .substring(1)
      .match(/.{2}/g)
      .map((x) => parseInt(x, 16));

    const rgbToHex = (r, g, b) => '#' + [r, g, b]
      .map((x) => Math.round(x)
        .toString(16)
        .padStart(2, '0'))
        .join('');

    function matrixEach(matrix, fn, y = 0) {
      if (y < matrix.length) {
        matrix[y].forEach((v, x) => fn(v, x, y));
        matrixEach(matrix, fn, y + 1);
      }
    }

    const toCompositeColors = (corners) => Object.values(corners)
      .map(hexToRgb);

    const lerp = (start, end, t) => start * (1 - t) + end * t;

    const biLerp = (x0y0, x1y0, x0y1, x1y1, dx, dy) => lerp(lerp(x0y0, x1y0, dx), lerp(x0y1, x1y1, dx), dy);

    function gradientize(matrix, corners) {
      const width = matrix[0].length;
      const height = matrix.length;

      const [tl, tr, bl, br] = toCompositeColors(corners);

      function interpolate(v, x, y) {
        const dx = x/width;
        const dy = y/height;

        const r = biLerp(tl[0], tr[0], bl[0], br[0], dx, dy);
        const g = biLerp(tl[1], tr[1], bl[1], br[1], dx, dy);
        const b = biLerp(tl[2], tr[2], bl[2], br[2], dx, dy);

        const combined = rgbToHex(r, g, b);

        v.color = combined;
      }


      matrixEach(matrix, interpolate);
      return matrix;
    }

    return {
      gradientize,
    };
  });
