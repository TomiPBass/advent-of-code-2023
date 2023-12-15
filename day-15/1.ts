import { input } from './input';

const start = new Date().getTime();
const allHashes = input.split(',');

function processHashValue(hash: string) {
    const allCharacters = hash.split('');
    let value = 0;
    allCharacters.forEach((char) => {
        value += char.charCodeAt(0);
        value *= 17;
        value %= 256;
    });
    return value;
}

const allValues = allHashes.map(processHashValue);
const sumOfAllValues = allValues.reduce((acc, curr) => acc + curr, 0);

console.log('Sum of all values:', sumOfAllValues);

const end = new Date().getTime();
console.log(`Execution time: ${end - start} ms`);
