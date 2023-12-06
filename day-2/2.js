"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var input_js_1 = require("./input.js");
var utils_js_1 = require("./utils.js");
var sumOfAllThePowersOfSets = function (input) {
    return (0, utils_js_1.parseGameInput)(input).reduce(function (totalPower, game) {
        var maximums = game.sets.reduce(function (max, set) {
            Object.entries(set).forEach(function (_a) {
                var color = _a[0], amount = _a[1];
                max[color] = Math.max(max[color] || 0, amount);
            });
            return max;
        }, {});
        return totalPower + Object.values(maximums).reduce(function (prod, max) { return prod * max; }, 1);
    }, 0);
};
console.log(sumOfAllThePowersOfSets(input_js_1.input));
