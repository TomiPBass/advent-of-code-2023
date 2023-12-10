import { input } from './input';

const start = new Date().getTime();
const mapNames = [
    'seed-to-soil',
    'soil-to-fertilizer',
    'fertilizer-to-water',
    'water-to-light',
    'light-to-temperature',
    'temperature-to-humidity',
    'humidity-to-location',
] as const;

const lines = input.split('\n');

type MapName = (typeof mapNames)[number];

const findMapLines = (lines: string[], map: MapName) => {
    return lines.filter((line) => {
        let [startLineIndex, endLineIndex] = [0, 0];
        const indexOfProvidedMap = mapNames.indexOf(map);
        lines.forEach((line, index) => {
            if (line.includes(mapNames[indexOfProvidedMap]))
                startLineIndex = index + 1;
            if (mapNames[indexOfProvidedMap + 1]) {
                if (line.includes(mapNames[indexOfProvidedMap + 1]))
                    endLineIndex = index - 2;
            } else endLineIndex = lines.length - 1;
        });
        return (
            lines.indexOf(line) >= startLineIndex &&
            lines.indexOf(line) <= endLineIndex
        );
    });
};

const mapEachLine = (mapLine: string[]) => {
    return mapLine.map((line) => line.split(' ').map(Number));
};

const originalSeeds = lines[0].split(' ').slice(1).map(Number);

const parseInput = () => {
    const mapLines = mapNames.map((map) => findMapLines(lines, map));
    return {
        originalSeeds,
        ['seed-to-soil']: mapEachLine(mapLines[0]),
        ['soil-to-fertilizer']: mapEachLine(mapLines[1]),
        ['fertilizer-to-water']: mapEachLine(mapLines[2]),
        ['water-to-light']: mapEachLine(mapLines[3]),
        ['light-to-temperature']: mapEachLine(mapLines[4]),
        ['temperature-to-humidity']: mapEachLine(mapLines[5]),
        ['humidity-to-location']: mapEachLine(mapLines[6]),
    };
};

type Set = { seed: number; range: number };

const parsedInput = parseInput();
const parsedSeeds: Set[] = parsedInput.originalSeeds
    .map((seedNumber, index) => {
        const obj = {} as Set;
        if (index % 2 === 0) {
            obj.seed = seedNumber;
            obj.range = parsedInput.originalSeeds[index + 1];
            return obj;
        }
    })
    .filter((obj) => obj);

let parsedSeedIndex = 0;
let currentSeedMapping = parsedSeeds[0].seed;
let seedForMapping = parsedSeeds[0].seed;
let lowestMappedSeedYet: undefined | number = undefined;
let seedIteration = 0;
let mapItteration = 0;
let setToSetMap: [number, number] = [undefined, undefined];

const mapAllSets = (maps: number[][]) => {
    if (mapItteration === mapNames.length) return;
    maps.forEach((map) => {
        if (seedForMapping >= map[1] && seedForMapping <= map[1] + map[2] - 1) {
            setToSetMap = [seedForMapping, seedForMapping - map[1] + map[0]];
        }
    });
    if (setToSetMap.includes(undefined)) {
        setToSetMap = [seedForMapping, seedForMapping];
    }
    seedForMapping = setToSetMap[1];
    mapItteration++;
    mapAllSets(parsedInput[mapNames[mapItteration]]);
    if (
        seedForMapping < lowestMappedSeedYet ||
        lowestMappedSeedYet === undefined
    ) {
        lowestMappedSeedYet = seedForMapping;
    }
    if (mapItteration !== 0) {
        seedIteration++;
    }
    mapItteration = 0;
    setToSetMap = [undefined, undefined];
    return;
};

const mappingFunc = () => {
    mapAllSets(parsedInput[mapNames[mapItteration]]);
    while (
        parsedSeeds[parsedSeedIndex].seed + seedIteration <=
        parsedSeeds[parsedSeedIndex].seed +
            parsedSeeds[parsedSeedIndex].range -
            1
    ) {
        seedForMapping = currentSeedMapping + seedIteration;
        mapAllSets(parsedInput[mapNames[mapItteration]]);
    }
    parsedSeedIndex++;
    console.log('parsedSeedIndex', parsedSeedIndex);
    seedIteration = 0;
    if (parsedSeedIndex === parsedSeeds.length) return;
    else {
        seedForMapping = parsedSeeds[parsedSeedIndex].seed;
        currentSeedMapping = parsedSeeds[parsedSeedIndex].seed;
    }
    mappingFunc();
};

mappingFunc();

console.log('lowest number', lowestMappedSeedYet);

const end = new Date().getTime();
console.log(`Execution time: ${end - start} ms`);

// const firstIncorrectResult = `31555917`;
// const secondCorrectResult = `24261545`;
