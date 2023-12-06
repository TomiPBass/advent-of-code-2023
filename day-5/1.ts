import { input } from './input';

export const testingInput = `seeds: 79 80 81 82 83 84 85 86 87 88 89 90 91 92 55 56 57 58 59 60 61 62 63 64 65 66 67 

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

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

const lines = testingInput.split('\n');

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

const parseInput = () => {
    const seeds = lines[0].split(' ').slice(1).map(Number);
    const mapLines = mapNames.map((map) => findMapLines(lines, map));
    return {
        seeds,
        ['seed-to-soil']: mapEachLine(mapLines[0]),
        ['soil-to-fertilizer']: mapEachLine(mapLines[1]),
        ['fertilizer-to-water']: mapEachLine(mapLines[2]),
        ['water-to-light']: mapEachLine(mapLines[3]),
        ['light-to-temperature']: mapEachLine(mapLines[4]),
        ['temperature-to-humidity']: mapEachLine(mapLines[5]),
        ['humidity-to-location']: mapEachLine(mapLines[6]),
    };
};

const parsedInput = parseInput();
let currentSet = parsedInput.seeds;
let itteration = 0;

const mapAllSets = (maps: number[][]) => {
    if (itteration === mapNames.length) return;
    let setToSetMap: [number, number][] = [];
    currentSet.forEach((seed, index) => {
        maps.forEach((map) => {
            if (seed >= map[1] && seed <= map[1] + map[2] - 1) {
                setToSetMap.push([seed, seed - map[1] + map[0]]);
            }
        });
        if (setToSetMap[index] === undefined) {
            setToSetMap.push([seed, seed]);
        }
    });
    currentSet = setToSetMap.map((map) => map[1]);
    itteration++;
    mapAllSets(parsedInput[mapNames[itteration]]);
    return currentSet;
};

export const lastMap = mapAllSets(parsedInput[mapNames[itteration]]);
const lowestNumber = Math.min(...lastMap);
// console.log('lowest number', lowestNumber);

const end = new Date().getTime();
// console.log(`Execution time: ${end - start} ms`);
