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
        lines.splice(line + index, 0, lines[line + index]);
    });

    // Duplicate each empty column
    lines.forEach((line, index) => {
        const lineArray = line.split('');
        allEmptyColumns.forEach((column, index) => {
            lineArray.splice(column + index, 0, '.');
        });
        lines[index] = lineArray.join('');
    });
}

type GalaxyCoordinates = {
    galaxyId: number;
    coordinates: number[];
};

expandEmptySpace();

// Find all galaxies
let idForGalaxy = 1;
const allGalaxiesCoordinates: GalaxyCoordinates[] = lines
    .map((line, lineIndex) => {
        return line
            .split('')
            .map((char, charIndex) => {
                if (char === '#') {
                    const galaxyId = idForGalaxy;
                    idForGalaxy++;
                    return {
                        galaxyId,
                        coordinates: [lineIndex, charIndex],
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
