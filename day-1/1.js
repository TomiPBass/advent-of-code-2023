"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var input_1 = require("./input");
var arrayOfCalibrations = input_1.input.split('\n');
var onlyIntArr = arrayOfCalibrations.map(function (arr) {
    var everyChar = arr.split('');
    var onlyInt = everyChar.filter(function (char) { return char.toUpperCase() === char && char.toLowerCase() === char; });
    return onlyInt;
});
var mergedFirstAndLastInt = onlyIntArr.map(function (arr) { return +(arr[0] + arr[arr.length - 1]); });
var sumOfCalibrationValue = mergedFirstAndLastInt.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue;
}, 0);
console.log(sumOfCalibrationValue);
