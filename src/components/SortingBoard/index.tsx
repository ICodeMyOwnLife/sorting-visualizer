import React, { FC, memo, Key } from "react";
import NumberList from "components/NumberList";
import { useSortingBoard } from "./utils";
import classes from "./styles.module.scss";

export const SortingBoardComponent: FC<BoardProps> = ({
  data,
  dataKey,
  algorithm
}) => {
  const { ref, running, solve } = useSortingBoard({ data, dataKey, algorithm });

  return (
    <div className={classes.sortingBoard}>
      <NumberList
        className={classes.numberList}
        initialData={data}
        key={dataKey}
        ref={ref}
      />
      <button
        className={classes.solveButton}
        disabled={running}
        onClick={solve}
      >
        Solve
      </button>
    </div>
  );
};

const SortingBoard = memo(SortingBoardComponent);
SortingBoard.displayName = "SortingBoard";
export default SortingBoard;

export interface BoardProps {
  data: number[];
  dataKey: Key;
  algorithm: SortingAlgorithm;
}
