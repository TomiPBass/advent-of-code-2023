export type Set = { blue: number; red: number; green: number; }
export type Game = { id: number; sets: Set[]; }

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