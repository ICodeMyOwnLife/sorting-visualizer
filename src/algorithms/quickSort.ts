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
        ++pivotIndex;
      }
    }
    swap(pivotIndex, endIndex);
    return pivotIndex;
  };

  const quickSort = (startIndex: number, endIndex: number) => {
    if (startIndex < endIndex) {
      const pivotIndex = partition(startIndex, endIndex);
      quickSort(startIndex, pivotIndex - 1);
      quickSort(pivotIndex + 1, endIndex);
    }
  };

  quickSort(0, list.length - 1);
};

export default quickSort;
