import { biLerpColor } from './color';
import { Color } from '@/types/color';
import { Matrix } from '@/types/matrix';
import { Tile } from '@/types/tile';

function matrixEach(matrix: Matrix, fn: Function, y: number = 0) {
  if (y < matrix.length) {
    matrix[y].forEach((v, x) => fn(v, x, y));
    matrixEach(matrix, fn, y + 1);
  }
}

export function gradientize(matrix: Matrix, topLeft: Color, topRight: Color, bottomLeft: Color, bottomRight: Color) {
  const width = matrix[0].length;
  const height = matrix.length;

  const interpolate = biLerpColor(
    topLeft, topRight,
    bottomLeft, bottomRight,
    'lab'
  );

  matrixEach(matrix, (tile: Partial<Tile>, x: number, y: number) => {
    tile.color = interpolate(x/(width - 1), y/(height - 1));
  });

  return matrix;
}