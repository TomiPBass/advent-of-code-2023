import { input, testingInput } from './input.js';
import { AxisPoint, SymbolData, parseNumber } from './utils.js';

type NumberData = {
    allAxisPositions: AxisPoint[];
    number: number;
};

const symbols = [] as (SymbolData & {symbol: string})[];
const numbers = [] as NumberData[];

const arrayOfLines = input.split('\n');


const parseInput = (arrayOfLines: string[]) => {
    arrayOfLines.forEach((line, y) => {
        const arrayOfChars = line.split('');
        let startingIndex = 0;
        arrayOfChars.forEach((char, x) => {
            if (char !== '.' && isNaN(parseInt(char))) {
                symbols.push({
                    symbolAxisPoint: [x + 1, y + 1],
                    symbol: char,
                });
            } else if (char !== '.' && x >= startingIndex) {
                const { number, nextStartingIndex } = parseNumber(
                    x,
                    arrayOfChars,
                );
                startingIndex = nextStartingIndex;
                const allNumbersPositions = [] as AxisPoint[];
                for (let i = x; i < x + number.length; i++) {
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

const getArrayOfNumbersNearTheStarSybol = (symbol: SymbolData) => {
    const { symbolAxisPoint } = symbol;
    const [symbolX, symbolY] = symbolAxisPoint;
    const possibleNearPossitions = [];
    for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
            if (dx !== 0 || dy !== 0) {
                possibleNearPossitions.push([symbolX + dx, symbolY + dy]);
            }
        }
    }
    const arrayOfNumbersNearTheStarSybol = [] as number[];
    numbers.forEach((number) => {
        const { allAxisPositions } = number;
        const isNumberNearTheStarSybol = allAxisPositions.find((axisPoint) => {
            const [numberX, numberY] = axisPoint;
            const isNumberNearTheStarSybol = possibleNearPossitions.find(
                (possibleNearPossition) => {
                    const [possibleNearPossitionX, possibleNearPossitionY] =
                        possibleNearPossition;
                    return (
                        possibleNearPossitionX === numberX &&
                        possibleNearPossitionY === numberY
                    );
                },
            );
            if (isNumberNearTheStarSybol) return true;
        });
        if (isNumberNearTheStarSybol) {
            arrayOfNumbersNearTheStarSybol.push(number.number);
        }
    });
    return arrayOfNumbersNearTheStarSybol;
};

parseInput(arrayOfLines);

const starSymbols = symbols.filter((symbol) => symbol.symbol === '*');

const starsNearNumbersMultiplied = starSymbols.map((starSymbol) => {
    const arrayOfNumbersNearTheStarSybol =
        getArrayOfNumbersNearTheStarSybol(starSymbol);

    if (arrayOfNumbersNearTheStarSybol.length === 1) return 0;
    const multiplied = arrayOfNumbersNearTheStarSybol.reduce(
        (acc, curr) => acc * curr,
        1,
    );
    return multiplied;
});

const sumOfGearNumbers = starsNearNumbersMultiplied.reduce((acc, curr) => {
    if (curr) return acc + curr;
    return acc;
}, 0);

console.log(sumOfGearNumbers);
