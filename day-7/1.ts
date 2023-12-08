import { input } from './input';

const start = new Date().getTime();
interface Hand {
    cards: string;
    bid: number;
    strength?: number;
    actualStrength?: number;
}

const testingInput = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const cStrs = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
const strength = [
    'High card',
    'One pair',
    'Two pairs',
    'Three of a kind',
    'Full house',
    'Four of a kind',
    'Five of a kind',
];

const hasNumberOfCards = (hand: Hand, count: number, numberOfCouts = 1) => {
    const cardsInHand = hand.cards.split('');
    const pairs = [];
    cardsInHand.forEach((card) => {
        if (!pairs.includes(card))
            cardsInHand.filter((c) => c === card).length === count &&
                pairs.push(card);
    });
    if (pairs.length === numberOfCouts) {
        return true;
    } else return false;
};

const getHandStrength = (hand: Hand) => {
    if (hasNumberOfCards(hand, 5)) return 6;
    else if (hasNumberOfCards(hand, 4)) return 5;
    else if (hasNumberOfCards(hand, 3) && hasNumberOfCards(hand, 2)) return 4;
    else if (hasNumberOfCards(hand, 3)) return 3;
    else if (hasNumberOfCards(hand, 2, 2)) return 2;
    else if (hasNumberOfCards(hand, 2)) return 1;
    else return 0;
};

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

console.log(mapOfBiddingNumbers.reduce((a, b) => a + b, 0));

const end = new Date().getTime();
console.log(`Execution time: ${end - start} ms`);
