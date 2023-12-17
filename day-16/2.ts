import { input } from './input';

const start = new Date().getTime();
const testingInput = `.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`;

let lines = input.split('\n');
const hight = lines.length;
const width = lines[0].length;
type Coordinates = { x: number; y: number };
type Tile = { symbol: string } & Coordinates;
type Beam = { direction: 'up' | 'down' | 'left' | 'right' } & Coordinates;
const tiles: Tile[] = [];

lines.forEach((line, lineIndex) => {
    line.split('').forEach((char, charIndex) => {
        tiles.push({
            symbol: char,
            x: charIndex,
            y: lineIndex,
        });
    });
});
lines = [];

let energizedTiles: [number, number][] = [];

let ongoingBeams: Beam[] = [];
let alreadyHitSplitters: Beam[] = [];
let countsOfLastEnergizedTiles: number[] = [];
function moveBeam(tileCoordinates: Coordinates, direction: 'up' | 'down' | 'left' | 'right') {
    ongoingBeams.push({ ...tileCoordinates, direction });
}

function fireBeam(startingBeam: Beam) {
    energizedTiles = [];
    ongoingBeams = [];
    alreadyHitSplitters = [];
    countsOfLastEnergizedTiles = [];
    const { x, y } = startingBeam;
    const startingTile = tiles.find((t) => t.x === x && t.y === y);
    if (!startingTile) return;
    let direction: 'up' | 'down' | 'left' | 'right' = startingBeam.direction;
    if (startingTile.symbol === '|') {
        if (startingBeam.direction === 'left' || startingBeam.direction === 'right') {
            direction = 'up';
            direction = 'down';
        }
    } else if (startingTile.symbol === '-') {
        if (startingBeam.direction === 'up' || startingBeam.direction === 'down') {
            direction = 'left';
            direction = 'right';
        }
    } else if (startingTile.symbol === '/') {
        if (startingBeam.direction === 'up') {
            direction = 'right';
        } else if (startingBeam.direction === 'down') {
            direction = 'left';
        } else if (startingBeam.direction === 'left') {
            direction = 'down';
        } else if (startingBeam.direction === 'right') {
            direction = 'up';
        }
    } else if (startingTile.symbol === '\\') {
        if (startingBeam.direction === 'up') {
            direction = 'left';
        } else if (startingBeam.direction === 'down') {
            direction = 'right';
        } else if (startingBeam.direction === 'left') {
            direction = 'up';
        } else if (startingBeam.direction === 'right') {
            direction = 'down';
        }
    }
    moveBeam({ x, y }, direction);
    while (ongoingBeams.length > 0) {
        ongoingBeams.forEach((beam, currentBeamIndex) => {
            if (!energizedTiles.some((t) => t[0] === beam.x && t[1] === beam.y)) energizedTiles.push([beam.x, beam.y]);
            ongoingBeams.splice(currentBeamIndex, 1);
            if (beam.direction === 'right') {
                const nextTile = tiles.find((t) => t.x === beam.x + 1 && t.y === beam.y);
                if (nextTile) {
                    const tileCoordinates: Coordinates = { x: nextTile.x, y: nextTile.y };
                    if (nextTile.symbol === '|') {
                        const alreadyHitDirections =
                            alreadyHitSplitters.filter((s) => s.x === nextTile.x && s.y === nextTile.y) || [];
                        if (!alreadyHitDirections.length || !alreadyHitDirections.find((s) => s.direction === 'up'))
                            moveBeam(tileCoordinates, 'up');
                        if (!alreadyHitDirections.length || !alreadyHitDirections.find((s) => s.direction === 'down'))
                            moveBeam(tileCoordinates, 'down');
                    } else if (nextTile.symbol === '/') {
                        moveBeam(tileCoordinates, 'up');
                    } else if (nextTile.symbol === '\\') {
                        moveBeam(tileCoordinates, 'down');
                    } else if (nextTile.symbol === '-') {
                        moveBeam(tileCoordinates, 'right');
                        alreadyHitSplitters.push({ ...nextTile, direction: 'right' });
                    } else if (nextTile.symbol === '.') {
                        moveBeam(tileCoordinates, 'right');
                    }
                }
            } else if (beam.direction === 'up') {
                const nextTile = tiles.find((t) => t.x === beam.x && t.y === beam.y - 1);
                if (nextTile) {
                    const tileCoordinates: Coordinates = { x: nextTile.x, y: nextTile.y };
                    if (nextTile.symbol === '-') {
                        const alreadyHitDirections =
                            alreadyHitSplitters.filter((s) => s.x === nextTile.x && s.y === nextTile.y) || [];
                        if (!alreadyHitDirections.length || !alreadyHitDirections.find((s) => s.direction === 'right'))
                            moveBeam(tileCoordinates, 'right');
                        if (!alreadyHitDirections.length || !alreadyHitDirections.find((s) => s.direction === 'left'))
                            moveBeam(tileCoordinates, 'left');
                    } else if (nextTile.symbol === '/') {
                        moveBeam(tileCoordinates, 'right');
                    } else if (nextTile.symbol === '\\') {
                        moveBeam(tileCoordinates, 'left');
                    } else if (nextTile.symbol === '|') {
                        moveBeam(tileCoordinates, 'up');
                        alreadyHitSplitters.push({ ...nextTile, direction: 'up' });
                    } else if (nextTile.symbol === '.') {
                        moveBeam(tileCoordinates, 'up');
                    }
                }
            } else if (beam.direction === 'down') {
                const nextTile = tiles.find((t) => t.x === beam.x && t.y === beam.y + 1);
                if (nextTile) {
                    const tileCoordinates: Coordinates = { x: nextTile.x, y: nextTile.y };
                    if (nextTile.symbol === '-') {
                        const alreadyHitDirections =
                            alreadyHitSplitters.filter((s) => s.x === nextTile.x && s.y === nextTile.y) || [];
                        if (!alreadyHitDirections.length || !alreadyHitDirections.find((s) => s.direction === 'right'))
                            moveBeam(tileCoordinates, 'right');
                        if (!alreadyHitDirections.length || !alreadyHitDirections.find((s) => s.direction === 'left'))
                            moveBeam(tileCoordinates, 'left');
                    } else if (nextTile.symbol === '/') {
                        moveBeam(tileCoordinates, 'left');
                    } else if (nextTile.symbol === '\\') {
                        moveBeam(tileCoordinates, 'right');
                    } else if (nextTile.symbol === '|') {
                        moveBeam(tileCoordinates, 'down');
                        alreadyHitSplitters.push({ ...nextTile, direction: 'down' });
                    } else if (nextTile.symbol === '.') {
                        moveBeam(tileCoordinates, 'down');
                    }
                }
            } else if (beam.direction === 'left') {
                const nextTile = tiles.find((t) => t.x === beam.x - 1 && t.y === beam.y);
                if (nextTile) {
                    const tileCoordinates: Coordinates = { x: nextTile.x, y: nextTile.y };
                    if (nextTile.symbol === '|') {
                        const alreadyHitDirections =
                            alreadyHitSplitters.filter((s) => s.x === nextTile.x && s.y === nextTile.y) || [];
                        if (!alreadyHitDirections.length || !alreadyHitDirections.find((s) => s.direction === 'up'))
                            moveBeam(tileCoordinates, 'up');
                        if (!alreadyHitDirections.length || !alreadyHitDirections.find((s) => s.direction === 'down'))
                            moveBeam(tileCoordinates, 'down');
                    } else if (nextTile.symbol === '/') {
                        moveBeam(tileCoordinates, 'down');
                    } else if (nextTile.symbol === '\\') {
                        moveBeam(tileCoordinates, 'up');
                    } else if (nextTile.symbol === '-') {
                        moveBeam(tileCoordinates, 'left');
                        alreadyHitSplitters.push({ ...nextTile, direction: 'left' });
                    } else if (nextTile.symbol === '.') {
                        moveBeam(tileCoordinates, 'left');
                    }
                }
            }
        });
        countsOfLastEnergizedTiles.push(energizedTiles.length);

        /*
            If this code doesn't return the correct result, it might be due to this limit of 100.
            
        */
        if (
            countsOfLastEnergizedTiles.length > 100 &&
            countsOfLastEnergizedTiles.slice(-100).reduce((a, b) => a + b, 0) ===
                countsOfLastEnergizedTiles[countsOfLastEnergizedTiles.length - 1] * 100
        )
            break;
    }
    return energizedTiles.length;
}

