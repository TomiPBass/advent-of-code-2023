import { input } from './input';
const start = new Date().getTime();
const inputArray = input.split('\n');

const parsedData: {
    gameId: number;
    count: number;
    winningCount: number;
}[] = [];

for (let i = 0; i < inputArray.length; i++) {
    const line = inputArray[i];
    let winningCount = 0;
    const splitId = line.split(':')[0].split(' ');
    const gameId = parseInt(splitId[splitId.length - 1]);
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
    winningNumbers.forEach((num) => {
        if (myNumbers.includes(num)) {
            winningCount++;
        }
    });
    parsedData.push({
        gameId,
        count: 1,
        winningCount,
    });
}

let i = 0;
let x = 0;

parsedData.forEach((data) => {
    const { gameId, winningCount, count } = data;
    while (i < winningCount) {
        while (x < count) {
            parsedData[gameId + i].count++;
            x++;
            if (x === count) {
                x = 0;
                break;
            }
        }
        i++;
        if (i === winningCount) {
            i = 0;
            break;
        }
    }
});

const result = parsedData.map((data) => data.count).reduce((a, b) => a + b, 0);

console.log(result);

const end = new Date().getTime();
console.log(`Execution time: ${end - start} ms`);
