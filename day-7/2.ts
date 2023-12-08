import { input } from './input';

const start = new Date().getTime();
interface Hand {
    cards: string;
    bid: number;
    strength?: number;
    actualStrength?: number;
}

const testingInput = `2345A 1
Q2KJJ 13
Q2Q2Q 19
T3T3J 17
T3Q33 11
2345J 3
J345A 2
32T3K 5
T55J5 29
KK677 7
KTJJT 34
QQQJA 31
JJJJJ 37
JAAAA 43
AAAAJ 59
AAAAA 61
2AAAA 23
2JJJJ 53
JJJJ2 41`;

const cStrs = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T', 'Q', 'K', 'A'];
const strength = [
    'High card',
    'One pair',
    'Two pairs',
    'Three of a kind',
    'Full house',
    'Four of a kind',
    'Five of a kind',
];

const hasNumberOfCards = (
    hand: Hand,
    count: number,
    options?: {
        numberOfCouts?: number;
        fullHouse?: boolean;
    },
) => {
    let numberOfCountsForUse = options?.numberOfCouts || 1;
    const cardsInHand = hand.cards.split('');
    const sets = [];
    cardsInHand.forEach((card) => {
        if (!sets.includes(card))
            cardsInHand.filter((c) => c === card).length === count &&
                sets.push(card);
    });
    if (!cardsInHand.includes('J')) {
        if (sets.length === numberOfCountsForUse) {
            return true;
        } else return false;
    } else {
        // K3KJJ - Full house??
        const obj = { highestCount: 0, numberHighestOfCounts: 0, card: [] };
        cardsInHand.forEach((a) => {
            const currentCount = cardsInHand.filter((c) => c === a).length;
            if (obj.highestCount === currentCount) {
                if (!obj.card.includes(a)) {
                    obj.numberHighestOfCounts++;
                    obj.card.push(a);
                }
            }
            if (currentCount > obj.highestCount) {
                obj.highestCount = currentCount;
                obj.numberHighestOfCounts = 1;
                obj.card = [];
                obj.card.push(a);
            }
        });
        const numberOfJokers = cardsInHand.filter((c) => c === 'J').length;
        let finalCount = numberOfJokers + obj.highestCount;
        if (numberOfJokers < obj.highestCount)
            finalCount = obj.highestCount + numberOfJokers;
        else if (numberOfJokers >= 2) {
            const otherCards = cardsInHand.filter((c) => c !== 'J');
            if (
                otherCards.length === 0 ||
                otherCards.length === 1 ||
                (otherCards.length === 2 && otherCards[0] === otherCards[1])
            )
                finalCount = 5;
            else if (otherCards.length === 2 && otherCards[0] !== otherCards[1])
                finalCount = 4;
            else if (otherCards.length === 3) {
                if (
                    otherCards[0] === otherCards[1] &&
                    otherCards[1] === otherCards[2]
                )
                    finalCount = 5;
                else if (
                    otherCards[0] === otherCards[1] ||
                    otherCards[1] === otherCards[2] ||
                    otherCards[0] === otherCards[2]
                )
                    finalCount = 4;
                else finalCount = 3;
            }
        }
        if (hand.cards === 'K3KJJ') console.log('final count', finalCount);
        if (numberOfCountsForUse === 2 && count === 2) return false;
        else if (finalCount === 3 && count === 2 && options?.fullHouse) {
            if (obj.highestCount === 2 && obj.numberHighestOfCounts === 2)
                return true;
        } else if (finalCount === count) {
            if (hand.cards === 'K3KJJ') console.log('hehe', finalCount, count);
            if ([3, 4, 5].includes(finalCount)) return true;
            if (
                finalCount === 2 &&
                numberOfCountsForUse === 1 &&
                !options?.fullHouse
            )
                return true;
        }
    }
    return false;
};

// 53JAA = 4 ??
// 853AJ = 1 ??

const getHandStrength = (hand: Hand) => {
    if (hasNumberOfCards(hand, 5)) return 6;
    else if (hasNumberOfCards(hand, 4)) return 5;
    else if (
        hasNumberOfCards(hand, 3) &&
        hasNumberOfCards(hand, 2, { fullHouse: true })
    )
        return 4;
    else if (hasNumberOfCards(hand, 3)) return 3;
    else if (hasNumberOfCards(hand, 2, { numberOfCouts: 2 })) return 2;
    else if (hasNumberOfCards(hand, 2)) return 1;
    else return 0;
};

console.log(getHandStrength({ cards: 'K3KJJ', bid: 419 }));
const inputArray = input.split('\n');

const hands: Hand[] = [];
inputArray.forEach((line) =>
    line.split(' ').forEach((_, index) => {
        if (index % 2 === 0) {
            const hand = {
                cards: line.split(' ')[0],
                bid: +line.split(' ')[1],
            } as Hand;
            hand.strength = getHandStrength(hand);
            hands.push(hand);
        }
    }),
);

hands.sort((a, b) => a.strength - b.strength);

function sortEveryCardInHand(
    aHand: Hand,
    bHand: Hand,
    itteration: number,
): [{ aHand: Hand; bStrength: number }, { bHand: Hand; aStrength: number }] {
    const aHandCards = aHand.cards.split('');
    const bHandCards = bHand.cards.split('');
    const aStrength = cStrs.indexOf(aHandCards[itteration]);
    const bStrength = cStrs.indexOf(bHandCards[itteration]);
    if (aStrength === bStrength) {
        return sortEveryCardInHand(aHand, bHand, itteration + 1);
    } else
        return [
            { aHand, bStrength },
            { bHand, aStrength },
        ];
}

function sortHandsWithStrengthByActualStrenght(
    hands: Hand[],
    strengthToSort: number,
) {
    const handsWithStrength = hands.filter(
        (hand) => hand.strength === strengthToSort,
    );

    handsWithStrength.sort((a, b) => {
        return (
            sortEveryCardInHand(a, b, 0)[0].bStrength -
            sortEveryCardInHand(a, b, 0)[1].aStrength
        );
    });
    return handsWithStrength;
}

let sortedHands: Hand[] = [];
for (let i = 6; i >= 0; i--) {
    sortedHands = [
        ...sortedHands,
        ...sortHandsWithStrengthByActualStrenght(hands, i),
    ];
}

const mapOfBiddingNumbers = sortedHands.reverse().map((hand, index) => {
    return hand.bid * (index + 1);
});

// console.log(sortedHands);
console.log(mapOfBiddingNumbers.reduce((a, b) => a + b, 0));

const end = new Date().getTime();
console.log(`Execution time: ${end - start} ms`);
