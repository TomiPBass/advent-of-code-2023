"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseGameInput = void 0;
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
