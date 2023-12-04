import { inputDayTwo } from "./input.js";

type Set = { blue: number; red: number; green: number; }
const rules: Set = { blue: 14, red: 12, green: 13 };

type Game = { id: number; sets: Set[]; }

export const parseGameInput = (input: string): Game[] =>
    input.split('\n').map(gameString => {
        const [title, setString] = gameString.split(':');
        const id = +title.split(' ')[1];
        const sets = setString.split(';').map(set =>
            set.split(',').reduce((acc, subset) => {
                const [amount, color] = subset.trim().split(' ');
                acc[color] = +amount;
                return acc;
            }, {} as Set)
        );
        return { id, sets };
    });

export const sumAllTheIdsOfPossibleGames = (input: string, rules: Set): number =>
    parseGameInput(input)
        .filter(game => game.sets.every(set =>
            Object.entries(set).every(([color, amount]) => amount <= rules[color])
        ))
        .reduce((acc, game) => acc + game.id, 0);

console.log(sumAllTheIdsOfPossibleGames(inputDayTwo, rules));