import { Color } from 'chroma-js';

declare type Template = {
  name: string,
  map: string
  corners: {
    topLeft: Color,
    topRight: Color,
    bottomLeft: Color,
    bottomRight: Color,
  },
};