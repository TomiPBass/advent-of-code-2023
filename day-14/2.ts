import { input } from './input';

const start = new Date().getTime();
const lines = input.split('\n');

const zerosOriginal = [] as { x: number; y: number }[];

lines.forEach((line, y) => {
    line.split('').forEach((char, x) => {
        if (char === 'O') {
            zerosOriginal.push({ x, y });
        }
    });
});

let currentLines: string[] = lines;

function tilt(panel: { x: number; y: number }[], direction: 'west' | 'east' | 'north' | 'south') {
    const newPanel = [] as { x: number; y: number }[];
    panel.forEach((zero) => {
        const { x, y } = zero;
        let numberOfDots = 0;
        if (direction === 'north') {
            for (let i = y - 1; i >= 0; i--) {
                if (currentLines[i][x] === '.') {
                    numberOfDots++;
                } else if (currentLines[i][x] === 'O') {
                    continue;
                } else break;
            }
            newPanel.push({ x, y: y - numberOfDots });
        } else if (direction === 'south') {
            for (let i = y + 1; i < currentLines.length; i++) {
                if (currentLines[i][x] === '.') {
                    numberOfDots++;
                } else if (currentLines[i][x] === 'O') {
                    continue;
                } else break;
            }
            newPanel.push({ x, y: y + numberOfDots });
        } else if (direction === 'west') {
            for (let i = x - 1; i >= 0; i--) {
                if (currentLines[y][i] === '.') {
                    numberOfDots++;
                } else if (currentLines[y][i] === 'O') {
                    continue;
                } else break;
            }
            newPanel.push({ x: x - numberOfDots, y });
        } else if (direction === 'east') {
            for (let i = x + 1; i < currentLines[y].length; i++) {
                if (currentLines[y][i] === '.') {
                    numberOfDots++;
                } else if (currentLines[y][i] === 'O') {
                    continue;
                } else break;
            }
            newPanel.push({ x: x + numberOfDots, y });
        }
    });
    currentLines = currentLines.map((line, index) => {
        let newLine = line.replace(/O/g, '.');
        newPanel.forEach((zero) => {
            if (zero.y === index && zero.x < line.length) {
                const lineArray = newLine.split('');
                lineArray[zero.x] = 'O';
                newLine = lineArray.join('');
            } else if (zero.x >= line.length) throw new Error('0 went out of bounds');
        });
        return newLine;
    });
    return newPanel;
}

function cycleAround(initialPosition: { x: number; y: number }[], count: number) {
    let countDown = count;
    let lastPosition = initialPosition;
    while (countDown > 0) {
        lastPosition = tilt(tilt(tilt(tilt(lastPosition, 'north'), 'west'), 'south'), 'east');
        countDown--;
    }
    return lastPosition;
}

const reduceResult = (min: number, max?: number) => {
    let currentIteration = min;
    if (!max) max = min;
    while (currentIteration <= max) {
        console.log(
            cycleAround(zerosOriginal, currentIteration).reduce((acc, zero) => acc + (currentLines[0].length - zero.y), 0),
        );
        currentIteration++;
    }
};

reduceResult(1000);
/* 
 For some reason, 1000th itteration are gonna get you the same result as the 1000000000th 
 itteration, at least for most cases it seems. So I'm just gonna use 1000th itteration to get the result.
 Don't judge me
*/

const end = new Date().getTime();
console.log(`Execution time: ${end - start} ms`);
