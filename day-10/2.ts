import { input } from './input';

const start = new Date().getTime();
const testingInput = `...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........`;

const testingInputTwo = `FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L`;

const testingInputThree = `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.y
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`;

const lines = input.split('\n');

type PipeKindNames = 'L' | 'F' | '7' | 'J' | '|' | '-' | '.' | 'S';
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
    {
        name: 'S',
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
    if (options?.coordinates) {
        const pipe = pipes.find(
            (pipe) =>
                pipe.name ===
                lines[options.coordinates[0]]?.[options.coordinates[1]],
        );
        if (pipe?.name === 'S')
            return { name: 'F', directions: pipe?.directions } as Pipe;
        else return pipe;
    }

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

const allPipesOnLoop: TravelDirections[] = [];

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
        allPipesOnLoop.push(currentPipe);
        numberOfPipesTraveled++;
    }
    return numberOfPipesTraveled;
};

console.log('Halfpoint of the journey: ', travel(startingPipe) / 2);

const whileLoopAction = (
    currentPipe: Pipe,
    options: {
        direction: Directions;
        singleWall: PipeKindNames;
        directionWall: PipeKindNames;
        startingCorners: [PipeKindNames, PipeKindNames];
        endingCorners: [PipeKindNames, PipeKindNames];
        lastCornerDirection?: Directions;
    },
): number | Directions => {
    const {
        direction: optionsDirection,
        directionWall,
        endingCorners,
        singleWall,
        startingCorners,
        lastCornerDirection,
    } = options;
    if (currentPipe.name === singleWall) {
        return 1;
    }
    if (currentPipe.name === startingCorners[0]) {
        const direction =
            optionsDirection === 'up'
                ? 'right'
                : optionsDirection === 'right'
                  ? 'down'
                  : optionsDirection === 'down'
                    ? 'left'
                    : 'up';
        return direction;
    } else if (currentPipe.name === startingCorners[1]) {
        const direction =
            optionsDirection === 'up'
                ? 'left'
                : optionsDirection === 'right'
                  ? 'up'
                  : optionsDirection === 'down'
                    ? 'right'
                    : 'down';
        return direction;
    } else if (currentPipe.name === directionWall) {
        return 0;
    } else if (currentPipe.name === endingCorners[0]) {
        const direction =
            optionsDirection === 'up'
                ? 'right'
                : optionsDirection === 'right'
                  ? 'down'
                  : optionsDirection === 'down'
                    ? 'left'
                    : 'up';
        const secondDirection =
            optionsDirection === 'up'
                ? 'left'
                : optionsDirection === 'right'
                  ? 'up'
                  : optionsDirection === 'down'
                    ? 'right'
                    : 'down';
        if (lastCornerDirection === direction) return 0;
        if (lastCornerDirection === secondDirection) return 1;
    } else if (currentPipe.name === endingCorners[1]) {
        const direction =
            optionsDirection === 'up'
                ? 'left'
                : optionsDirection === 'right'
                  ? 'up'
                  : optionsDirection === 'down'
                    ? 'right'
                    : 'down';
        const secondDirection =
            optionsDirection === 'up'
                ? 'right'
                : optionsDirection === 'right'
                  ? 'down'
                  : optionsDirection === 'down'
                    ? 'left'
                    : 'up';
        if (lastCornerDirection === direction) return 0;
        if (lastCornerDirection === secondDirection) return 1;
    }
};
/*
            ...........
            .S-------7.
            .|F-----7|.
            .||OOOOO||.
            .||OOOOO||.
            .|L-7OF-J|.
            .|II|O|II|.
            .L--JOL--J.
            .....O.....
*/
const travelAllTheWay = (
    direction: Directions,
    lineIndex: number,
    columnIndex: number,
) => {
    let numberOfHitWalls = 0;
    let currentLine = lineIndex;
    let currentColumn = columnIndex;
    let currentPipe = findPipe({
        coordinates: [currentLine, currentColumn],
    });
    let currentIndex: number;
    let lastCornerDirection: Directions;
    let edge: number;
    if (direction === 'up') {
        currentIndex = currentLine;
        edge = 0;
    }
    if (direction === 'down') {
        currentIndex = currentLine;
        edge = lines.length - 1;
    }
    if (direction === 'left') {
        currentIndex = currentColumn;
        edge = 0;
    }
    if (direction === 'right') {
        currentIndex = currentColumn;
        edge = lines[0].length - 1;
    }
    const whileCondition = () => {
        if (direction === 'up') return currentIndex >= edge;
        if (direction === 'down') return currentIndex <= edge;
        if (direction === 'left') return currentIndex >= edge;
        if (direction === 'right') return currentIndex <= edge;
    };
    while (whileCondition()) {
        let result: number | Directions;
        let isOnALoop: boolean;
        if (direction === 'right') {
            currentIndex++;
            currentPipe = findPipe({
                coordinates: [currentLine, currentIndex],
            });
            isOnALoop = allPipesOnLoop.some(
                (pipe) =>
                    pipe.column === currentIndex && pipe.line === currentLine,
            );
            if (currentPipe && isOnALoop)
                result = whileLoopAction(currentPipe, {
                    direction,
                    singleWall: '|',
                    directionWall: '-',
                    startingCorners: ['F', 'L'],
                    endingCorners: ['7', 'J'],
                    lastCornerDirection,
                });
        }
        if (direction === 'left') {
            currentIndex--;
            currentPipe = findPipe({
                coordinates: [currentLine, currentIndex],
            });
            isOnALoop = allPipesOnLoop.some(
                (pipe) =>
                    pipe.column === currentIndex && pipe.line === currentLine,
            );
            if (currentPipe && isOnALoop)
                result = whileLoopAction(currentPipe, {
                    direction,
                    singleWall: '|',
                    directionWall: '-',
                    startingCorners: ['J', '7'],
                    endingCorners: ['L', 'F'],
                    lastCornerDirection,
                });
        }
        if (direction === 'up') {
            currentIndex--;
            currentPipe = findPipe({
                coordinates: [currentIndex, currentColumn],
            });
            isOnALoop = allPipesOnLoop.some(
                (pipe) =>
                    pipe.line === currentIndex && pipe.column === currentColumn,
            );
            if (currentPipe && isOnALoop)
                result = whileLoopAction(currentPipe, {
                    direction,
                    singleWall: '-',
                    directionWall: '|',
                    startingCorners: ['L', 'J'],
                    endingCorners: ['F', '7'],
                    lastCornerDirection,
                });
        }
        if (direction === 'down') {
            currentIndex++;
            currentPipe = findPipe({
                coordinates: [currentIndex, currentColumn],
            });
            isOnALoop = allPipesOnLoop.some(
                (pipe) =>
                    pipe.line === currentIndex && pipe.column === currentColumn,
            );
            if (currentPipe && isOnALoop)
                result = whileLoopAction(currentPipe, {
                    direction,
                    singleWall: '-',
                    directionWall: '|',
                    startingCorners: ['F', '7'],
                    endingCorners: ['L', 'J'],
                    lastCornerDirection,
                });
        }
        if (result) {
            if (typeof result === 'string') lastCornerDirection = result;
            else numberOfHitWalls += result;
        }
    }
    return numberOfHitWalls;
};

