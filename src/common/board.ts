import * as gradient from './gradient';
import * as matrixParser from './matrixParser';
import { Tile } from "@/types/tile";
import { Template } from '@/types/template';

export class Board {
  tiles: Tile[];
  width: number;
  height: number;
  constructor(template: Template) {
    const {topLeft, topRight, bottomLeft, bottomRight} = template.corners;
    const matrix = matrixParser.parse(template.map);
    const coloredMatrix = gradient.gradientize(matrix, topLeft, topRight, bottomLeft, bottomRight);
    const tiles = coloredMatrix.flat()
      .map(({color, isLocked}, index) => ({color, isLocked, index})) as Tile[];

    this.tiles = tiles;
    this.width = matrix[0].length;
    this.height = matrix.length;
  }
}
