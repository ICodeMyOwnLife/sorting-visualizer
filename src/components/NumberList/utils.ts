import {
  Ref,
  useImperativeHandle,
  createRef,
  useMemo,
  useState,
  useEffect,
  Key
} from "react";
import { NumberItemObject } from "components/NumberItem/utils";
import { delay } from "utils/common";
import { ANIMATION_TIMEOUT } from "constants/common";

export const useNumberList = ({
  initialData,
  ref
}: {
  initialData: number[];
  ref: Ref<NumberListObject>;
}) => {
  const [list, setList] = useState<Item[]>([]);
  const max = useMemo(() => Math.max(...initialData), [initialData]);
  const min = useMemo(() => Math.min(...initialData), [initialData]);
  const refs = useMemo(
    () =>
      Array.from({ length: initialData.length }, () =>
        createRef<NumberItemObject>()
      ),
    [initialData]
  );

  useEffect(() => {
    setList(initialData.map((value, index) => ({ key: index, value })));
  }, [initialData]);

  useImperativeHandle(
    ref,
    () => ({
      compare: async (index1, index2) => {
        refs[index1].current?.compare();
        refs[index2].current?.compare();
        await delay(ANIMATION_TIMEOUT);
      },
      swap: async (index1, index2) => {
        setList(prevList =>
          prevList.map((item, index) =>
            index === index1
              ? prevList[index2]
              : index === index2
              ? prevList[index1]
              : item
          )
        );
        refs[index1].current?.move();
        refs[index2].current?.move();
        await delay(ANIMATION_TIMEOUT);
      }
    }),

    [refs]
  );

  return { list, max, min, refs };
};

export interface NumberListObject {
  compare: AsyncBinaryOperation;
  swap: AsyncBinaryOperation;
}

export interface Item {
  key: Key;
  value: number;
}
