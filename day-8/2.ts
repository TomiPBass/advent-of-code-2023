import { input } from './input';

const start = new Date().getTime();

const testingInput = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

const testingInputTwo = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

const inputLines = input.split('\n');

type Element = {
    name: string;
    leftCoordinate: string;
    rightCoordinate: string;
};

type Map = {
    navigation: string;
    elements: Element[];
};

function createMap(input: string[]): Map {
    const navigation = input[0];
    input.shift();
    input.shift();
    return {
        navigation,
        elements: input.map((element) => {
            return {
                name: element.split(' = ')[0],
                leftCoordinate: element
                    .split(' = ')[1]
                    .split(', ')[0]
                    .split('(')[1],
                rightCoordinate: element
                    .split(' = ')[1]
                    .split(', ')[1]
                    .split(')')[0],
            };
        }),
    };
}

const travelStepsFromAtoAllFinalDestinations = (
    map: Map,
    startingPosition: string,
    finalDestinations: string[],
) => {
    const elements = map.elements;
    const navigation = map.navigation;
    let currentElement = elements.find(
        (element) => element.name === startingPosition,
    );
    let steps = 0;
    const stepsToFinalDestinations = [];
    let loopStart = '';
    let loopSteps = 0;
    const loopData = [];
    finalDestinations.forEach((finalDestination) => {
        steps = 0;
        while (currentElement.name !== finalDestination) {
            if (steps > 150000) break;
            const currentNavigation =
                steps > navigation.length - 1
                    ? navigation[steps % navigation.length]
                    : navigation[steps];
            if (currentNavigation === 'L') {
                currentElement = elements.find(
                    (element) => element.name === currentElement.leftCoordinate,
                );
            } else {
                currentElement = elements.find(
                    (element) =>
                        element.name === currentElement.rightCoordinate,
                );
            }
            steps++;
        }
        if (steps < 150000) {
            stepsToFinalDestinations.push(steps, finalDestination);
            loopStart = finalDestination;
            currentElement = elements.find((el) => el.name === loopStart);
            while (
                currentElement.name !== finalDestination ||
                loopSteps === 0
            ) {
                if (loopSteps > 150000) break;
                const currentNavigation =
                    loopSteps > navigation.length - 1
                        ? navigation[loopSteps % navigation.length]
                        : navigation[loopSteps];
                if (currentNavigation === 'L') {
                    currentElement = elements.find(
                        (element) =>
                            element.name === currentElement.leftCoordinate,
                    );
                } else {
                    currentElement = elements.find(
                        (element) =>
                            element.name === currentElement.rightCoordinate,
                    );
                }
                loopSteps++;
            }
            if (loopSteps < 150000) {
                loopData.push(loopSteps, loopStart);
            }
        }
    });
    return [stepsToFinalDestinations, loopData];
};

const map = createMap(inputLines);

const elemetsEndingWithA = map.elements.filter((element) =>
    element.name.endsWith('A'),
);
const elemetsEndingWithZ = map.elements.filter((element) =>
    element.name.endsWith('Z'),
);

const arrayOfStartingDistanceAndLoops = elemetsEndingWithA.map((element) =>
    travelStepsFromAtoAllFinalDestinations(
        map,
        element.name,
        elemetsEndingWithZ.map((el) => el.name),
    ),
);

const allLoopStepsSets = arrayOfStartingDistanceAndLoops
    .map((loops) => loops[1])
    .map((loop) => loop[0]);

function findLeastCommonMultiple(array: number[]) {
    const max = Math.max(...array);
    let multiple = max;
    while (true) {
        if (array.every((element) => multiple % element === 0)) {
            return multiple;
        }
        multiple += max;
    }
}

console.log('Final steps: ', findLeastCommonMultiple(allLoopStepsSets));

const end = new Date().getTime();
console.log('Execution time: ', end - start);
