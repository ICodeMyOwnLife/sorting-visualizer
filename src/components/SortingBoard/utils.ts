/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { useRef, useCallback, useState, RefObject, useEffect } from 'react';
import { NumberListObject } from 'components/NumberList/utils';
import { useWorkerCallback } from 'cb-hooks';

const visualize = async (
  ref: RefObject<NumberListObject>,
  actions: SortingActionTuple[],
) => {
  const startTime = Date.now();

  for (const [operation, operand1, operand2] of actions) {
    switch (operation) {
      case 'Assign':
        await ref.current?.assign(operand1, operand2);
        break;

      case 'Compare':
        await ref.current?.compare(operand1, operand2);
        break;

      case 'Swap':
        await ref.current?.swap(operand1, operand2);
        break;

      default:
        break;
    }
  }

  return Date.now() - startTime;
};

export const useSortingBoard = ({
  data,
  algorithm,
}: {
  data: number[];
  algorithm: string;
}) => {
  const [visualizationDuration, setVisualizationDuration] = useState<number>();
  const ref = useRef<NumberListObject>(null);
  const [{ loading, result }, sort] = useWorkerCallback<
    SortingRequest,
    SortingResponse
  >('/workers/sorting.js');
  const solve = useCallback(() => sort({ func: algorithm, list: data }), [
    algorithm,
    data,
    sort,
  ]);

  useEffect(() => {
    const run = async () => {
      if (result) {
        const { actions, succeed } = result;
        if (succeed) {
          setVisualizationDuration(await visualize(ref, actions));
        }
      }
    };
    run();
  }, [result]);

  return { loading, ref, result, solve, visualizationDuration };
};
