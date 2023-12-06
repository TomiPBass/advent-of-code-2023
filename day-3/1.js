"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var input_js_1 = require("./input.js");
var utils_js_1 = require("./utils.js");
var symbols = [];
var numbers = [];
var arrayOfLines = input_js_1.input.split('\n');
var parseInput = function (arrayOfLines) {
    arrayOfLines.forEach(function (line, y) {
        var arrayOfChars = line.split('');
        var startingIndex = 0;
        arrayOfChars.forEach(function (char, x) {
            if (char !== '.' && isNaN(parseInt(char))) {
                symbols.push({
                    symbolAxisPoint: [x + 1, y + 1],
                });
            }
            else if (char !== '.' && x >= startingIndex) {
                var _a = (0, utils_js_1.parseNumber)(x, arrayOfChars), number = _a.number, nextStartingIndex = _a.nextStartingIndex;
                startingIndex = nextStartingIndex;
                numbers.push({
                    startingAxisPoint: [x + 1, y + 1],
                    number: parseInt(number),
                });
            }
        });
    });
};
var isPowerNumber = function (data) {
    var startingAxisPoint = data.startingAxisPoint, number = data.number;
    var numberX = startingAxisPoint[0], numberY = startingAxisPoint[1];
    var nearBySymbols = symbols.find(function (symbol) {
        var symbolAxisPoint = symbol.symbolAxisPoint;
        var numberLength = number.toString().length;
        var symbolX = symbolAxisPoint[0], symbolY = symbolAxisPoint[1];
        var isAboveOrBelowNumber = function () {
            var arrayOfClosePositions = [numberX - 1, numberX + numberLength];
            for (var i = numberX; i < numberX + numberLength; i++) {
                arrayOfClosePositions.push(i);
            }
            if (arrayOfClosePositions.includes(symbolX) &&
                symbolY === numberY - 1)
                return true;
            if (arrayOfClosePositions.includes(symbolX) &&
                symbolY === numberY + 1)
                return true;
        };
        if (isAboveOrBelowNumber())
            return true;
        if (symbolY === numberY) {
            if (symbolX === numberX - 1) {
                return true;
            }
            if (symbolX === numberX + numberLength)
                return true;
        }
    });
    if (nearBySymbols) {
        return true;
    }
    return false;
};
parseInput(arrayOfLines);
var powerNumbers = numbers.map(function (number) {
    if (isPowerNumber(number))
        return number.number;
});
var sumOfPowerNumbers = powerNumbers.reduce(function (acc, curr) {
    if (curr)
        return acc + curr;
    return acc;
}, 0);
console.log(sumOfPowerNumbers);
