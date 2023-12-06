"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNumber = void 0;
var parseNumber = function (index, arrayOfChars) {
    var number = '';
    var nextStartingIndex = 0;
    for (var i = index; i < arrayOfChars.length; i++) {
        if (!isNaN(parseInt(arrayOfChars[i]))) {
            number += arrayOfChars[i];
        }
        else {
            nextStartingIndex = i;
            break;
        }
    }
    return { number: number, nextStartingIndex: nextStartingIndex };
};
exports.parseNumber = parseNumber;
