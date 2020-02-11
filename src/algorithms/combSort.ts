/**
 * References:
 * https://www.geeksforgeeks.org/comb-sort/
 * https://en.wikipedia.org/wiki/Comb_sort
 */

const combSort: SortingAlgorithm = (list, compare, swap) => {
  const getNextGap = (gap: number) => {
    const nextGap = Math.trunc(gap / 1.3);
    return nextGap > 1 ? nextGap : 1;
  };

  let gap = list.length;
  let swapped = false;

  while (gap > 1 || swapped) {
    gap = getNextGap(gap);
    swapped = false;

    for (let i = 0; i < list.length - gap; ++i) {
      if (compare(i, i + gap) > 0) {
        swap(i, i + gap);
        swapped = true;
      }
    }
  }
};

export default combSort;
