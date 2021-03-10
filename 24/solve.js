const _ = require("lodash");
const {readLines} = require("../common/common");
const lines = readLines("input.txt");

let state = {};

for (const line of lines) {
    let x = 0, y = 0;

    for (let p = 0; p < line.length; ++p) {
        switch(line[p]) {
            case "e":
                x += 2;
                break;

            case "w":
                x -= 2;
                break;

            case "n": 
                y -= 2;
                x += line[++p] === "e" ? 1 : -1;
                break;

            case "s":
                y += 2;
                x += line[++p] === "e" ? 1 : -1;
        }
    }

    const key = JSON.stringify([x, y]);
    const newstate = !state[key];
    if (newstate) {
        state[key] = true;
    } else {
        delete state[key];
    }
    // console.log(x, y);
}

console.log(_.sum(Object.values(state))); // part1

const adj = [
    [2, 0],
    [-2, 0],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2]
];

for (let i = 0; i < 100; ++i) {
    // for every black tile, put adjacent white tiles on map
    for (const [key, value] of Object.entries(state)) {
        if (value) {
            let [x, y] = JSON.parse(key);
            for (const coord of adj) {
                const pos = JSON.stringify([x + coord[0], y + coord[1]]);
                state[pos] = !!state[pos];
            }
        }
    }

    const newstate = {};

    for (const [key, value] of Object.entries(state)) {
        let [x, y] = JSON.parse(key);

        let black = 0;
        for (const coord of adj) {
            const pos = [x + coord[0], y + coord[1]];
            if (state[JSON.stringify(pos)]) {
                black++;
            }
        }

        if (value && (black === 0 || black > 2)) { // black
            newstate[key] = !value;
        } else if (!value && black === 2) { // white
            newstate[key] = !value;
        } else {
            newstate[key] = value;
        }
    }

    const cnt = _.sum(Object.values(newstate));
    console.log(i + 1, cnt);

    state = newstate;
}

console.log(_.sum(Object.values(state))); // part2
