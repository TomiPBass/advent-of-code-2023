import { input } from './input';

const start = new Date().getTime();

const testingInput = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

const testingInputTwo = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

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

const travelStepsFromAtoZ = (
    map: Map,
    startingPosition: string,
    finalDestination: string,
) => {
    const elements = map.elements;
    const navigation = map.navigation;
    let currentElement = elements.find(
        (element) => element.name === startingPosition,
    );
    let steps = 0;
    while (currentElement.name !== finalDestination) {
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
                (element) => element.name === currentElement.rightCoordinate,
            );
        }
        steps++;
    }
    return steps;
};

const map = createMap(inputLines);
const steps = travelStepsFromAtoZ(map, 'AAA', 'ZZZ');
console.log('Steps: ', steps);

const end = new Date().getTime();
console.log('Execution time: ', end - start);
