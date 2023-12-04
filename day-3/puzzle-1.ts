import { input, testingInput } from './input.js';

type AxisPoint = [number, number];

type NumberData = {
    startingAxisPoint: AxisPoint;
    number: number;
};

type SymbolData = {
    symbolAxisPoint: AxisPoint;
};

const symbols = [] as SymbolData[];
const numbers = [] as NumberData[];

const arrayOflines = input.split('\n');

const parseNumber = (index: number, arrayOfChars: string[]) => {
    let number: string = '';
    let nextStartingIndex: number = 0;
    for (let i = index; i < arrayOfChars.length; i++) {
        if (!isNaN(parseInt(arrayOfChars[i]))) {
            number += arrayOfChars[i];
        } else {
            nextStartingIndex = i;
            break;
        }
    }
    return { number, nextStartingIndex };
};

const parseInput = (arrayOflines: string[]) => {
    arrayOflines.forEach((line, y) => {
        const arrayOfChars = line.split('');
        let startingIndex = 0;
        arrayOfChars.forEach((char, x) => {
            if (char !== '.' && isNaN(parseInt(char))) {
                symbols.push({
                    symbolAxisPoint: [x + 1, y + 1],
                });
            } else if (char !== '.' && x >= startingIndex) {
                const { number, nextStartingIndex } = parseNumber(
                    x,
                    arrayOfChars,
                );
                startingIndex = nextStartingIndex;
                numbers.push({
                    startingAxisPoint: [x + 1, y + 1],
                    number: parseInt(number),
                });
            }
        });
    });
};

const isPowerNumber = (data: NumberData) => {
    const { startingAxisPoint, number } = data;
    const [numberX, numberY] = startingAxisPoint;
    const nearBySymbols = symbols.find((symbol) => {
        const { symbolAxisPoint } = symbol;
        const numberLength = number.toString().length;
        const [symbolX, symbolY] = symbolAxisPoint;
        const isAboveOrBelowNumber = () => {
            const arrayOfClosePositions = [numberX - 1, numberX + numberLength];
            for (let i = numberX; i < numberX + numberLength; i++) {
                arrayOfClosePositions.push(i);
            }
            if (
                arrayOfClosePositions.includes(symbolX) &&
                symbolY === numberY - 1
            )
                return true;
            if (
                arrayOfClosePositions.includes(symbolX) &&
                symbolY === numberY + 1
            )
                return true;
        };
        if (isAboveOrBelowNumber()) return true;
        if (symbolY === numberY) {
            if (symbolX === numberX - 1) {
                return true;
            }
            if (symbolX === numberX + numberLength) return true;
        }
    });
    if (nearBySymbols) {
        return true;
    }
    return false;
};

parseInput(arrayOflines);

const powerNumbers = numbers.map((number) => {
    if (isPowerNumber(number)) return number.number;
});

const sumOfPowerNumbers = powerNumbers.reduce((acc, curr) => {
    if (curr) return acc + curr;
    return acc;
}, 0);

console.log(sumOfPowerNumbers);
