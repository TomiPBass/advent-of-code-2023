import { input, testingInput } from './input';

const example = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const inputArray = testingInput.split('\n');

const winningCounts = [];

inputArray.forEach((line) => {
    let winningCount = 0;
    const winningNumbers = line
        .split(':')[1]
        .split('|')[0]
        .split(' ')
        .map((num) => {
            if (!isNaN(+num)) {
                return parseInt(num);
            }
        })
        .filter((num) => !isNaN(num));

    const myNumbers = line
        .split(':')[1]
        .split('|')[1]
        .split(' ')
        .map((num) => {
            if (!isNaN(+num)) {
                return parseInt(num);
            }
        })
        .filter((num) => !isNaN(num));
    for (let i = 0; i < myNumbers.length; i++) {
        if (winningNumbers.includes(myNumbers[i])) {
            if (winningCount === 0) {
                winningCount = 1;
            } else {
                winningCount *= 2;
            }
        }
    }
    winningCounts.push(winningCount);
});

console.log(
    'final count',
    winningCounts.reduce((a, b) => a + b, 0),
);
