import { input } from './input';

const start = new Date().getTime();
const arrayOfCalibrations = input.split('\n');

const onlyIntArr = arrayOfCalibrations.map((arr) => {
    const everyChar = arr.split('');
    const onlyInt = everyChar.filter((char) => char.toUpperCase() === char && char.toLowerCase() === char)
    return onlyInt;
});

const mergedFirstAndLastInt = onlyIntArr.map((arr) => +(arr[0] + arr[arr.length - 1]))

const sumOfCalibrationValue = mergedFirstAndLastInt.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

console.log(sumOfCalibrationValue)
const end = new Date().getTime();
console.log(`Execution time: ${end - start} ms`);