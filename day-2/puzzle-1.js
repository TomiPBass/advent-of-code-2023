"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sumAllTheIdsOfPossibleGames = exports.parseGameInput = void 0;
var input_js_1 = require("./input.js");
var rules = { blue: 14, red: 12, green: 13 };
var parseGameInput = function (input) {
    return input.split('\n').map(function (gameString) {
        var _a = gameString.split(':'), title = _a[0], setString = _a[1];
        var id = +title.split(' ')[1];
        var sets = setString.split(';').map(function (set) {
            return set.split(',').reduce(function (acc, subset) {
                var _a = subset.trim().split(' '), amount = _a[0], color = _a[1];
                acc[color] = +amount;
                return acc;
            }, {});
        });
        return { id: id, sets: sets };
    });
};
exports.parseGameInput = parseGameInput;
var sumAllTheIdsOfPossibleGames = function (input, rules) {
    return (0, exports.parseGameInput)(input)
        .filter(function (game) { return game.sets.every(function (set) {
        return Object.entries(set).every(function (_a) {
            var color = _a[0], amount = _a[1];
            return amount <= rules[color];
        });
    }); })
        .reduce(function (acc, game) { return acc + game.id; }, 0);
};
exports.sumAllTheIdsOfPossibleGames = sumAllTheIdsOfPossibleGames;
console.log((0, exports.sumAllTheIdsOfPossibleGames)(input_js_1.inputDayTwo, rules));
