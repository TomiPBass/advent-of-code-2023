
export type AxisPoint = [number, number];

export type SymbolData = {
    symbolAxisPoint: AxisPoint;
};

export const parseNumber = (index: number, arrayOfChars: string[]) => {
    let number: string = '';
    let nextStartingIndex: number = 0;
    for (let i = index; i < arrayOfChars.length; i++) {
        if (!isNaN(parseInt(arrayOfChars[i]))) {
            number += arrayOfChars[i];
        } else {
            nextStartingIndex = i;
            break;
        }
    }
    return { number, nextStartingIndex };
};