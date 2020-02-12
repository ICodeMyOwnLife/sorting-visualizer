/**
 * References:
 * https://en.wikipedia.org/wiki/Quicksort
 * https://www.geeksforgeeks.org/quick-sort/
 */

const quickSort: SortingAlgorithm = (list, compare, swap) => {
  const partition = (startIndex: number, endIndex: number) => {
    let pivotIndex = startIndex;
    for (let i = startIndex; i < endIndex; ++i) {
      if (compare(i, endIndex) < 0) {
        swap(i, pivotIndex);
        pivotIndex += 1;
      }
    }
    swap(pivotIndex, endIndex);
    return pivotIndex;
  };

  const runQuickSort = (startIndex: number, endIndex: number) => {
    if (startIndex < endIndex) {
      const pivotIndex = partition(startIndex, endIndex);
      runQuickSort(startIndex, pivotIndex - 1);
      runQuickSort(pivotIndex + 1, endIndex);
    }
  };

  runQuickSort(0, list.length - 1);
};

export default quickSort;
