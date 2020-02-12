import React, { forwardRef } from 'react';
import clsx from 'clsx';
import NumberItem from 'components/NumberItem';
import { NumberListObject, useNumberList } from './utils';
import classes from './styles.module.scss';

const NumberList = forwardRef<NumberListObject, NumberListProps>(
  ({ className, initialData }, ref) => {
    const { list, max, min, refs } = useNumberList({ initialData, ref });

    return (
      <div className={clsx(classes.numberList, className)}>
        {list.map(({ key, value }, index) => (
          <NumberItem
            key={key}
            max={max}
            min={min}
            ref={refs[index]}
            value={value}
          />
        ))}
      </div>
    );
  },
);

NumberList.displayName = 'NumberList';

export default NumberList;

export interface NumberListProps {
  className?: string;
  initialData: number[];
}