const tilesInsideTheLoop: [number, number][] = [];
const findTilesInsideTheLoop = () => {
    lines.forEach((line, lineIndex) => {
        line.split('').forEach((tile, columnIndex) => {
            let isInsideTheLoop: boolean = true;
            const isPartOfTheLoop = allPipesOnLoop.some(
                (pipe) =>
                    pipe.line === lineIndex && pipe.column === columnIndex,
            );
            if (isPartOfTheLoop) isInsideTheLoop = false;
            else {
                const numberOfHitWallsRight = travelAllTheWay(
                    'right',
                    lineIndex,
                    columnIndex,
                );
                if (numberOfHitWallsRight === 0) isInsideTheLoop = false;
                else if (numberOfHitWallsRight % 2 === 1)
                    isInsideTheLoop = true;
                else {
                    const numberOfHitWallsLeft = travelAllTheWay(
                        'left',
                        lineIndex,
                        columnIndex,
                    );
                    if (numberOfHitWallsLeft === 0) isInsideTheLoop = false;
                    else if (numberOfHitWallsLeft % 2 === 1)
                        isInsideTheLoop = true;
                    else {
                        const numberOfHitWallsUp = travelAllTheWay(
                            'up',
                            lineIndex,
                            columnIndex,
                        );
                        if (numberOfHitWallsUp === 0) isInsideTheLoop = false;
                        else if (numberOfHitWallsUp % 2 === 1)
                            isInsideTheLoop = true;
                        else {
                            const numberOfHitWallsDown = travelAllTheWay(
                                'down',
                                lineIndex,
                                columnIndex,
                            );
                            if (numberOfHitWallsDown === 0)
                                isInsideTheLoop = false;
                            else if (numberOfHitWallsDown % 2 === 1)
                                isInsideTheLoop = true;
                            else isInsideTheLoop = false;
                        }
                    }
                }
            }
            if (isInsideTheLoop) {
                tilesInsideTheLoop.push([lineIndex, columnIndex]);
            }
        });
    });
};

findTilesInsideTheLoop();
console.log(tilesInsideTheLoop.length);

const end = new Date().getTime();
console.log(`Execution time: ${end - start} ms`);
