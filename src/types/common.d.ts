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

type SortingStatus =
  | "Pending"
  | "Sorting"
  | "Visualizing"
  | "Complete"
  | "Failed";

interface SortingRequest {
  funcBody: string;
  list: number[];
}

type SortingOperation = "Compare" | "Swap";

type SortingActionTuple = [SortingOperation, number, number];

interface SortingResponse {
  actions: SortingActionTuple[];
  duration: number;
  succeed: boolean;
}
