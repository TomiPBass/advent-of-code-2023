import { input } from './input';

const start = new Date().getTime();
const testingInput = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

type Dataset = [string, number[]];

const lines = testingInput.split('\n');
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
    let combinations: string[] = [];
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
            combinations.push(combinationString);
        }
    }
    return combinations;
}

let allPossibleCombinations: string[][] = [];

data.forEach((dataset) => {
    const combinations = getAllCombinations(dataset);
    allPossibleCombinations.push(combinations);
});

/*
#.#.### 1,1,3 -                 #
.??..??...###. 1,1,3 -          .
.#.###.#.###### 1,3,1,6 -       #
####.#...#... 4,1,1 -           .
????.######..#####. 1,6,5 -     .
?###???????? 3,2,1 -            BOTH

.#.###.#.###### 1,3,1,6
 */

const extraData = data.map((dataset, i) => {
    const [arrangement, rules] = dataset;
    const currentCombinations = allPossibleCombinations[i];
    const doesHaveToHaveDotAtTheEnd = !currentCombinations.some((combination) => {
        return combination[combination.length - 1] !== '.';
    });
    if (doesHaveToHaveDotAtTheEnd) {
        return ['?' + arrangement, rules] as Dataset;
    } else {
        return [arrangement + '?', rules] as Dataset;
    }
});

let numberOfPossibleExtraCombinations: number[] = [];
extraData.forEach((dataset) => {
    const combinations = getAllCombinations(dataset);
    numberOfPossibleExtraCombinations.push(combinations.length);
});

const newNumberOfPossibleCombinations = allPossibleCombinations.map((oc, i) => {
    return oc.length * Math.pow(numberOfPossibleExtraCombinations[i], 4);
});

const sum = newNumberOfPossibleCombinations.reduce((a, b) => a + b, 0);

console.log('Sum of all the lengths:', sum);

const end = new Date().getTime();
console.log(`Execution time: ${end - start} ms`);
