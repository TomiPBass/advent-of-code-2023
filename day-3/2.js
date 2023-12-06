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
var getArrayOfNumbersNearTheStarSybol = function (symbol) {
    var symbolAxisPoint = symbol.symbolAxisPoint;
    var symbolX = symbolAxisPoint[0], symbolY = symbolAxisPoint[1];
    var possibleNearPossitions = [];
    for (var dx = -1; dx <= 1; dx++) {
        for (var dy = -1; dy <= 1; dy++) {
            if (dx !== 0 || dy !== 0) {
                possibleNearPossitions.push([symbolX + dx, symbolY + dy]);
            }
        }
    }
    var arrayOfNumbersNearTheStarSybol = [];
    numbers.forEach(function (number) {
        var allAxisPositions = number.allAxisPositions;
        var isNumberNearTheStarSybol = allAxisPositions.find(function (axisPoint) {
            var numberX = axisPoint[0], numberY = axisPoint[1];
            var isNumberNearTheStarSybol = possibleNearPossitions.find(function (possibleNearPossition) {
                var possibleNearPossitionX = possibleNearPossition[0], possibleNearPossitionY = possibleNearPossition[1];
                return (possibleNearPossitionX === numberX &&
                    possibleNearPossitionY === numberY);
            });
            if (isNumberNearTheStarSybol)
                return true;
        });
        if (isNumberNearTheStarSybol) {
            arrayOfNumbersNearTheStarSybol.push(number.number);
        }
    });
    return arrayOfNumbersNearTheStarSybol;
};
parseInput(arrayOfLines);
var starSymbols = symbols.filter(function (symbol) { return symbol.symbol === '*'; });
var starsNearNumbersMultiplied = starSymbols.map(function (starSymbol) {
    var arrayOfNumbersNearTheStarSybol = getArrayOfNumbersNearTheStarSybol(starSymbol);
    if (arrayOfNumbersNearTheStarSybol.length === 1)
        return 0;
    var multiplied = arrayOfNumbersNearTheStarSybol.reduce(function (acc, curr) { return acc * curr; }, 1);
    return multiplied;
});
var sumOfGearNumbers = starsNearNumbersMultiplied.reduce(function (acc, curr) {
    if (curr)
        return acc + curr;
    return acc;
}, 0);
console.log(sumOfGearNumbers);
