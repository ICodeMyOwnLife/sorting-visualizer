/**
 * References:
 * https://www.geeksforgeeks.org/binary-heap/
 * https://www.geeksforgeeks.org/building-heap-from-array/
 * https://www.geeksforgeeks.org/heap-sort/
 */

const heapSort: SortingAlgorithm = (list, compare, swap) => {
  const maxHeapify = (index: number, length: number) => {
    let largestIndex = index;
    const leftIndex = index * 2 + 1;
    const rightIndex = index * 2 + 2;

    if (leftIndex < length && compare(leftIndex, largestIndex) > 0) {
      largestIndex = leftIndex;
    }

    if (rightIndex < length && compare(rightIndex, largestIndex) > 0) {
      largestIndex = rightIndex;
    }

    if (largestIndex !== index) {
      swap(largestIndex, index);
      maxHeapify(largestIndex, length);
    }
  };

  const startIndex = Math.trunc(list.length / 2) - 1;
  for (let i = startIndex; i >= 0; --i) {
    maxHeapify(i, list.length);
  }

  for (let i = list.length - 1; i >= 0; --i) {
    swap(i, 0);
    maxHeapify(0, i);
  }
};

export default heapSort;
