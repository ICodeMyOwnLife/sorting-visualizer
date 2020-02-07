import { useRef, useCallback, useState } from "react";
import { NumberListObject } from "components/NumberList/utils";
import useWorkerCallback from "hooks/useWorkerCallback";
import { Operation } from "constants/operations";

const getFuncBody = (func: Function | string) => {
  const funcStr = func.toString();
  return funcStr.substring(funcStr.indexOf("{") + 1, funcStr.lastIndexOf("}"));
};

export const useSortingBoard = ({
  data,
  algorithm
}: {
  data: number[];
  algorithm: SortingAlgorithm;
}) => {
  const [status, setStatus] = useState<SortingStatus>("Pending");
  const [sortDuration, setSortDuration] = useState<number>();
  const [visualizationDuration, setVisualizationDuration] = useState<number>();
  const ref = useRef<NumberListObject>(null);
  const sort = useWorkerCallback<SortingRequest, SortingResponse>(
    "/workers/sorting.js"
  );

  const solve = useCallback(async () => {
    setStatus("Sorting");
    setSortDuration(undefined);
    setVisualizationDuration(undefined);
    const funcBody = getFuncBody(algorithm);
    const { actions, duration, succeed } = await sort({ list: data, funcBody });
    setStatus("Visualizing");
    setSortDuration(duration);

    if (!succeed) {
      return setStatus("Failed");
    }

    const startTime = Date.now();

    for (const [op, index1, index2] of actions) {
      switch (op) {
        case "Compare":
          await ref.current?.compare(index1, index2);
          break;

        case "Swap":
          await ref.current?.swap(index1, index2);
          break;

        default:
          break;
      }
    }

    setVisualizationDuration(Date.now() - startTime);
    setStatus("Complete");
  }, [algorithm, data, sort]);

  return { ref, solve, sortDuration, status, visualizationDuration };
};

export interface Action {
  op: Operation;
  index1: number;
  index2: number;
}
