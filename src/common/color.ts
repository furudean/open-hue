import chroma from 'chroma-js';
import { Colorspace, Color } from '@/types/color'

export function biLerpColor(x0y0: Color, x1y0: Color, x0y1: Color, x1y1: Color, colorspace: Colorspace) {
  const scale = (c0: Color, c1: Color) => chroma.scale([c0, c1])
    .mode(colorspace);

  const top = scale(x0y0, x1y0);
  const bottom = scale(x0y1, x1y1);

  return (dx: number, dy: number) => scale(top(dx), bottom(dx))(dy);
}

export function getAverageColor(x0y0: Color, x1y0: Color, x0y1: Color, x1y1: Color, colorspace: Colorspace) {
  return biLerpColor(x0y0, x1y0, x0y1, x1y1, colorspace)(0.5, 0.5);
}
