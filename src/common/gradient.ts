import { biLerpColor } from './color';
import { Color } from '@/types/color';

interface PartialTile {
  color: Color;
  index: number;
  isLocked: boolean;
}

type Matrix = PartialTile[][];

function matrixEach(matrix: Matrix, fn: (v: PartialTile, x: number, y: number) => void, y: number = 0): void {
  if (y < matrix.length) {
    matrix[y].forEach((v, x) => fn(v, x, y));
    matrixEach(matrix, fn, y + 1);
  }
}

export function gradientize(
  matrix: Matrix,
  topLeft: Color, topRight: Color,
  bottomLeft: Color, bottomRight: Color): Matrix {
  const width = matrix[0].length;
  const height = matrix.length;

  const interpolate = biLerpColor(
    topLeft, topRight,
    bottomLeft, bottomRight,
    'lab',
  );

  matrixEach(matrix, (tile, x, y) => {
    tile.color = interpolate(x / (width - 1), y / (height - 1));
  });

  return matrix;
}
