import { input } from "./input.js";
import { Set, parseGameInput } from './utils.js';

const rules: Set = { blue: 14, red: 12, green: 13 };

export const sumAllTheIdsOfPossibleGames = (input: string, rules: Set): number =>
    parseGameInput(input)
        .filter(game => game.sets.every(set =>
            Object.entries(set).every(([color, amount]) => amount <= rules[color])
        ))
        .reduce((acc, game) => acc + game.id, 0);

console.log(sumAllTheIdsOfPossibleGames(input, rules));