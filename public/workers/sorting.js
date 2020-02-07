/* eslint-disable no-new-func */
/* eslint-disable no-restricted-globals */
/// <reference path="../types/common.d.ts"/>
// @ts-ignore
var isSorted = function (list) {
    for (var i = 0; i < list.length - 1; ++i) {
        if (list[i] > list[i + 1])
            return false;
    }
    return true;
};
self.addEventListener("message", function (e) {
    var _a = e.data, funcBody = _a.funcBody, list = _a.list;
    var algorithm = new Function("list", "compare", "swap", funcBody);
    var actions = [];
    var compare = function (index1, index2) {
        actions.push(["Compare", index1, index2]);
        return list[index1] - list[index2];
    };
    var swap = function (index1, index2) {
        actions.push(["Swap", index1, index2]);
        var temp = list[index1];
        list[index1] = list[index2];
        list[index2] = temp;
    };
    var startTime = Date.now();
    algorithm(list, compare, swap);
    var succeed = isSorted(list);
    var duration = Date.now() - startTime;
    var response = { actions: actions, duration: duration, succeed: succeed };
    // @ts-ignore
    self.postMessage(response);
});
