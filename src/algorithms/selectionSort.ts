/**
 * References:
 * https://en.wikipedia.org/wiki/Selection_sort
 * https://www.geeksforgeeks.org/selection-sort/
 */

const selectionSort: SortingAlgorithm = (list, compare, swap) => {
  for (let i = 0; i < list.length - 1; ++i) {
    let minIndex = i;

    for (let j = i + 1; j < list.length; ++j) {
      if (compare(j, minIndex) < 0) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      swap(i, minIndex);
    }
  }
};

export default selectionSort;
