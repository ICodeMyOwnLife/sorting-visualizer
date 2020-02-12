/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { useRef, useCallback, useState } from 'react';
import { NumberListObject } from 'components/NumberList/utils';
import useWorkerCallback from 'hooks/useWorkerCallback';

export const useSortingBoard = ({
  data,
  algorithm,
}: {
  data: number[];
  algorithm: string;
}) => {
  const [status, setStatus] = useState<SortingStatus>('Pending');
  const [sortDuration, setSortDuration] = useState<number>();
  const [visualizationDuration, setVisualizationDuration] = useState<number>();
  const ref = useRef<NumberListObject>(null);
  const sort = useWorkerCallback<SortingRequest, SortingResponse>(
    '/workers/sorting.js',
  );

  const solve = useCallback(async () => {
    setStatus('Sorting');
    setSortDuration(undefined);
    setVisualizationDuration(undefined);
    const { actions, duration, succeed } = await sort({
      list: data,
      func: algorithm,
    });
    setStatus('Visualizing');
    setSortDuration(duration);

    if (!succeed) {
      setStatus('Failed');
      return;
    }

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

    setVisualizationDuration(Date.now() - startTime);
    setStatus('Complete');
  }, [algorithm, data, sort]);

  return { ref, solve, sortDuration, status, visualizationDuration };
};
