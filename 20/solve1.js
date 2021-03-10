const _ = require("lodash");
const {readGroups} = require("../common/common");

const input = readGroups("input.txt");
const tiles = [];

function reverseString(str) {
    return str.split("").reverse().join("");
}

function getBorders(map) {
    // borders, clockwise: top, right, bottom, left
    return [
        map[0], 
        map.map((row) => _.last(row)).join(""),
        _.last(map),
        map.map((row) => row[0]).join("")
    ];
}

for (const t of input) {
    const [_all,tnum] = /Tile (\d+):/.exec(t[0]);

    const map = t.slice(1);
    const borders = getBorders(map);

    tiles.push({
        id: Number(tnum),
        map, 
        borders,
        reversed: borders.map((b) => reverseString(b)),
        adj: []
    });
}

for (const tile of tiles) {
    for (const other of tiles) {
        if (tile.id !== other.id) {
            if (tile.borders.some((b) => other.borders.includes(b) || other.reversed.includes(b))) {
                tile.adj.push(other);
            }
        }
    }
}

const res = tiles.filter((t) => t.adj.length === 2).reduce((acc, t) => acc*t.id, 1);
console.log(res);
