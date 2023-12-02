"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var input = "Game 1: 4 blue, 7 red, 5 green; 3 blue, 4 red, 16 green; 3 red, 11 green\nGame 2: 20 blue, 8 red, 1 green; 1 blue, 2 green, 8 red; 9 red, 4 green, 18 blue; 2 green, 7 red, 2 blue; 10 blue, 2 red, 5 green\nGame 3: 2 red, 5 green, 1 blue; 3 blue, 5 green; 8 blue, 13 green, 2 red; 9 green, 3 blue; 12 green, 13 blue; 3 green, 3 blue, 1 red\nGame 4: 1 red, 6 green, 4 blue; 3 green, 1 blue, 1 red; 7 blue, 1 red, 2 green\nGame 5: 2 green, 9 blue, 1 red; 3 green, 1 blue, 3 red; 1 red, 4 blue, 9 green\nGame 6: 2 blue, 5 red, 7 green; 5 blue, 8 red, 3 green; 2 red, 9 blue, 2 green\nGame 7: 7 green, 7 blue, 2 red; 2 red, 7 green, 16 blue; 17 blue, 3 green, 3 red; 2 blue, 5 green, 3 red\nGame 8: 4 red, 3 green; 9 green, 2 red, 2 blue; 1 red, 3 blue, 6 green\nGame 9: 5 red, 3 green, 13 blue; 11 red, 15 blue, 1 green; 7 red, 2 blue\nGame 10: 15 red, 3 green; 7 green, 4 blue, 11 red; 13 red, 13 blue; 2 blue, 5 green, 8 red\nGame 11: 7 red, 3 green; 7 blue, 16 red, 4 green; 6 green, 6 blue, 12 red; 11 red, 4 green, 4 blue; 10 red, 6 blue, 2 green; 3 green, 7 red, 6 blue\nGame 12: 1 blue, 2 red; 2 green, 15 blue; 6 green, 5 blue; 6 blue, 4 green; 5 blue, 3 green; 3 red, 3 blue, 10 green\nGame 13: 10 red, 4 green; 9 red, 2 blue, 3 green; 6 red, 7 green, 1 blue; 9 red, 7 green, 1 blue; 3 blue; 3 blue, 3 red, 8 green\nGame 14: 12 blue, 3 red, 4 green; 3 green, 1 red; 6 green, 16 blue\nGame 15: 2 green, 3 red, 2 blue; 14 blue, 1 red, 17 green; 13 blue, 11 green, 10 red; 5 green, 7 red, 5 blue; 2 green, 3 blue, 6 red; 9 green, 2 blue, 5 red\nGame 16: 2 blue, 1 red; 1 red, 2 green, 3 blue; 4 green, 9 blue, 3 red; 1 green, 4 red, 8 blue; 7 blue, 11 red, 1 green\nGame 17: 9 green, 8 blue, 6 red; 8 red, 18 green, 1 blue; 18 red, 19 green, 1 blue\nGame 18: 1 green, 4 red, 5 blue; 10 green, 8 blue; 12 green, 10 blue\nGame 19: 3 red, 11 green, 12 blue; 16 green, 1 red, 20 blue; 9 green, 2 red, 14 blue; 5 blue, 2 green, 2 red; 20 blue, 3 red, 10 green; 4 green, 3 blue\nGame 20: 17 red, 3 blue, 9 green; 6 green, 1 red, 7 blue; 6 red, 2 blue; 1 blue, 4 green, 5 red; 6 green, 5 red; 10 blue, 11 green, 2 red\nGame 21: 9 red, 4 blue, 6 green; 14 red, 9 green; 1 red, 1 blue, 12 green\nGame 22: 5 green, 4 red; 1 green, 1 red, 2 blue; 5 red, 4 green, 4 blue; 2 green, 2 blue, 5 red; 8 green, 4 blue, 16 red; 15 red, 3 green\nGame 23: 5 green, 14 red; 6 blue, 2 green, 14 red; 4 blue, 8 red, 4 green; 4 blue, 9 red, 8 green; 9 blue, 3 green\nGame 24: 13 blue, 9 green, 13 red; 11 blue, 14 red, 10 green; 12 green, 5 blue, 14 red\nGame 25: 11 green, 1 blue; 12 red, 8 green, 5 blue; 1 blue, 8 green, 6 red\nGame 26: 4 blue, 1 green; 1 green, 5 red, 6 blue; 8 green, 5 blue, 6 red; 2 blue, 2 red, 8 green; 8 green, 2 red, 4 blue; 7 red, 2 blue, 7 green\nGame 27: 8 red, 1 blue, 8 green; 5 red, 2 green; 2 blue, 9 green, 9 red; 2 blue\nGame 28: 2 green, 1 blue; 2 green; 1 blue; 1 blue, 1 red; 1 blue; 1 green\nGame 29: 12 red, 8 green, 13 blue; 13 green, 15 red; 12 red, 18 green, 10 blue; 7 green, 20 red, 5 blue; 20 red, 7 green, 10 blue; 9 green, 13 blue\nGame 30: 5 red, 3 blue; 2 red; 2 green, 6 blue, 7 red; 5 red\nGame 31: 14 red, 7 blue, 2 green; 1 green, 11 red, 9 blue; 3 red, 2 green, 5 blue; 1 green, 9 blue, 8 red; 8 blue, 8 red, 1 green\nGame 32: 2 green, 6 blue, 2 red; 2 blue, 4 red; 1 green, 9 blue, 1 red; 3 red, 13 blue, 1 green\nGame 33: 6 green, 8 blue, 7 red; 3 blue, 1 green, 8 red; 6 red, 11 blue; 10 blue, 3 red, 7 green; 1 blue, 3 red, 6 green\nGame 34: 1 red, 1 blue, 8 green; 5 blue, 10 red, 11 green; 2 green, 10 red, 2 blue\nGame 35: 2 blue, 15 green; 3 red, 3 blue, 6 green; 13 green, 17 red, 3 blue; 18 green, 1 blue, 18 red; 16 green, 3 blue; 11 green, 15 red\nGame 36: 16 red, 4 green, 1 blue; 8 red, 2 blue, 5 green; 5 green, 2 blue, 9 red\nGame 37: 3 green, 7 blue; 8 blue, 5 red, 6 green; 5 blue, 1 red, 13 green\nGame 38: 6 green, 6 blue; 11 blue, 8 green, 1 red; 5 blue, 16 green\nGame 39: 2 red, 4 blue, 5 green; 1 red, 2 green, 8 blue; 16 green, 15 blue, 2 red; 6 green, 16 blue, 1 red; 16 green, 18 blue, 1 red\nGame 40: 3 green, 6 blue, 7 red; 1 blue, 17 red; 4 green, 6 red; 13 red\nGame 41: 6 red, 5 green, 6 blue; 4 green, 2 blue; 6 red, 1 blue, 4 green; 4 blue, 13 green; 3 blue, 2 red; 2 blue, 5 red, 3 green\nGame 42: 8 red, 5 blue; 15 blue, 13 red, 3 green; 6 red, 18 blue, 4 green\nGame 43: 5 red, 1 green, 1 blue; 2 red, 2 green, 3 blue; 4 blue, 3 red, 1 green\nGame 44: 6 blue, 12 green; 7 blue, 12 red, 11 green; 12 green, 2 blue, 13 red; 8 green, 8 blue, 12 red\nGame 45: 18 blue, 15 red, 8 green; 17 red, 3 blue; 1 green, 2 red, 15 blue\nGame 46: 3 blue, 2 green, 5 red; 11 blue, 2 green, 19 red; 3 green, 19 red, 13 blue\nGame 47: 9 green, 2 red; 7 red, 10 green; 2 blue, 9 green, 1 red; 5 blue\nGame 48: 8 blue, 8 green; 1 red, 17 green; 9 green, 6 red, 8 blue; 13 green, 3 red, 1 blue\nGame 49: 17 blue, 2 red, 1 green; 12 blue, 1 green, 4 red; 1 green, 2 red, 13 blue\nGame 50: 4 red, 2 blue, 9 green; 8 green, 2 blue, 6 red; 9 green, 2 blue, 14 red\nGame 51: 6 red, 3 green, 8 blue; 5 green, 16 blue, 1 red; 2 green, 13 red, 14 blue; 14 red, 12 green, 19 blue; 19 blue, 13 green, 9 red; 6 red, 15 blue, 7 green\nGame 52: 18 blue, 2 red, 5 green; 2 green, 5 red; 6 red, 10 green, 3 blue; 3 green, 6 blue, 6 red\nGame 53: 11 red, 4 green; 2 blue, 3 red; 3 blue, 13 red, 11 green; 11 blue, 8 red, 5 green\nGame 54: 4 green, 1 red, 7 blue; 4 green, 8 red, 8 blue; 4 red, 5 green; 8 blue, 4 green, 2 red; 4 green, 3 blue; 3 blue, 3 green, 3 red\nGame 55: 9 red, 1 green, 1 blue; 1 green, 8 red; 4 red; 7 blue, 7 green; 6 blue, 5 green, 6 red; 5 blue, 8 red, 4 green\nGame 56: 1 blue; 3 red, 2 blue; 1 red, 2 green\nGame 57: 7 green, 2 red, 5 blue; 6 green, 1 red; 1 green, 6 red; 1 red, 20 green; 1 green, 4 red, 2 blue; 15 green, 7 red\nGame 58: 3 green, 8 red, 5 blue; 2 red, 3 green; 2 blue, 2 green, 12 red; 1 blue, 3 green, 16 red; 4 blue, 9 red, 3 green\nGame 59: 2 red, 5 blue, 1 green; 2 red, 3 green; 12 red, 5 blue; 7 green, 3 blue, 4 red; 1 green, 5 blue, 14 red; 8 red, 11 green, 2 blue\nGame 60: 12 blue, 3 red, 2 green; 2 green, 6 blue, 1 red; 1 blue, 2 red, 3 green; 7 green, 1 blue, 2 red\nGame 61: 6 blue, 6 red, 7 green; 2 green, 5 red, 5 blue; 1 blue, 3 green, 15 red; 6 blue, 8 green, 14 red\nGame 62: 1 blue, 6 red, 2 green; 5 green, 5 red, 11 blue; 5 red, 6 green, 8 blue; 2 green, 17 blue; 2 red, 7 green, 5 blue; 3 blue, 5 green, 8 red\nGame 63: 6 red, 1 green, 9 blue; 7 red, 1 green, 11 blue; 3 green, 4 red; 4 green, 10 blue, 7 red; 13 blue, 11 green, 5 red; 14 green\nGame 64: 13 green, 11 red, 1 blue; 1 red, 2 green; 3 blue, 9 green, 19 red\nGame 65: 2 blue, 11 red, 3 green; 5 green, 6 red; 2 blue, 9 green, 9 red; 1 green, 5 blue, 3 red; 4 red, 4 blue, 6 green; 2 blue, 7 green, 1 red\nGame 66: 4 red, 7 blue, 3 green; 1 green, 6 blue, 7 red; 1 green, 1 red, 1 blue\nGame 67: 1 green, 8 red; 4 green, 1 blue, 3 red; 8 red, 3 green\nGame 68: 3 blue, 4 red; 1 blue, 1 green; 2 blue, 6 red, 3 green; 1 blue, 1 green, 3 red; 7 red, 1 blue, 4 green; 1 green, 2 red, 3 blue\nGame 69: 6 green, 2 blue, 3 red; 3 blue, 3 red; 1 green; 1 blue, 2 red, 8 green; 1 green, 1 red\nGame 70: 7 blue, 15 green, 3 red; 8 green, 6 blue, 5 red; 7 blue, 1 red, 3 green\nGame 71: 4 green, 3 blue, 7 red; 6 red, 6 green, 10 blue; 3 red, 9 green; 7 blue, 1 red, 13 green; 3 blue, 5 red, 11 green; 8 blue, 8 red, 5 green\nGame 72: 10 green, 4 blue; 4 blue, 8 green, 2 red; 2 red, 6 green, 6 blue; 1 red, 5 blue; 13 green, 5 blue; 8 green, 3 blue, 2 red\nGame 73: 9 blue, 1 red, 13 green; 2 red, 16 green, 6 blue; 1 red, 8 blue, 17 green; 7 green, 1 blue; 8 blue, 1 green, 1 red\nGame 74: 2 green, 2 red; 1 red, 5 blue; 7 blue, 3 green; 7 blue, 3 green, 7 red\nGame 75: 3 green, 5 blue; 2 green, 1 red, 9 blue; 17 green, 13 blue, 3 red; 3 blue, 2 red, 8 green; 7 green, 2 red, 8 blue; 1 green, 14 blue\nGame 76: 19 red; 2 blue, 20 red; 3 blue, 3 red; 20 red, 3 blue; 6 red, 4 blue, 1 green\nGame 77: 2 red, 5 green; 2 red, 2 green; 4 green; 4 green, 3 red, 3 blue; 2 red\nGame 78: 4 green, 16 red; 5 green, 2 red, 2 blue; 4 green, 2 blue, 11 red; 1 blue, 1 green, 6 red; 2 blue, 7 red\nGame 79: 8 blue, 2 green; 3 red, 3 green; 3 red, 9 blue, 4 green; 1 red, 2 blue, 4 green; 8 green, 6 red, 9 blue; 2 red, 10 blue, 9 green\nGame 80: 9 red, 17 blue, 2 green; 5 red, 1 green, 6 blue; 2 red, 20 blue; 6 red, 12 blue\nGame 81: 5 red, 4 blue, 1 green; 15 green, 8 blue, 2 red; 5 blue, 2 red, 9 green; 11 green, 1 blue, 3 red; 15 green, 1 red, 3 blue\nGame 82: 2 blue, 12 green; 12 blue, 12 green, 14 red; 4 blue, 16 green, 7 red\nGame 83: 6 blue, 7 red, 11 green; 2 red, 6 green, 4 blue; 6 blue, 1 red; 7 blue, 12 red, 13 green; 10 green, 6 blue, 10 red; 6 red, 4 green\nGame 84: 2 green, 5 red, 1 blue; 4 green, 3 blue, 2 red; 2 green, 1 red, 1 blue; 5 red, 4 blue, 4 green\nGame 85: 1 blue; 1 green, 2 red; 3 red, 11 green; 6 green, 14 red, 1 blue\nGame 86: 3 green, 1 blue, 3 red; 3 red, 6 blue, 2 green; 4 blue, 1 red; 5 blue, 4 green, 3 red; 2 blue, 3 red, 4 green; 7 blue, 2 green, 3 red\nGame 87: 1 green, 5 red, 5 blue; 6 red, 4 green, 1 blue; 2 green, 4 red, 1 blue; 7 red, 4 green, 5 blue; 3 green, 4 red, 1 blue\nGame 88: 3 blue, 18 red, 14 green; 11 red, 14 green; 2 blue, 10 red, 4 green\nGame 89: 5 red, 4 green; 3 red, 2 blue, 1 green; 2 blue, 4 green, 3 red; 2 green, 2 blue, 2 red\nGame 90: 14 blue, 10 red, 2 green; 11 blue, 3 red, 1 green; 5 blue, 2 green, 14 red\nGame 91: 9 blue, 4 red, 4 green; 4 red, 1 blue; 3 blue, 20 red\nGame 92: 3 red, 2 green, 7 blue; 2 green, 10 red, 8 blue; 9 red, 5 blue, 5 green; 1 blue, 2 green, 3 red; 10 red, 13 blue, 9 green; 11 blue, 7 red\nGame 93: 9 red, 2 blue, 1 green; 6 red, 2 blue, 11 green; 1 green, 1 blue, 10 red; 9 red, 8 green\nGame 94: 18 green, 3 red; 2 blue, 4 green, 12 red; 5 red, 1 blue, 13 green; 2 blue, 15 green, 7 red\nGame 95: 12 green; 1 red, 3 green, 1 blue; 13 green, 2 red, 1 blue; 9 green; 2 green, 1 blue; 1 blue, 4 green, 1 red\nGame 96: 5 red, 4 green, 2 blue; 10 red, 3 blue, 5 green; 14 blue, 11 green, 4 red; 14 green, 7 blue, 13 red; 17 red, 9 green, 6 blue; 8 red, 4 blue, 13 green\nGame 97: 3 green, 7 blue; 7 red, 4 blue; 5 blue, 6 red, 2 green\nGame 98: 9 green; 8 green, 4 blue; 6 blue, 2 red, 1 green; 4 green, 1 blue; 5 blue, 2 green, 2 red\nGame 99: 3 red, 1 green, 5 blue; 1 red; 3 blue, 4 red; 3 blue, 1 green, 5 red\nGame 100: 3 red, 3 blue, 10 green; 3 green, 1 blue, 6 red; 5 red, 4 green, 7 blue";
var testingInput = "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\nGame 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\nGame 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\nGame 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\nGame 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green";
var rules = {
    blue: 14,
    red: 12,
    green: 13,
};
var rulesKeys = Object.keys(rules);
var parseGameInput = function (input) {
    var arrayOfGameStrings = input.split('\n');
    var arrayOfGames = [];
    arrayOfGameStrings.forEach(function (gameString) {
        var _a;
        var game = {
            sets: [],
        };
        var gameTitle = gameString.split(':')[0];
        var gameSets = gameString.split(':')[1];
        var gameId = +gameTitle.split(' ')[1];
        game.id = gameId;
        var gameSetsArray = gameSets.split(';');
        for (var _i = 0, gameSetsArray_1 = gameSetsArray; _i < gameSetsArray_1.length; _i++) {
            var set = gameSetsArray_1[_i];
            var currentSet = void 0;
            var subsetArray = set.split(',');
            for (var _b = 0, subsetArray_1 = subsetArray; _b < subsetArray_1.length; _b++) {
                var subset = subsetArray_1[_b];
                var trimmedSubset = subset.trim();
                var color = trimmedSubset.split(' ')[1];
                var amount = +trimmedSubset.split(' ')[0];
                currentSet = __assign(__assign({}, currentSet), (_a = {}, _a[color] = amount, _a));
            }
            game.sets.push(currentSet);
        }
        arrayOfGames.push(game);
    });
    return arrayOfGames;
};
var sumAllTheIdsOfPossibleGames = function (input, rules) {
    // Parse the input into a clear data structure
    var parsedInput = parseGameInput(input);
    var succesfulGamesIds = [];
    // Loop through the games
    parsedInput.forEach(function (game) {
        var isSuccessfulGame = true;
        // Loop through the sets
        game.sets.forEach(function (set) {
            // Loop through the colors
            for (var color in set) {
                if (set.hasOwnProperty(color)) {
                    var amount = set[color];
                    // Check if the amount is bigger than the rule
                    if (amount > rules[color]) {
                        isSuccessfulGame = false;
                    }
                }
            }
        });
        if (isSuccessfulGame) {
            succesfulGamesIds.push(game.id);
        }
    });
    return succesfulGamesIds.reduce(function (acc, curr) { return acc + curr; }, 0);
};
var sumOfAllThePowersOfSets = function (input) {
    var parsedInput = parseGameInput(input);
    var allSetsPowers = [];
    // Loop through the games
    parsedInput.forEach(function (game) {
        var powerOfTheSets = 0;
        var maximums = {
            blue: 0,
            red: 0,
            green: 0,
        };
        // Loop through the sets
        game.sets.forEach(function (set) {
            // Loop through the colors
            for (var color in set) {
                // Update the maximums of each color if needed
                if (set.hasOwnProperty(color)) {
                    var amount = set[color];
                    if (amount > maximums[color]) {
                        maximums[color] = amount;
                    }
                }
            }
        });
        for (var maximum in maximums) {
            if (powerOfTheSets === 0) {
                powerOfTheSets = maximums[maximum];
            }
            else {
                powerOfTheSets *= maximums[maximum];
            }
        }
        allSetsPowers.push(powerOfTheSets);
    });
    return allSetsPowers.reduce(function (acc, curr) { return acc + curr; }, 0);
};
console.dir(sumOfAllThePowersOfSets(input), { depth: null, colors: true });
