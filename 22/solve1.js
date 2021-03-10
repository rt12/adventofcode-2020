const _ = require("lodash");
const {readGroups} = require("../common/common");
const input = readGroups("input.txt");

const cards = input.map((x) => x.slice(1).map(Number).reverse());

console.log(cards);

function play(cards) {
    while (cards[0].length && cards[1].length) {
        const c1 = cards[0].pop();
        const c2 = cards[1].pop();

        if (c1 > c2) {
            cards[0] = [c2, c1].concat(cards[0]);
        } else {
            cards[1] = [c1, c2].concat(cards[1]);
        }
    }

    return cards[0].length ? cards[0] : cards[1];
}

console.log(cards);

const winner = play(cards);

const score = winner.reduce((acc, cur, idx) => acc + cur * (idx+1), 0);
console.log(score);
