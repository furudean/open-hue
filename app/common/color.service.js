angular.module('app')
  .factory('colorService', ($log) => {
    function biLerpColor(x0y0, x1y0, x0y1, x1y1, colorspace = 'rgb') {
      const scale = (c0, c1) => chroma.scale([c0, c1])
        .mode(colorspace);

      const top = scale(x0y0, x1y0);
      const bottom = scale(x0y1, x1y1);

      return (dx, dy) => scale(top(dx), bottom(dx))(dy);
    }

    return {
      biLerpColor,
    };
  });
