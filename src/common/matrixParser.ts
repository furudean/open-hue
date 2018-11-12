import { Matrix } from '@/types/matrix';

export function parse(map: string): Matrix {
  return map.split(/\n/)
    .filter((element) => element.length > 0)
    .map((row) => {
      return row.trim()
        .split('')
        .reduce(expand, '')
        .split('')
        .map(finalize);
    });
}

const expand = (acc: string, curr: string) => {
  const quantifier = Number(acc[acc.length - 1]);

  if (isNaN(quantifier)) {
    return acc + curr;
  }

  return acc.slice(0, -1) + curr.repeat(quantifier);
};

const finalize = (element: string) => ({
  isLocked: element === 'x'
});
