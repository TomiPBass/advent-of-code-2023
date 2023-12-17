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

const lines = input.split('\n');
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

const energizedTiles: Coordinates[] = [];

function redrawOriginalInput() {
    let output = '';
    tiles.forEach((tile) => {
        const isTileEnergized = energizedTiles.find((t) => t.x === tile.x && t.y === tile.y);
        if (isTileEnergized) output += '0';
        else output += tile.symbol;
        if (tile.x === lines[0].length - 1) {
            output += '\n';
        }
    });
    console.log(output);
}

const ongoingBeams: Beam[] = [];
const alreadyHitSplitters: Beam[] = [];
const countsOfLastEnergizedTiles: number[] = [];
function moveBeam(tileCoordinates: Coordinates, direction: 'up' | 'down' | 'left' | 'right') {
    ongoingBeams.push({ ...tileCoordinates, direction });
}

function fireBeam(startingBeam: Beam) {
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
            if (!energizedTiles.some((t) => t.x === beam.x && t.y === beam.y)) energizedTiles.push({ x: beam.x, y: beam.y });
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
        if (
            countsOfLastEnergizedTiles.length > 20 &&
            countsOfLastEnergizedTiles.slice(-20).reduce((a, b) => a + b, 0) ===
                countsOfLastEnergizedTiles[countsOfLastEnergizedTiles.length - 1] * 10
        )
            break;
    }
}

fireBeam({ x: 0, y: 0, direction: 'right' });
redrawOriginalInput();
console.log('Number of energized tiles: ', energizedTiles.length);

const end = new Date().getTime();
console.log('Execution time: ', end - start, 'ms');
