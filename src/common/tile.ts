import { Color } from '@/types/color';

export class Tile {
  public color: Color;
  public index: number;
  public isLocked: boolean;

  constructor(color: Color, isLocked: boolean, index: number) {
    this.color = color;
    this.index = index;
    this.isLocked = isLocked;
  }
}
