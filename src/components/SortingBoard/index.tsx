import React, { FC, memo } from 'react';
import Spin from 'ui/Spin';
import Button from 'ui/Button';
import NumberList from 'components/NumberList';
import { useSortingBoard } from './utils';
import classes from './styles.module.scss';

export const SortingBoardComponent: FC<BoardProps> = ({ data, algorithm }) => {
  const {
    loading,
    ref,
    result,
    solve,
    visualizationDuration,
  } = useSortingBoard({ data, algorithm });

  return (
    <div className={classes.sortingBoard}>
      <Spin loading={loading}>
        <NumberList
          className={classes.numberList}
          initialData={data}
          ref={ref}
        />
      </Spin>
      <Spin loading={loading} size={16}>
        <Button className={classes.solveButton} onClick={solve}>
          Solve
        </Button>
      </Spin>
      <p className={classes.results}>
        {result?.succeed === false && <span>FAILED</span>}
        {result?.duration !== undefined && (
          <span>Sort Duration: {result.duration}</span>
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
