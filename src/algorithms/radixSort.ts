/**
 * References:
 * https://en.wikipedia.org/wiki/Radix_sort
 * https://www.geeksforgeeks.org/radix-sort/
 * https://www.geeksforgeeks.org/counting-sort/
 * https://en.wikipedia.org/wiki/Counting_sort
 */

const radixSort: SortingAlgorithm = (list, _compare, _swap, assign) => {
  const countingSort = (getKey: (value: number) => number) => {
    const counts = Array.from({ length: 10 }, () => 0);
    const output: number[] = [];

    list.forEach(item => {
      counts[getKey(item)] += 1;
    });

    for (let i = 1; i < counts.length; ++i) {
      counts[i] += counts[i - 1];
    }

    for (let i = list.length - 1; i >= 0; --i) {
      const value = list[i];
      const key = getKey(value);
      output[counts[key] - 1] = list[i];
      counts[key] -= 1;
    }

    return output;
  };

  const max = Math.max(...list);

  for (let exp = 1; max > exp; exp *= 10) {
    const getKey = (value: number) => Math.trunc(value / exp) % 10;
    const output = countingSort(getKey);
    for (let i = 0; i < list.length; ++i) {
      assign(i, output[i]);
    }
  }
};

export default radixSort;
