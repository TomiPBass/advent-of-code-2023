import { input } from './input';

const start = new Date().getTime();
const testingInput = `-L|F7
7S-7|
L|7||
-L-J|
L|-JF`;

const testingInputTwo = `7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ`;

const lines = input.split('\n');

type PipeKindNames = 'L' | 'F' | '7' | 'J' | '|' | '-' | '.';
type Directions = 'up' | 'down' | 'left' | 'right';

type Pipe = {
    name: PipeKindNames;
    directions: Directions[];
};

const pipes: Pipe[] = [
    {
        name: 'L',
        directions: ['up', 'right'],
    },
    {
        name: 'F',
        directions: ['right', 'down'],
    },
    {
        name: '7',
        directions: ['down', 'left'],
    },
    {
        name: 'J',
        directions: ['up', 'left'],
    },
    {
        name: '|',
        directions: ['up', 'down'],
    },
    {
        name: '-',
        directions: ['left', 'right'],
    },
    {
        name: '.',
        directions: [],
    },
];

const [startingLine, startingColumn]: [number, number] = [
    lines.findIndex((line) => line.includes('S')),
    lines.find((line) => line.includes('S')).indexOf('S'),
];

const findPipe = (options?: {
    coordinates?: [number, number];
    name?: PipeKindNames;
}) => {
    if (options?.coordinates)
        return pipes.find(
            (pipe) =>
                pipe.name ===
                lines[options.coordinates[0]][options.coordinates[1]],
        );
    if (options?.name) return pipes.find((pipe) => pipe.name === options.name);
};

const includesDirection = (
    pipe: Pipe,
    directions: Directions | Directions[],
) => {
    if (typeof directions === 'string') {
        return pipe.directions.includes(directions);
    }
    return directions.some((direction) => pipe.directions.includes(direction));
};

const findStartingPipeKind = () => {
    const leftPipe = findPipe({
        coordinates: [startingLine, startingColumn - 1],
    });
    const rightPipe = findPipe({
        coordinates: [startingLine, startingColumn + 1],
    });
    const upPipe = findPipe({
        coordinates: [startingLine - 1, startingColumn],
    });
    const downPipe = findPipe({
        coordinates: [startingLine + 1, startingColumn],
    });
    if (leftPipe && includesDirection(leftPipe, 'right')) {
        if (rightPipe && includesDirection(rightPipe, 'left'))
            return findPipe({ name: '-' });
        if (upPipe && includesDirection(upPipe, 'down'))
            return findPipe({ name: 'J' });
        if (downPipe && includesDirection(downPipe, 'up'))
            return findPipe({ name: '7' });
    } else if (rightPipe && includesDirection(rightPipe, 'left')) {
        if (upPipe && includesDirection(upPipe, 'down'))
            return findPipe({ name: 'L' });
        if (downPipe && includesDirection(downPipe, 'up'))
            return findPipe({ name: 'F' });
    } else return findPipe({ name: '|' });
};

type TravelDirections = {
    pipe: Pipe;
    line: number;
    column: number;
    previousDirection?: Directions;
};

const startingPipe: TravelDirections = {
    pipe: findStartingPipeKind(),
    line: startingLine,
    column: startingColumn,
};

/*
    7-F7-
    .FJ|7
    SJLL7
    |F--J
    LJ.LJ
*/

const findNextPipe = (directions: TravelDirections): TravelDirections => {
    let { pipe: currentPipe, line, column, previousDirection } = directions;
    let directionToGo = !previousDirection
        ? currentPipe.directions[0]
        : currentPipe.directions.find((dir) => dir !== previousDirection);

    switch (directionToGo) {
        case 'up':
            line--;
            break;
        case 'down':
            line++;
            break;
        case 'left':
            column--;
            break;
        case 'right':
            column++;
            break;
    }
    let nextPreviousDirection: Directions;
    if (directionToGo === 'up') nextPreviousDirection = 'down';
    if (directionToGo === 'down') nextPreviousDirection = 'up';
    if (directionToGo === 'left') nextPreviousDirection = 'right';
    if (directionToGo === 'right') nextPreviousDirection = 'left';
    const nextPipe = findPipe({ coordinates: [line, column] });
    return {
        pipe: nextPipe,
        line,
        column,
        previousDirection: nextPreviousDirection,
    };
};

const travel = (startingPipe: TravelDirections) => {
    let numberOfPipesTraveled = 0;
    let currentPipe: TravelDirections = startingPipe;
    while (
        currentPipe.line !== startingPipe.line ||
        currentPipe.column !== startingPipe.column ||
        numberOfPipesTraveled === 0
    ) {
        currentPipe = findNextPipe({
            ...currentPipe,
            previousDirection: currentPipe.previousDirection,
        });
        numberOfPipesTraveled++;
    }
    return numberOfPipesTraveled;
};

console.log('Halfpoint of the journey: ', travel(startingPipe) / 2);

const end = new Date().getTime();
console.log(`Execution time: ${end - start} ms`);
