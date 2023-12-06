"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var input_1 = require("./input");
var inputArray = input_1.testingInput.split('\n');
var winningCounts = [];
inputArray.forEach(function (line) {
    var winningCount = 0;
    var winningNumbers = line
        .split(':')[1]
        .split('|')[0]
        .split(' ')
        .map(function (num) {
        if (!isNaN(+num)) {
            return parseInt(num);
        }
    })
        .filter(function (num) { return !isNaN(num); });
    var myNumbers = line
        .split(':')[1]
        .split('|')[1]
        .split(' ')
        .map(function (num) {
        if (!isNaN(+num)) {
            return parseInt(num);
        }
    })
        .filter(function (num) { return !isNaN(num); });
    for (var i = 0; i < myNumbers.length; i++) {
        if (winningNumbers.includes(myNumbers[i])) {
            if (winningCount === 0) {
                winningCount = 1;
            }
            else {
                winningCount *= 2;
            }
        }
    }
    winningCounts.push(winningCount);
});
console.log('final count', winningCounts.reduce(function (a, b) { return a + b; }, 0));
