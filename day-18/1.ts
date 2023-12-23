import { input } from './input';
const testingInput = `R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`;

const inputLines = input.split('\n');
const diggingData: [string, number][] = inputLines.map((line) => {
    const [direction, distance, color] = line.split(' ');
    return [direction, parseInt(distance)];
});

const cubicMetersPath = [[0, 100, 'S']] as [number, number, string][];
diggingData.forEach((data, index) => {
    const [x, y] = cubicMetersPath[cubicMetersPath.length - 1];
    const nextDirection = diggingData[index + 1] ? diggingData[index + 1][0] : '';
    const [direction, distance] = data;
    for (let i = 1; i <= distance; i++) {
        if (x + i <= 0 && y + i <= 0) return;
        let symbol = '';
        if (direction === 'R' || direction === 'L') {
            symbol = '-';
            if (i === distance && direction === 'R' && nextDirection === 'U') symbol = 'J';
            if (i === distance && direction === 'R' && nextDirection === 'D') symbol = '7';
            if (i === distance && direction === 'L' && nextDirection === 'U') symbol = 'L';
            if (i === distance && direction === 'L' && nextDirection === 'D') symbol = 'F';
        }
        if (direction === 'U' || direction === 'D') {
            symbol = '|';
            if (i === distance && direction === 'U' && nextDirection === 'R') symbol = 'F';
            if (i === distance && direction === 'U' && nextDirection === 'L') symbol = '7';
            if (i === distance && direction === 'D' && nextDirection === 'R') symbol = 'L';
            if (i === distance && direction === 'D' && nextDirection === 'L') symbol = 'J';
        }

        if (direction === 'R') cubicMetersPath.push([x + i, y, symbol]);
        if (direction === 'L') cubicMetersPath.push([x - i, y, symbol]);
        if (direction === 'U') cubicMetersPath.push([x, y - i, symbol]);
        if (direction === 'D') cubicMetersPath.push([x, y + i, symbol]);
    }
});
cubicMetersPath.pop();

const lengthOfThePathLoop = cubicMetersPath.length;

const drawPathLoopInConsoleGrid = (path: [number, number, string][]) => {
    const grid = [];
    const lowestYValue = Math.min(...path.map(([, y]) => y));
    for (let i = lowestYValue; i < 540; i++) {
        const row = [];
        for (let j = 0; j < 540; j++) {
            row.push('.');
        }
        grid.push(row);
    }
    grid.forEach((row, i) => console.log(i));
    path.forEach(([x, y, symbol]) => {
        grid[y + lowestYValue][x] = symbol;
    });
    grid.forEach((row) => console.log(row.join('')));
};

// What I did for Day 18 Part 1 was to draw the path in a grid in a console. I then copied the output as a string into the Day 10 Part 2 input file and used that to calculate the number of cubic meters inside the loop.
// Than I just added the length of the loop and I got the right answer
// Fuck part 2, I'm not waiting for the end of the universe to solve that puzzle lol
console.log(lengthOfThePathLoop);
