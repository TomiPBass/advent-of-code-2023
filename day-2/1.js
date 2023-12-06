"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sumAllTheIdsOfPossibleGames = void 0;
var input_js_1 = require("./input.js");
var utils_js_1 = require("./utils.js");
var rules = { blue: 14, red: 12, green: 13 };
var sumAllTheIdsOfPossibleGames = function (input, rules) {
    return (0, utils_js_1.parseGameInput)(input)
        .filter(function (game) { return game.sets.every(function (set) {
        return Object.entries(set).every(function (_a) {
            var color = _a[0], amount = _a[1];
            return amount <= rules[color];
        });
    }); })
        .reduce(function (acc, game) { return acc + game.id; }, 0);
};
exports.sumAllTheIdsOfPossibleGames = sumAllTheIdsOfPossibleGames;
console.log((0, exports.sumAllTheIdsOfPossibleGames)(input_js_1.input, rules));
