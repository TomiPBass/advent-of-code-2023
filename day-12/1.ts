import { input } from './input';

const start = new Date().getTime();
const testingInput = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

/*
#.#.### 1,1,3 - 1 arrangement
.??..??...###. 1,1,3 - 4 arrangements
.#.###.#.###### 1,3,1,6 - 1 arrangement
####.#...#... 4,1,1 - 1 arrangement
????.######..#####. 1,6,5 - 4 arrangements
?###???????? 3,2,1 - 10 arrangements¨

.??..??...?##.?.??..??...?##. 1,1,3,1,1,3

.#...#....###.
..#..#....###.
.#....#...###.
..#...#..###.
 */

type Dataset = [string, number[]];

const lines = input.split('\n');
const data: Dataset[] = lines.map((line) => [
    line.split(' ')[0],
    line
        .split(' ')[1]
        .split(',')
        .map((n) => parseInt(n)),
]);

function checkTheArrangement(arrangement: string, rules: number[]): boolean {
    let isMatch = true;
    const onlyGroupsOfPots = arrangement.split('.').filter((pot) => pot);
    if (onlyGroupsOfPots.length !== rules.length) isMatch = false;
    for (let i = 0; i < rules.length; i++) {
        if (!onlyGroupsOfPots[i]) return false;
        const rule = rules[i];
        const group = onlyGroupsOfPots[i];
        if (group.length !== rule) return false;
    }
    return isMatch;
}

function getAllCombinations(dataset: Dataset) {
    const allQuestionMarks = dataset[0]
        .split('')
        .map((char, index) => {
            if (char === '?') return index;
        })
        .filter((index) => index !== undefined);
    const numberOfPossibleCombinations = Math.pow(2, allQuestionMarks.length);
    let combinationsCount = 0;
    const combination = dataset[0].split('');
    for (let i = 0; i < numberOfPossibleCombinations; i++) {
        const binaryArray = i
            .toString(2)
            .split('')
            .map((n) => parseInt(n));
        for (let j = binaryArray.length; j < allQuestionMarks.length; j++) {
            binaryArray.unshift(0);
        }
        let j = 0;
        while (j < binaryArray.length) {
            const questionMarkIndex = allQuestionMarks[j];
            if (binaryArray[j] === 0) {
                combination[questionMarkIndex] = '.';
            } else {
                combination[questionMarkIndex] = '#';
            }
            j++;
        }
        const combinationString = combination.join('');
        const isMatch = checkTheArrangement(combinationString, dataset[1]);
        if (isMatch) {
            combinationsCount++;
        }
    }
    return combinationsCount;
}

let count = [];
data.forEach((dataset) => {
    const combinations = getAllCombinations(dataset);
    count.push(combinations);
});
console.log(
    'Sum of all the lengths:',
    count.reduce((a, b) => a + b, 0),
);

const end = new Date().getTime();
console.log(`Execution time: ${end - start} ms`);
