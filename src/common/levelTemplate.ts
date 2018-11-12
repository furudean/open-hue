import { Template } from '../types/template';
import chroma from 'chroma-js';

export const templates: Template[] = [
  {
    name: 'first steps',
    map:
      'xxx\n' +
      'xox\n'.repeat(8) +
      'xxx\n',
    corners: {
      topLeft: chroma('#86D3E6'),
      topRight: chroma('#86D3E6'),
      bottomLeft: chroma('#006E90'),
      bottomRight: chroma('#006E90'),
    },
  },
  {
    name: 'second steps',
    map:
      '6x\n' +
      'x4ox\n'.repeat(2) +
      '6x\n'.repeat(2) +
      'x4ox\n'.repeat(2) +
      '6x',
    corners: {
      topLeft: chroma('#5B9279'),
      topRight: chroma('#5AB1BB'),
      bottomLeft: chroma('#8FCB9B'),
      bottomRight: chroma('#9ee2ea'),
    },
  },
  {
    name: 'dudouo',
    map:
      '6x\n' +
      'x4ox\n'.repeat(4) +
      '6x\n',
    corners: {
      topLeft: chroma('#590050'),
      topRight: chroma('#B5D6B2'),
      bottomLeft: chroma('#B10D45'),
      bottomRight: chroma('#E05917'),
    },
  },
];
