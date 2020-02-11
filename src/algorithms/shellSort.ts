/**
 * References:
 * https://www.geeksforgeeks.org/shellsort/
 * https://en.wikipedia.org/wiki/Shellsort
 */

const shellSort: SortingAlgorithm = (list, compare, swap) => {
  for (
    let gap = Math.trunc(list.length / 2);
    gap > 0;
    gap = Math.trunc(gap / 2)
  ) {
    for (let i = gap; i < list.length; ++i) {
      for (let j = i; j >= gap && compare(j, j - gap) < 0; j -= gap) {
        swap(j, j - gap);
      }
    }
  }
};

export default shellSort;
