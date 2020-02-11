/**
 * References:
 * https://www.geeksforgeeks.org/merge-sort/
 * https://en.wikipedia.org/wiki/Merge_sort
 */

const mergeSort: SortingAlgorithm = (list, _compare, _swap, assign) => {
  const merge = (startIndex: number, middleIndex: number, endIndex: number) => {
    const leftArray = list.slice(startIndex, middleIndex + 1);
    const rightArray = list.slice(middleIndex + 1, endIndex + 1);
    let leftIndex = 0,
      rightIndex = 0,
      index = startIndex;

    for (
      ;
      leftIndex < leftArray.length && rightIndex < rightArray.length;
      ++index
    ) {
      if (leftArray[leftIndex] < rightArray[rightIndex]) {
        assign(index, leftArray[leftIndex]);
        ++leftIndex;
      } else {
        assign(index, rightArray[rightIndex]);
        ++rightIndex;
      }
    }

    for (; leftIndex < leftArray.length; ++leftIndex, ++index) {
      assign(index, leftArray[leftIndex]);
    }

    for (; rightIndex < rightArray.length; ++rightIndex, ++index) {
      assign(index, rightArray[rightIndex]);
    }
  };

  const mergeSort = (startIndex: number, endIndex: number) => {
    if (startIndex < endIndex) {
      const middleIndex = Math.trunc((startIndex + endIndex) / 2);
      mergeSort(startIndex, middleIndex);
      mergeSort(middleIndex + 1, endIndex);
      merge(startIndex, middleIndex, endIndex);
    }
  };

  mergeSort(0, list.length - 1);
};

export default mergeSort;
