type BinaryOperation<TResult> = (a: number, b: number) => TResult;

type AsyncBinaryOperation = BinaryOperation<Promise<void>>;

type CompareFunction = BinaryOperation<number>;

type SwapFunction = BinaryOperation<void>;

type SortingAlgorithm = (
  list: readonly number[],
  compare: CompareFunction,
  swap: SwapFunction
) => void;

interface AlgorithmInfo {
  name: string;
  algorithm: SortingAlgorithm;
}
