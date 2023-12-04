import { inputDayTwo } from "./input.js";
import { parseGameInput } from "./puzzle-1";

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

console.log(sumOfAllThePowersOfSets(inputDayTwo));
