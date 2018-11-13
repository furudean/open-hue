export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Swaps the indices of `i` and `j` */
export function swapIndex(array: any[], i: number, j: number) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
