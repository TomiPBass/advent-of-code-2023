"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var input_1 = require("./input");
// !Disclaimer: I know this is a mess, but it was 2 in the morning so don't judge
var intStrs = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
var intMap = [
    [intStrs[0], 1],
    [intStrs[1], 2],
    [intStrs[2], 3],
    [intStrs[3], 4],
    [intStrs[4], 5],
    [intStrs[5], 6],
    [intStrs[6], 7],
    [intStrs[7], 8],
    [intStrs[8], 9],
];
var inputToRun = input_1.input;
var allTheCalibrationLines = inputToRun.split('\n');
var clusterArr = allTheCalibrationLines.map(function (line) {
    var valueIndexesArr = [];
    for (var i = 0; i < intStrs.length; i++) {
        var stringedInt = intStrs[i];
        var valueIndexes = { value: stringedInt };
        var int = i + 1;
        var firstIndexOfStrInt = line.indexOf(stringedInt);
        var lastIndexOfStrInt = line.lastIndexOf(stringedInt);
        if (firstIndexOfStrInt !== -1) {
            valueIndexes.firstIndex = firstIndexOfStrInt;
            valueIndexes.lastIndex = lastIndexOfStrInt;
            valueIndexesArr.push({ value: stringedInt, firstIndex: firstIndexOfStrInt, lastIndex: lastIndexOfStrInt });
        }
        var firstIndexOfInt = line.indexOf(int.toString());
        var lastIndexOfInt = line.lastIndexOf(int.toString());
        if (firstIndexOfInt !== -1) {
            valueIndexes.firstIndex = firstIndexOfInt;
            valueIndexes.lastIndex = lastIndexOfInt;
            valueIndexesArr.push({ value: stringedInt, firstIndex: firstIndexOfInt, lastIndex: lastIndexOfInt });
        }
        continue;
    }
    var firstValue = valueIndexesArr[0];
    var lastValue = valueIndexesArr[0];
    valueIndexesArr.forEach(function (value) {
        if (firstValue.firstIndex > value.firstIndex) {
            firstValue = value;
        }
        if (lastValue.lastIndex < value.lastIndex) {
            lastValue = value;
        }
    });
    var sumOfValues = function () {
        var _a, _b;
        var realFirstValue = (_a = intMap.find(function (int) { return int[0] === firstValue.value; })) === null || _a === void 0 ? void 0 : _a[1].toString();
        var realLastValue = (_b = intMap.find(function (int) { return int[0] === lastValue.value; })) === null || _b === void 0 ? void 0 : _b[1].toString();
        return realFirstValue + realLastValue;
    };
    var sumToReturn = sumOfValues();
    return +sumToReturn;
});
var sumOfAll = clusterArr.reduce(function (acc, curr) { return acc + curr; }, 0);
console.log(sumOfAll);
