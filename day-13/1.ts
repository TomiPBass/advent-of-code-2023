import { input } from './input';

const start = new Date().getTime();
const testingInput = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

const lines = input.split('\n');
const lineGrids: string[][] = [];
let lineGrid: string[] = [];
lines.forEach((line, index) => {
    if (lines[index].length) lineGrid.push(line);
    else {
        lineGrids.push(lineGrid);
        lineGrid = [];
    }
    if (index === lines.length - 1) lineGrids.push(lineGrid);
});

const columnGrids: string[][] = [];
let columnGrid: string[] = [];
lineGrids.forEach((lineGrid, girdIndex) => {
    for (let i = 0; i < lineGrid[0].length; i++) {
        let column = '';
        lineGrid.forEach((line, lineIndex) => {
            column += line.split('')[i];
        });
        columnGrid.push(column);
    }
    columnGrids.push(columnGrid);
    columnGrid = [];
});

const data = lineGrids.map((lineGrid, girdIndex) => {
    return {
        lineGrid,
        columnGrid: columnGrids[girdIndex],
    };
});

let total = 0;
function checkSymmetry(
    directionGrid: string[],
    direction: string,
    directionIndex: number,
    grid: 'lineGrid' | 'columnGrid',
): boolean {
    if (direction === directionGrid[directionIndex + 1]) {
        let symmetrical = true;
        let distanceFromCenter = 0;
        let stopCheck = false;
        while (!stopCheck) {
            const left = directionGrid[directionIndex - distanceFromCenter];
            const right = directionGrid[directionIndex + 1 + distanceFromCenter];
            if (left && right) {
                if (
                    directionGrid[directionIndex - distanceFromCenter] === directionGrid[directionIndex + 1 + distanceFromCenter]
                ) {
                    distanceFromCenter++;
                } else {
                    stopCheck = true;
                    symmetrical = false;
                }
            } else stopCheck = true;
        }
        if (symmetrical && grid === 'columnGrid') {
            total += directionIndex + 1;
            return true;
        } else if (symmetrical && grid === 'lineGrid') {
            total += (directionIndex + 1) * 100;
            return true;
        } else return false;
    }
}

data.forEach((grid) => {
    const { lineGrid, columnGrid } = grid;
    let isVerticallySymmetrical: boolean;
    columnGrid.forEach((column, columnIndex) => {
        isVerticallySymmetrical = checkSymmetry(columnGrid, column, columnIndex, 'columnGrid');
    });
    if (!isVerticallySymmetrical) {
        lineGrid.forEach((line, lineIndex) => {
            checkSymmetry(lineGrid, line, lineIndex, 'lineGrid');
        });
    }
});

console.log('Sum:', total);

const end = new Date().getTime();
console.log('Execution time: ', end - start);
