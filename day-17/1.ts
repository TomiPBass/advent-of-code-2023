import { input } from './input';

const start = new Date().getTime();
const testingInput = `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`;

/*
2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533

2>>34^>>>1323
32v>>>35v5623
32552456v>>54
3446585845v52
4546657867v>6
14385987984v4
44578769877v6
36378779796v>
465496798688v
456467998645v
12246868655<v
25465488877v5
43226746555v>
*/

type Directions = 'up' | 'down' | 'left' | 'right' | 'none';

type Data = {
    direction: Directions;
    distance: number;
    stepsInDirection: number;
};

type Coordinates = { x: number; y: number; value: number };

type BlockData = Coordinates & {
    lowest: Data;
    backup?: Data;
    visited?: boolean;
};

type VisitedBlockData = BlockData & {
    visited: true;
};

const firstMap: Coordinates[] = testingInput
    .split('\n')
    .map((line, lineIndex) =>
        line.split('').map((char, charIndex) => {
            return { x: charIndex, y: lineIndex, value: parseInt(char) };
        }),
    )
    .flat();

const blocks: BlockData[] = [];
const visitedBlocks: VisitedBlockData[] = [];

firstMap.forEach((char) => {
    blocks.push({ ...char, lowest: { direction: 'none', distance: Infinity, stepsInDirection: 0 } });
});

blocks[0].lowest.distance = 0;

function checkBlockData(block: BlockData) {
    const unvisitedNeighbours = blocks
        .map((neighbour, index) => {
            if (neighbour.x === block.x + 1 && neighbour.y === block.y && !neighbour.visited)
                return { block: neighbour, direction: 'right' as Directions, index };
            if (neighbour.x === block.x - 1 && neighbour.y === block.y && !neighbour.visited)
                return { block: neighbour, direction: 'left' as Directions, index };
            if (neighbour.x === block.x && neighbour.y === block.y + 1 && !neighbour.visited)
                return { block: neighbour, direction: 'down' as Directions, index };
            if (neighbour.x === block.x && neighbour.y === block.y - 1 && !neighbour.visited)
                return { block: neighbour, direction: 'up' as Directions, index };
        })
        .filter((neighbour) => neighbour);
    unvisitedNeighbours.forEach((neighbour) => {
        const isSameDirecitonAsLowest = neighbour.direction === block.lowest.direction;
        const cantUseLowest = isSameDirecitonAsLowest && block.lowest.stepsInDirection === 3;

        const distance = cantUseLowest
            ? block.backup.distance + neighbour.block.value
            : block.lowest.distance + neighbour.block.value;
        const direction = neighbour.direction;
        const stepsInDirection = cantUseLowest ? 1 : isSameDirecitonAsLowest ? block.lowest.stepsInDirection + 1 : 1;

        // If the direction of neigbour was already used 3 times for the lowest value
        if (cantUseLowest) {
            // If the distance is lower than the current lowest distance
            if (
                distance < neighbour.block.lowest.distance ||
                (distance === neighbour.block.lowest.distance && stepsInDirection < neighbour.block.lowest.stepsInDirection)
            ) {
                blocks[neighbour.index].lowest = { distance, direction, stepsInDirection };
            }
            // Else, if the distance is lower than the current backup distance or there is no backup
            else if (
                !neighbour.block.backup ||
                distance < neighbour.block.backup?.distance ||
                (distance === neighbour.block.backup?.distance && stepsInDirection < neighbour.block.backup?.stepsInDirection)
            ) {
                blocks[neighbour.index].backup = { distance, direction, stepsInDirection };
            }
        } else {
            if (stepsInDirection > 3) console.log('ERROR', block);
            if (
                distance < neighbour.block.lowest.distance ||
                (distance === neighbour.block.lowest.distance && stepsInDirection < neighbour.block.lowest.stepsInDirection)
            ) {
                // If the distance of the lowest is now 3 steps long
                if (stepsInDirection === 3) blocks[neighbour.index].backup = neighbour.block.lowest;
                blocks[neighbour.index].lowest = { distance, direction, stepsInDirection };
            } else if (
                !neighbour.block.backup ||
                distance < neighbour.block.backup?.distance ||
                (distance === neighbour.block.backup?.distance && stepsInDirection < neighbour.block.backup?.stepsInDirection)
            ) {
                blocks[neighbour.index].backup = { distance, direction, stepsInDirection };
            }
        }
    });
    visitedBlocks.push({ ...block, visited: true });
}

let relativeDistanceFromStart = 0;
while (blocks.length > 0) {
    const blocksToCheck = blocks.filter((block) => block.x <= relativeDistanceFromStart && block.y <= relativeDistanceFromStart);
    blocksToCheck.sort((a, b) => a.lowest.distance - b.lowest.distance);
    blocksToCheck.forEach((block) => {
        checkBlockData(block);
    });
    blocksToCheck.forEach((block) => {
        const index = blocks.indexOf(block);
        blocks.splice(index, 1);
    });

    relativeDistanceFromStart++;
}
console.log(visitedBlocks);
console.log(
    visitedBlocks.find(
        (block) => block.x === testingInput.split('\n')[0].length - 1 && block.y === testingInput.split('\n').length - 1,
    ),
);
const end = new Date().getTime();
console.log(`Execution time: ${end - start} ms`);
