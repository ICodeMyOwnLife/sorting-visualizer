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
      assign: async (index, value) => {
        setList(prevList =>
          prevList.map((item, idx) =>
            idx === index ? { key: Date.now(), value } : item
          )
        );
        console.log("assigned");
        await refs[index].current?.markChanged();
      },
      compare: async (index1, index2) => {
        await Promise.all([
          refs[index1].current?.markInspected(),
          refs[index2].current?.markInspected()
        ]);
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
        await Promise.all([
          refs[index1].current?.markChanged(),
          refs[index2].current?.markChanged()
        ]);
      }
    }),

    [refs]
  );

  return { list, max, min, refs };
};

export interface NumberListObject {
  assign: (index: number, value: number) => Promise<void>;
  compare: AsyncBinaryOperation;
  swap: AsyncBinaryOperation;
}

export interface Item {
  key: Key;
  value: number;
}
