import { input, testingInput } from './input';

const start = new Date().getTime();
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
const end = new Date().getTime();
console.log(`Execution time: ${end - start} ms`);
