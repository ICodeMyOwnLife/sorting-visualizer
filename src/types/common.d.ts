type BinaryOperation<TResult> = (a: number, b: number) => TResult;

type AsyncBinaryOperation = BinaryOperation<Promise<void>>;

type CompareFunction = BinaryOperation<number>;

type SwapFunction = BinaryOperation<void>;

type AssignFunction = (index: number, value: number) => void;

type SortingAlgorithm = (
  list: readonly number[],
  compare: CompareFunction,
  swap: SwapFunction,
  assign: AssignFunction
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
  func: string;
  list: number[];
}

type SortingOperation = "Compare" | "Swap" | "Assign";

type SortingActionTuple = [SortingOperation, number, number];

interface SortingResponse {
  actions: SortingActionTuple[];
  duration: number;
  succeed: boolean;
}

type OmitFrom<TObject, TKey extends keyof TObject> = Omit<TObject, TKey>;
