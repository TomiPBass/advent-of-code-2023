"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var input_js_1 = require("./input.js");
var utils_js_1 = require("./utils.js");
var start = new Date().getTime();
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
                    symbol: char,
                });
            }
            else if (char !== '.' && x >= startingIndex) {
                var _a = (0, utils_js_1.parseNumber)(x, arrayOfChars), number = _a.number, nextStartingIndex = _a.nextStartingIndex;
                startingIndex = nextStartingIndex;
                var allNumbersPositions = [];
                for (var i = x; i < x + number.length; i++) {
                    allNumbersPositions.push([i + 1, y + 1]);
                }
                numbers.push({
                    allAxisPositions: allNumbersPositions,
                    number: parseInt(number),
                });
            }
        });
    });
};
var getArrayOfNumbersNearTheStarSymbol = function (symbol) {
    var symbolAxisPoint = symbol.symbolAxisPoint;
    var symbolX = symbolAxisPoint[0], symbolY = symbolAxisPoint[1];
    var possibleNearPositions = [];
    for (var dx = -1; dx <= 1; dx++) {
        for (var dy = -1; dy <= 1; dy++) {
            if (dx !== 0 || dy !== 0) {
                possibleNearPositions.push([symbolX + dx, symbolY + dy]);
            }
        }
    }
    var arrayOfNumbersNearTheStarSymbol = [];
    numbers.forEach(function (number) {
        var allAxisPositions = number.allAxisPositions;
        var isNumberNearTheStarSymbol = allAxisPositions.find(function (axisPoint) {
            var numberX = axisPoint[0], numberY = axisPoint[1];
            var isNumberNearTheStarSymbol = possibleNearPositions.find(function (possibleNearPosition) {
                var possibleNearPositionX = possibleNearPosition[0], possibleNearPositionY = possibleNearPosition[1];
                return (possibleNearPositionX === numberX &&
                    possibleNearPositionY === numberY);
            });
            if (isNumberNearTheStarSymbol)
                return true;
        });
        if (isNumberNearTheStarSymbol) {
            arrayOfNumbersNearTheStarSymbol.push(number.number);
        }
    });
    return arrayOfNumbersNearTheStarSymbol;
};
parseInput(arrayOfLines);
var starSymbols = symbols.filter(function (symbol) { return symbol.symbol === '*'; });
var starsNearNumbersMultiplied = starSymbols.map(function (starSymbol) {
    var arrayOfNumbersNearTheStarSymbol = getArrayOfNumbersNearTheStarSymbol(starSymbol);
    if (arrayOfNumbersNearTheStarSymbol.length === 1)
        return 0;
    var multiplied = arrayOfNumbersNearTheStarSymbol.reduce(function (acc, curr) { return acc * curr; }, 1);
    return multiplied;
});
var sumOfGearNumbers = starsNearNumbersMultiplied.reduce(function (acc, curr) {
    if (curr)
        return acc + curr;
    return acc;
}, 0);
console.log(sumOfGearNumbers);
var end = new Date().getTime();
console.log("Execution time: ".concat(end - start, " ms"));
