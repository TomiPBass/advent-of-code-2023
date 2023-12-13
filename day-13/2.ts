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

/*
#.##..##.
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
#....#..#`
 */

let total = 0;
data.forEach((grid) => {
    let originalTotal = total;
    const { lineGrid, columnGrid } = grid;
    let isNearlyVerticallySymmetrical: boolean = false;
    columnGrid.forEach((column, columnIndex) => {
        let isNearlySymmetrical = false;
        let distanceFromCenter = 0;
        let stopCheck = false;
        while (!stopCheck) {
            const left = columnGrid[columnIndex - distanceFromCenter];
            const right = columnGrid[columnIndex + 1 + distanceFromCenter];
            if (left && right) {
                // If the left and right are the same, keep checking
                if (left === right) {
                    distanceFromCenter++;
                } else {
                    // If they are not the same, check if they are nearly the same
                    let differentNodes: number = 0;
                    const leftNodes = left.split('');
                    const rightNodes = right.split('');
                    leftNodes.forEach((node, nodeIndex) => {
                        if (node !== rightNodes[nodeIndex]) differentNodes++;
                    });
                    if (differentNodes === 1 && !isNearlySymmetrical) {
                        // If they are nearly the same, mark as nearly symmetrical and keep checking
                        isNearlySymmetrical = true;
                        distanceFromCenter++;
                    } else if (differentNodes === 1 && isNearlySymmetrical) {
                        // If they are nearly the same and already marked as nearly symmetrical,
                        // mark as not nearly symmetrical and stop checking
                        isNearlySymmetrical = false;
                        stopCheck = true;
                    } else {
                        isNearlySymmetrical = false;
                        stopCheck = true;
                    }
                }
            } else stopCheck = true;
        }
        if (isNearlySymmetrical) {
            total += columnIndex + 1;
            isNearlyVerticallySymmetrical = true;
        }
    });
    if (!isNearlyVerticallySymmetrical) {
        lineGrid.forEach((line, lineIndex) => {
            let isNearlySymmetrical = false;
            let distanceFromCenter = 0;
            let stopCheck = false;
            while (!stopCheck) {
                const left = lineGrid[lineIndex - distanceFromCenter];
                const right = lineGrid[lineIndex + 1 + distanceFromCenter];
                if (left && right) {
                    // If the left and right are the same, keep checking
                    if (left === right) {
                        distanceFromCenter++;
                    } else {
                        // If they are not the same, check if they are nearly the same
                        let differentNodes: number = 0;
                        const leftNodes = left.split('');
                        const rightNodes = right.split('');
                        leftNodes.forEach((node, nodeIndex) => {
                            if (node !== rightNodes[nodeIndex]) differentNodes++;
                        });
                        if (differentNodes === 1 && !isNearlySymmetrical) {
                            // If they are nearly the same, mark as nearly symmetrical and keep checking
                            isNearlySymmetrical = true;
                            distanceFromCenter++;
                        } else if (differentNodes === 1 && isNearlySymmetrical) {
                            // If they are nearly the same and already marked as nearly symmetrical,
                            // mark as not nearly symmetrical and stop checking
                            isNearlySymmetrical = false;
                            stopCheck = true;
                        } else {
                            isNearlySymmetrical = false;
                            stopCheck = true;
                        }
                    }
                } else stopCheck = true;
            }
            if (isNearlySymmetrical) {
                total += (lineIndex + 1) * 100;
            }
        });
    }
    console.log(total - originalTotal);
});

console.log('Sum:', total);

const end = new Date().getTime();
console.log('Execution time: ', end - start);
