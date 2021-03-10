const _ = require("lodash");
const {readLines} = require("../common/common");

const lines = readLines("input.txt");
let map = new Map();

function get(state, d) {
    return state.get(JSON.stringify(d)) || ".";
}

function put(state, d, v) {
    state.set(JSON.stringify(d), v);
}

function neighbors(x, y, z, w) {
    const coords = [];

    for (let xp = x - 1; xp <= x + 1; ++xp) {
        for (let yp = y - 1; yp <= y + 1; ++yp) {
            for (let zp = z - 1; zp <= z + 1; ++zp) {
                for (let wp = w - 1; wp <= w + 1; ++wp) {
                    if (xp === x && yp === y && zp === z && wp == w) {
                        continue;
                    }
                    coords.push([xp, yp, zp, wp]);
                }
            }
        }
    }

    return coords;
}

function mutate(state) {
    const newstate = new Map();

    const all = _.flatten(Array.from(state.keys()).map(JSON.parse).map((coord) => neighbors(...coord)));
    const set = new Set(all);

    for (const coord of set.keys()) {
        const nb = neighbors(...coord);
        let cnt = 0;
        for (const c of nb.values()) {
            if (get(state, c) === "#") {
                cnt++;
            }
        }

        if (get(state, coord) === "#") {
            if (cnt === 2 || cnt === 3) {
                put(newstate, coord, "#");
            }
        } else {
            if (cnt === 3) {
                put(newstate, coord, "#");
            }
        }
    }

    return newstate;
}

for (let y = 0; y < lines.length; ++y) {
    for (const x in lines[y]) {
        put(map, [Number(x), y, 0, 0], lines[y][x]);
    }
}

for (let i = 0; i < 6; ++i) {
    map = mutate(map);
}

function countActive() {
    return Array.from(map.values()).filter((x) => x === "#").length;
}

console.log(countActive());
