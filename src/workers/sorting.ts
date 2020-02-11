/* eslint-disable no-new-func */
/* eslint-disable no-restricted-globals */
/// <reference path="../types/common.d.ts"/>
// @ts-ignore
const isSorted = (list: number[]) => {
  for (let i = 0; i < list.length - 1; ++i) {
    if (list[i] > list[i + 1]) return false;
  }
  return true;
};

const getFuncBody = (func: Function | string) => {
  const funcStr = func.toString();
  return funcStr.substring(funcStr.indexOf("{") + 1, funcStr.lastIndexOf("}"));
};

self.addEventListener("message", e => {
  const { func, list } = e.data as SortingRequest;
  const funcBody = getFuncBody(func);
  const algorithm = new Function(
    "list",
    "compare",
    "swap",
    "assign",
    funcBody
  ) as SortingAlgorithm;
  const actions: SortingActionTuple[] = [];
  const compare: CompareFunction = (index1, index2) => {
    actions.push(["Compare", index1, index2]);
    return list[index1] - list[index2];
  };
  const swap: SwapFunction = (index1, index2) => {
    actions.push(["Swap", index1, index2]);
    const temp = list[index1];
    list[index1] = list[index2];
    list[index2] = temp;
  };
  const assign: AssignFunction = (index, value) => {
    actions.push(["Assign", index, value]);
    list[index] = value;
  };
  const startTime = Date.now();
  algorithm(list, compare, swap, assign);
  const succeed = isSorted(list);
  const duration = Date.now() - startTime;
  const response: SortingResponse = { actions, duration, succeed };
  // @ts-ignore
  self.postMessage(response);
});
