import React, { FC, memo } from 'react';
import Spin from 'ui/Spin';
import Button from 'ui/Button';
import NumberList from 'components/NumberList';
import { useSortingBoard } from './utils';
import classes from './styles.module.scss';

export const SortingBoardComponent: FC<BoardProps> = ({ data, algorithm }) => {
  const {
    ref,
    solve,
    sortDuration,
    status,
    visualizationDuration,
  } = useSortingBoard({ data, algorithm });

  return (
    <div className={classes.sortingBoard}>
      <Spin loading={status === 'Sorting'}>
        <NumberList
          className={classes.numberList}
          initialData={data}
          ref={ref}
        />
      </Spin>
      <Spin loading={status !== 'Pending'} size={16}>
        <Button
          className={classes.solveButton}
          disabled={status !== 'Pending'}
          onClick={solve}
        >
          Solve
        </Button>
      </Spin>
      <p className={classes.results}>
        {status === 'Failed' && <span>FAILED</span>}
        {sortDuration !== undefined && (
          <span>Sort Duration: {sortDuration}</span>
        )}
        {visualizationDuration !== undefined && (
          <span>Visualization Duration: {visualizationDuration}</span>
        )}
      </p>
    </div>
  );
};

const SortingBoard = memo(SortingBoardComponent);
SortingBoard.displayName = 'SortingBoard';
export default SortingBoard;

export interface BoardProps {
  data: number[];
  algorithm: string;
}
