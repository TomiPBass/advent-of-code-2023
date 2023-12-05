"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var input_1 = require("./input");
var start = new Date().getTime();
var inputArray = input_1.input.split('\n');
var parsedData = [];
var _loop_1 = function (i_1) {
    var line = inputArray[i_1];
    var winningCount = 0;
    var splitId = line.split(':')[0].split(' ');
    var gameId = parseInt(splitId[splitId.length - 1]);
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
    winningNumbers.forEach(function (num) {
        if (myNumbers.includes(num)) {
            winningCount++;
        }
    });
    parsedData.push({
        gameId: gameId,
        count: 1,
        winningCount: winningCount,
    });
};
for (var i_1 = 0; i_1 < inputArray.length; i_1++) {
    _loop_1(i_1);
}
var i = 0;
var x = 0;
parsedData.forEach(function (data) {
    var gameId = data.gameId, winningCount = data.winningCount, count = data.count;
    while (i < winningCount) {
        while (x < count) {
            parsedData[gameId + i].count++;
            x++;
            if (x === count) {
                x = 0;
                break;
            }
        }
        i++;
        if (i === winningCount) {
            i = 0;
            break;
        }
    }
});
var result = parsedData.map(function (data) { return data.count; }).reduce(function (a, b) { return a + b; }, 0);
console.log(result);
var end = new Date().getTime();
console.log("Execution time: ".concat(end - start, " ms"));
