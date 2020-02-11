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
var getFuncBody = function (func) {
    var funcStr = func.toString();
    return funcStr.substring(funcStr.indexOf("{") + 1, funcStr.lastIndexOf("}"));
};
self.addEventListener("message", function (e) {
    var _a = e.data, func = _a.func, list = _a.list;
    var funcBody = getFuncBody(func);
    var algorithm = new Function("list", "compare", "swap", "assign", funcBody);
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
    var assign = function (index, value) {
        actions.push(["Assign", index, value]);
        list[index] = value;
    };
    var startTime = Date.now();
    algorithm(list, compare, swap, assign);
    var succeed = isSorted(list);
    var duration = Date.now() - startTime;
    var response = { actions: actions, duration: duration, succeed: succeed };
    // @ts-ignore
    self.postMessage(response);
});
