import { input } from './input';

const start = new Date().getTime();
const testingInput = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;
const lines = input.split('\n');

const allTheZeros = [] as { x: number; y: number }[];
lines.forEach((line, y) => {
    line.split('').forEach((char, x) => {
        if (char === 'O') {
            allTheZeros.push({ x, y });
        }
    });
});

const maximumTopPositionsOfZeros = [];
allTheZeros.forEach((zero) => {
    const { x, y } = zero;
    let numberOfDostAboveZero = 0;
    for (let i = y - 1; i >= 0; i--) {
        if (lines[i][x] === '.') {
            numberOfDostAboveZero++;
        } else if (lines[i][x] === 'O') {
            continue;
        } else break;
    }
    maximumTopPositionsOfZeros.push(numberOfDostAboveZero + (lines.length - y));
});

const sum = maximumTopPositionsOfZeros.reduce((acc, curr) => acc + curr, 0);
console.log('Sum of all the zeros: ', sum);

const end = new Date().getTime();
console.log(`Execution time: ${end - start} ms`);
