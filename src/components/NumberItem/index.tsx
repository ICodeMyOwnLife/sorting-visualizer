import React, { forwardRef, HTMLAttributes } from 'react';
import clsx from 'clsx';
import { useNumberItemRef, NumberItemObject } from './utils';
import classes from './styles.module.scss';

const NumberItem = forwardRef<NumberItemObject, NumberItemProps>(
  ({ className, max, min, value }, ref) => {
    const { changed, inspected } = useNumberItemRef({ ref });
    const heightPercent = (100 * (value - min + 1)) / (max - min + 1);

    return (
      <div
        className={clsx(classes.numberItem, className, {
          [classes.changed]: changed,
          [classes.inspected]: inspected,
        })}
        style={{ height: `${heightPercent}%` }}
        title={String(value)}
      />
    );
  },
);

NumberItem.displayName = 'NumberItem';

export default NumberItem;

export interface NumberItemProps extends HTMLAttributes<HTMLDivElement> {
  max: number;
  min: number;
  value: number;
}
