import { input } from './input';

const start = new Date().getTime();
const testingInput = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

const testingInputSecondVariation = `....#........
.........#...
#............
.............
.............
........#....
.#...........
............#
.............
.............
.........#...
#....#.......`;

/*
    ....1........
    .........2...
    3............
    .............
    .............
    ........4....
    .5...........
    .##.........6
    ..##.........
    ...##........
    ....##...7...
    8....9.......
 */

const lines = input.split('\n');

function expandEmptySpace() {
    let allEmptyColumns: number[] = [];
    let allEmptyLines: number[] = [];

    // Get all empty lines
    allEmptyLines = lines
        .map((line, index) => {
            if (!line.split('').includes('#')) return index;
        })
        .filter((index) => index);

    // Get all empty columns
    for (let i = 0; i < lines.length; i++) {
        let empty = true;
        lines.forEach((line) => {
            if (line[i] === '#') {
                empty = false;
            }
        });
        if (empty) {
            allEmptyColumns.push(i);
        }
    }

    // Duplicate each empty line
    allEmptyLines.forEach((line, index) => {
        lines.splice(line + index, 0, '|'.repeat(lines[0].length));
    });

    // Duplicate each empty column
    lines.forEach((line, index) => {
        const lineArray = line.split('');
        allEmptyColumns.forEach((column, index) => {
            lineArray.splice(column + index, 0, '|');
        });
        lines[index] = lineArray.join('');
    });
    return [allEmptyColumns, allEmptyLines];
}

type GalaxyCoordinates = {
    galaxyId: number;
    coordinates: number[];
};

const [allEmptyColumns, allEmptyLines] = expandEmptySpace();

// Adjust the index of all the extra empty spaces
const [allEmptyColumns2, allEmptyLines2] = [allEmptyColumns, allEmptyLines].map(
    (array) => array.map((item, index) => item + index),
);

// Increase the number of empty spaces
const increase = 1000000;

// Find all galaxies
let idForGalaxy = 1;
const allGalaxiesCoordinates: GalaxyCoordinates[] = lines
    .map((line, lineIndex) => {
        return line
            .split('')
            .map((char, columnIndex) => {
                if (char === '#') {
                    const galaxyId = idForGalaxy;
                    idForGalaxy++;
                    const passedEmptyColumns = allEmptyColumns2.filter(
                        (column) => column < columnIndex,
                    ).length;
                    const newColumnIndex =
                        columnIndex +
                        // Incread without one to avoid counting the new current column
                        // Could be done without it but I don't have time to go re-do my previous steps.
                        // I have actuall work to do lol
                        passedEmptyColumns * (increase - 1) -
                        passedEmptyColumns;
                    const passedEmptyLines = allEmptyLines2.filter(
                        (line) => line < lineIndex,
                    ).length;
                    const newLideIndex =
                        lineIndex +
                        passedEmptyLines * (increase - 1) -
                        passedEmptyLines;
                    return {
                        galaxyId,
                        coordinates: [newLideIndex, newColumnIndex],
                    } as GalaxyCoordinates;
                }
            })
            .filter((galaxy) => galaxy);
    })
    .flat();

const shortestDistancesBetweenGalaxies: number[] = [];

// Find shortest distances between galaxies
for (let i = 1; i <= allGalaxiesCoordinates.length; i++) {
    const { coordinates: currentCoordinates } = allGalaxiesCoordinates[i - 1];
    const allGalaxiesToConnectTo = allGalaxiesCoordinates.filter(
        (galaxy) => galaxy.galaxyId > i,
    );
    allGalaxiesToConnectTo.forEach((galaxy) => {
        const { coordinates } = galaxy;
        const distance =
            Math.abs(currentCoordinates[0] - coordinates[0]) +
            Math.abs(currentCoordinates[1] - coordinates[1]);
        shortestDistancesBetweenGalaxies.push(distance);
    });
}

// Log result
console.log(shortestDistancesBetweenGalaxies.reduce((a, b) => a + b, 0));

const end = new Date().getTime();
console.log(`Execution time: ${end - start} ms`);
