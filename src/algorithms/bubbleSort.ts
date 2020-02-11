/**
 * References:
 * https://en.wikipedia.org/wiki/Bubble_sort
 * https://www.geeksforgeeks.org/bubble-sort/
 */

const bubbleSort: SortingAlgorithm = (list, compare, swap) => {
  let lastIndex = list.length;

  do {
    let swapIndex = 0;
    for (let i = 1; i < lastIndex; ++i) {
      if (compare(i - 1, i) > 0) {
        swap(i - 1, i);
        swapIndex = i;
      }
    }
    lastIndex = swapIndex;
  } while (lastIndex > 1);
};

export default bubbleSort;
