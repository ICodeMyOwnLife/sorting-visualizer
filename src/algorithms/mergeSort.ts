/**
 * References:
 * https://www.geeksforgeeks.org/merge-sort/
 * https://en.wikipedia.org/wiki/Merge_sort
 */

const mergeSort: SortingAlgorithm = (list, _compare, _swap, assign) => {
  const merge = (startIndex: number, middleIndex: number, endIndex: number) => {
    const leftArray = list.slice(startIndex, middleIndex + 1);
    const rightArray = list.slice(middleIndex + 1, endIndex + 1);
    let leftIndex = 0;
    let rightIndex = 0;
    let index = startIndex;

    for (
      ;
      leftIndex < leftArray.length && rightIndex < rightArray.length;
      ++index
    ) {
      if (leftArray[leftIndex] < rightArray[rightIndex]) {
        assign(index, leftArray[leftIndex]);
        leftIndex += 1;
      } else {
        assign(index, rightArray[rightIndex]);
        rightIndex += 1;
      }
    }

    for (; leftIndex < leftArray.length; leftIndex += 1, index += 1) {
      assign(index, leftArray[leftIndex]);
    }

    for (; rightIndex < rightArray.length; rightIndex += 1, index += 1) {
      assign(index, rightArray[rightIndex]);
    }
  };

  const runMergeSort = (startIndex: number, endIndex: number) => {
    if (startIndex < endIndex) {
      const middleIndex = Math.trunc((startIndex + endIndex) / 2);
      runMergeSort(startIndex, middleIndex);
      runMergeSort(middleIndex + 1, endIndex);
      merge(startIndex, middleIndex, endIndex);
    }
  };

  runMergeSort(0, list.length - 1);
};

export default mergeSort;
