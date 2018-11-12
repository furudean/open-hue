import { Color } from "./color";

export type Tile = {
  color: Color;
  index: number;
  isLocked: boolean;
}