let itteration = 1;
let highestNumberSoFar: number = 0;

function executeBeam(startingPoint: Coordinates, direction: 'right' | 'left' | 'up' | 'down') {
    const count = fireBeam({ ...startingPoint, direction });
    if (count > highestNumberSoFar) highestNumberSoFar = count;
    console.log(itteration.toString(), count);
    itteration++;
}

console.log(`Process ends on ${width * 2 + hight * 2}...`);
tiles.forEach((tile) => {
    if (tile.x === 0 && tile.y === 0) {
        executeBeam({ x: 0, y: 0 }, 'right');
        executeBeam({ x: 0, y: 0 }, 'down');
    } else if (tile.x === 0 && tile.y === hight - 1) {
        executeBeam({ x: 0, y: hight - 1 }, 'right');
        executeBeam({ x: 0, y: hight - 1 }, 'up');
    } else if (tile.x === width - 1 && tile.y === 0) {
        executeBeam({ x: width - 1, y: 0 }, 'left');
        executeBeam({ x: width - 1, y: 0 }, 'down');
    } else if (tile.x === width - 1 && tile.y === hight - 1) {
        executeBeam({ x: width - 1, y: hight - 1 }, 'left');
        executeBeam({ x: width - 1, y: hight - 1 }, 'up');
    } else if (tile.x === 0) {
        executeBeam({ x: 0, y: tile.y }, 'right');
    } else if (tile.x === width - 1) {
        executeBeam({ x: width - 1, y: tile.y }, 'left');
    } else if (tile.y === 0) {
        executeBeam({ x: tile.x, y: 0 }, 'down');
    } else if (tile.y === hight - 1) {
        executeBeam({ x: tile.x, y: hight - 1 }, 'up');
    }
});

console.log('Highest number of energized tiles: ', highestNumberSoFar);

const end = new Date().getTime();
console.log('Execution time: ', end - start, 'ms');
