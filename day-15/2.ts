import { input } from './input';

const start = new Date().getTime();
const allHashes = input.split(',');

function HASH(hash: string) {
    const allCharacters = hash.split('');
    let value = 0;
    allCharacters.forEach((char) => {
        value += char.charCodeAt(0);
        value *= 17;
        value %= 256;
    });
    return value;
}

type Hash = {
    box: number;
    label: string;
};

type InsertHash = Hash & {
    value: number;
};

type ExtractHash = Hash;

const hashMap: (InsertHash | ExtractHash)[] = allHashes.map((hash) => {
    if (hash.includes('-')) {
        const label = hash.split('-');
        return {
            box: HASH(label[0]),
            label: label[0],
        };
    } else if (hash.includes('=')) {
        const label = hash.split('=');
        return {
            box: HASH(label[0]),
            label: label[0],
            value: +label[1],
        };
    } else throw new Error('Invalid hash');
});

const boxes: any[][] = new Array(256).fill([]);

hashMap.forEach((hash) => {
    if ('value' in hash) {
        if (boxes[hash.box].length === 0) {
            boxes[hash.box] = [[hash.label, hash.value]];
        } else if (boxes[hash.box].find((box) => box[0] === hash.label)) {
            const index = boxes[hash.box].findIndex((box) => box[0] === hash.label);
            boxes[hash.box][index][1] = hash.value;
        } else {
            boxes[hash.box].push([hash.label, hash.value]);
        }
    } else {
        if (boxes[hash.box].find((box) => box[0] === hash.label)) {
            const index = boxes[hash.box].findIndex((box) => box[0] === hash.label);
            boxes[hash.box].splice(index, 1);
        }
    }
});

function calculateTotalValue() {
    let value = 0;
    boxes.forEach((box, index) => {
        box.forEach((lens, lensPosition) => {
            const boxValue = (1 + index) * (1 + lensPosition) * lens[1];
            value += boxValue;
        });
    });
    return value;
}
console.log(calculateTotalValue());

const end = new Date().getTime();
console.log(`Execution time: ${end - start} ms`);
