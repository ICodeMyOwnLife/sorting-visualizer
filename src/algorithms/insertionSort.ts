/**
 * References:
 * https://en.wikipedia.org/wiki/Insertion_sort
 * https://www.geeksforgeeks.org/insertion-sort/
 */

const insertionSort: SortingAlgorithm = (list, compare, swap) => {
  for (let i = 1; i < list.length; ++i) {
    for (let j = i; j > 0 && compare(j, j - 1) < 0; --j) {
      swap(j, j - 1);
    }
  }
};

export default insertionSort;
