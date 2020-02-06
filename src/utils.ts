import { useState, ChangeEvent, useCallback, Key } from "react";

export const algorithms: AlgorithmInfo[] = [
  {
    name: "Insertion Sort",
    algorithm: (list, compare, swap) => {
      for (let i = 1; i < list.length; ++i) {
        for (let j = i; j > 0 && compare(j, j - 1) < 0; --j) {
          swap(j, j - 1);
        }
      }
    }
  },
  {
    name: "Selection Sort",
    algorithm: (list, compare, swap) => {
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
    }
  },
  {
    name: "Bubble Sort",
    algorithm: (list, compare, swap) => {
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
    }
  }
];

export const useAlgorithmSelect = () => {
  const [algorithmIndex, setAlgorithmIndex] = useState(0);
  const handleChangeAlgorithmIndex = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setAlgorithmIndex(Number(e.target.value));
    },
    []
  );
  return { algorithmIndex, handleChangeAlgorithmIndex };
};

export const useDataInput = () => {
  const [data, setData] = useState<number[]>([]);
  const [dataKey, setDataKey] = useState<Key>(Date.now);
  const [dataText, setDataText] = useState("");
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
      () => Math.round(Math.random() * 1000) + 1
    );
    setData(newData);
    setDataKey(Date.now());
    setDataText(newData.join(", "));
  }, [length]);

  const handleChangeDataText = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setDataText(e.target.value);
    },
    []
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
    length
  };
};
