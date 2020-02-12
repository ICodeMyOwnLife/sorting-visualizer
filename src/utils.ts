import { useState, ChangeEvent, useCallback, Key } from 'react';
import insertionSort from 'algorithms/insertionSort';
import selectionSort from 'algorithms/selectionSort';
import bubbleSort from 'algorithms/bubbleSort';
import mergeSort from 'algorithms/mergeSort';
import heapSort from 'algorithms/heapSort';
import quickSort from 'algorithms/quickSort';
import shellSort from 'algorithms/shellSort';
import radixSort from 'algorithms/radixSort';
import combSort from 'algorithms/combSort';

export const algorithms: AlgorithmInfo[] = [
  {
    name: 'Insertion Sort',
    algorithm: insertionSort,
  },
  {
    name: 'Selection Sort',
    algorithm: selectionSort,
  },
  {
    name: 'Bubble Sort',
    algorithm: bubbleSort,
  },
  {
    name: 'Merge Sort',
    algorithm: mergeSort,
  },
  {
    name: 'Heap Sort',
    algorithm: heapSort,
  },
  {
    name: 'Quick Sort',
    algorithm: quickSort,
  },
  {
    name: 'Shell Sort',
    algorithm: shellSort,
  },
  {
    name: 'Radix Sort',
    algorithm: radixSort,
  },
  {
    name: 'Comb Sort',
    algorithm: combSort,
  },
];

export const useAlgorithm = () => {
  const [algorithmIndex, setAlgorithmIndex] = useState(0);
  const [algorithm, setAlgorithm] = useState(
    algorithms[algorithmIndex].algorithm.toString(),
  );

  const handleChangeAlgorithmIndex = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const index = Number(e.target.value);
      setAlgorithmIndex(index);
      setAlgorithm(algorithms[index].algorithm.toString());
    },
    [],
  );

  return {
    algorithm,
    algorithmIndex,
    handleChangeAlgorithmIndex,
    handleChangeAlgorithm: setAlgorithm,
  };
};

export const useDataInput = () => {
  const [data, setData] = useState<number[]>([]);
  const [dataKey, setDataKey] = useState<Key>(Date.now);
  const [dataText, setDataText] = useState('');
  const [length, setLength] = useState(100);

  const generateFromText = useCallback(() => {
    const newData = dataText.split(/\s*,\s*/).map(Number);
    setData(newData);
    setDataKey(Date.now());
    setLength(newData.length);
  }, [dataText]);

  const generateRandom = useCallback(() => {
    const newData = Array.from(
      { length },
      () => Math.round(Math.random() * 1000) + 1,
    );
    setData(newData);
    setDataKey(Date.now());
    setDataText(newData.join(', '));
  }, [length]);

  const handleChangeDataText = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setDataText(e.target.value);
    },
    [],
  );

  const handleChangeLength = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setLength(Number(e.target.value));
  }, []);

  return {
    data,
    dataKey,
    dataText,
    generateFromText,
    generateRandom,
    handleChangeDataText,
    handleChangeLength,
    length,
  };
};
