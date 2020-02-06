import { useRef, useCallback, useState, Key, useEffect } from "react";
import { NumberListObject } from "components/NumberList/utils";

export const useSortingBoard = ({
  data,
  dataKey,
  algorithm
}: {
  data: number[];
  dataKey: Key;
  algorithm: SortingAlgorithm;
}) => {
  const [running, setRunning] = useState(false);
  const ref = useRef<NumberListObject>(null);
  const dataKeyRef = useRef<Key>(dataKey);

  const solve = useCallback(async () => {
    const currentDataKey = dataKeyRef.current;
    const list = [...data];
    const actions: Action[] = [];
    const compare: CompareFunction = (index1, index2) => {
      actions.push({ func: ref.current!.compare, index1, index2 });
      return list[index1] - list[index2];
    };
    const swap: SwapFunction = (index1, index2) => {
      actions.push({ func: ref.current!.swap, index1, index2 });
      const temp = list[index1];
      list[index1] = list[index2];
      list[index2] = temp;
    };

    setRunning(true);
    algorithm(list, compare, swap);

    for (const { func, index1, index2 } of actions) {
      if (currentDataKey === dataKeyRef.current) {
        await func(index1, index2);
        console.log(`Call ${func.name}`);
      }
    }

    setRunning(false);
  }, [data, algorithm]);

  useEffect(() => {
    dataKeyRef.current = dataKey;
    setRunning(false);
  }, [dataKey]);

  return { ref, running, solve };
};

export interface Action {
  func: AsyncBinaryOperation;
  index1: number;
  index2: number;
}
