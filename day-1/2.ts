import { testingInput, input } from './input'
// !Disclaimer: I know this is a mess, but it was 2 in the morning so don't judge

const start = new Date().getTime();
const intStrs = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'] as const
type Digits = typeof intStrs[number]

const intMap: [Digits, number][] = [
    [intStrs[0], 1],
    [intStrs[1], 2],
    [intStrs[2], 3],
    [intStrs[3], 4],
    [intStrs[4], 5],
    [intStrs[5], 6],
    [intStrs[6], 7],
    [intStrs[7], 8],
    [intStrs[8], 9],
]

type ValueIndexObj = {
    value: Digits;
    firstIndex: number;
    lastIndex: number;
}

const inputToRun = input;

const allTheCalibrationLines = inputToRun.split('\n');

const clusterArr = allTheCalibrationLines.map((line) => {
    let valueIndexesArr: ValueIndexObj[] = []; 
    for (let i = 0; i < intStrs.length; i++) {
        const stringedInt: Digits = intStrs[i]
        let valueIndexes = { value: stringedInt } as ValueIndexObj;
        const int = i + 1; 
        const firstIndexOfStrInt = line.indexOf(stringedInt);
        const lastIndexOfStrInt = line.lastIndexOf(stringedInt);
        if (firstIndexOfStrInt !== -1) {
            valueIndexes.firstIndex = firstIndexOfStrInt;
            valueIndexes.lastIndex = lastIndexOfStrInt;
            valueIndexesArr.push({ value: stringedInt, firstIndex: firstIndexOfStrInt, lastIndex: lastIndexOfStrInt })
        }
        const firstIndexOfInt = line.indexOf(int.toString())
        const lastIndexOfInt = line.lastIndexOf(int.toString())
        if (firstIndexOfInt !== -1) {
            valueIndexes.firstIndex = firstIndexOfInt;
            valueIndexes.lastIndex = lastIndexOfInt;
            valueIndexesArr.push({ value: stringedInt, firstIndex: firstIndexOfInt, lastIndex: lastIndexOfInt })
        }
        continue;
    }
    let firstValue: ValueIndexObj = valueIndexesArr[0];
    let lastValue: ValueIndexObj = valueIndexesArr[0];
    valueIndexesArr.forEach((value) => {
        if (firstValue.firstIndex > value.firstIndex) {
            firstValue = value;
        }
        if (lastValue.lastIndex < value.lastIndex) {
            lastValue = value;
        }
    })
    const sumOfValues = () => {
        const realFirstValue = intMap.find((int) => int[0] === firstValue.value)?.[1].toString()
        const realLastValue = intMap.find((int) => int[0] === lastValue.value)?.[1].toString()
        return realFirstValue! + realLastValue!
    }
    const sumToReturn = sumOfValues();
    return +sumToReturn
})

const sumOfAll = clusterArr.reduce((acc, curr) => acc + curr, 0)

console.log(sumOfAll)
const end = new Date().getTime();
console.log(`Execution time: ${end - start} ms`);
