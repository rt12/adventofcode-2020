const _ = require("lodash");
const {readGroups} = require("../common/common");
const input = readGroups("input.txt");

const scards = input.map((x) => x.slice(1).map(Number).reverse());

function play(cards) {
    const played = new Set();
    // console.log("Recurse", cards);
    for(let round = 1; cards[0].length && cards[1].length; ++round) {
        if (played.has(JSON.stringify(cards))) {
            return [0, cards[0]];
        }

        played.add(JSON.stringify(cards));

        // console.log("Pre ", round, cards);

        const c1 = cards[0].pop();
        const c2 = cards[1].pop();

        // console.log("Play", c1, c2);

        const [winner] = (cards[0].length >= c1 && cards[1].length >= c2) ?
            play([cards[0].slice(-c1), cards[1].slice(-c2)]) : (c1 > c2 ? [0] : [1]);

        // console.log("Win ", winner + 1);

        if (winner === 0) {
            cards[0] = [c2, c1].concat(cards[0]);
        } else {
            cards[1] = [c1, c2].concat(cards[1]);
        }

        // console.log("Post", round, cards);
    }

    return cards[0].length > 0 ? [0, cards[0]] : [1, cards[1]];
}

const [winner, deck] = play(scards);
console.log("Winner deck", deck);

const score = deck.reduce((acc, cur, idx) => acc + cur * (idx+1), 0);
console.log(score);
