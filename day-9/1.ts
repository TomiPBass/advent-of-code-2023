import { input } from './input';

const start = new Date().getTime();
const testingInput = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

/*
5  10  13  16  21  30  45
  5   3   3   5   9  15
   -2   0   2   4   6
      2   2   2   2
        0   0   0
*/
const lines = input.split('\n');
const arrOfHistrories = lines.map((line) =>
    line.split(' ').map((n) => parseInt(n)),
);
const nextHistoryValues = [];

arrOfHistrories.forEach((history) => {
    let differences = [] as number[];
    const allTheFirstNumbers = [] as number[];
    while (differences.length === 0 || !!differences.find((d) => d !== 0)) {
        const inputToAnalyze = !differences.length ? history : differences;
        differences = [];
        inputToAnalyze.forEach((value, index) => {
            if (index === inputToAnalyze.length - 1) return;
            if (index === 0) allTheFirstNumbers.push(value);
            const difference =
                value - inputToAnalyze[index + 1] === 0
                    ? 0
                    : -(value - inputToAnalyze[index + 1]);
            differences[index] = difference;
        });
    }
    allTheFirstNumbers.reverse();
    let nextHistory = [];
    differences.push(0);
    allTheFirstNumbers.forEach((firstN) => {
        let currentIteration = firstN;
        nextHistory.push(firstN);
        differences.forEach((diff) => {
            nextHistory.push(currentIteration + diff);
            currentIteration += diff;
        });
        differences = nextHistory;
        nextHistory = [];
    });
    nextHistoryValues.push(differences[differences.length - 1]);
});

const sumOfHistoryValues = nextHistoryValues.reduce((acc, cur) => acc + cur, 0);
console.log('Final sum of history values:', sumOfHistoryValues);

const end = new Date().getTime();
console.log(`Execution time: ${end - start}ms`);
