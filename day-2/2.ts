import { input } from "./input.js";
import { parseGameInput } from "./utils.js";

const start = new Date().getTime();
type Color = 'blue' | 'red' | 'green';

const sumOfAllThePowersOfSets = (input: string): number =>
    parseGameInput(input).reduce((totalPower, game) => {
        const maximums = game.sets.reduce((max, set) => {
            Object.entries(set).forEach(([color, amount]) => {
                max[color as Color] = Math.max(max[color as Color] || 0, amount);
            });
            return max;
        }, {} as Record<Color, number>);

        return totalPower + Object.values(maximums).reduce((prod, max) => prod * max, 1);
    }, 0);

console.log(sumOfAllThePowersOfSets(input));

const end = new Date().getTime();
console.log(`Execution time: ${end - start} ms`);