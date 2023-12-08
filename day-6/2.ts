import { input } from './input';

const start = new Date().getTime();
const testingInput = `
Time:      7  15   30
Distance:  9  40  200
`;

const inputLines = testingInput.split('\n').filter((line) => line);
const races = {
    durationOfRace: +inputLines[0].split(/\s+/).slice(1).join(''),
    recordDistance: +inputLines[1].split(/\s+/).slice(1).join(''),
};
const numberOfFastestWays = [];

const raceBestTimes = [];
const duration = races.durationOfRace;
const recordDistance = races.recordDistance;
const buttonHoldLengths = Array.from(
    { length: duration + 1 },
    (_, index) => index,
);
for (let boatSpeed = 0; boatSpeed < buttonHoldLengths.length; boatSpeed++) {
    const timeLeft = duration - boatSpeed;
    const myDistance = boatSpeed * timeLeft;
    if (myDistance > recordDistance) {
        raceBestTimes.push(boatSpeed);
    }
}
numberOfFastestWays.push(raceBestTimes.length);

console.log(numberOfFastestWays.reduce((a, b) => a * b, 1));

const end = new Date().getTime();
console.log(`Execution time: ${end - start} ms`);
