const {max} = require("lodash");
const _ = require("lodash");
const {readLines} = require("../common/common");

let data = readLines("input.txt").map((x) => x.split(""));
const width = data[0].length;

const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
];

function occupiedAround(map, row, col) {
    let sum = 0;

    for (const dir of directions) {
        let y = row + dir[0];
        let x = col + dir[1];

        while (y >= 0 && y < map.length && x >= 0 && x < width) {
            const c = map[y][x];
            if (c === "#") {
                sum += 1;
                break;
            }
            if (c === "L") {
                break;
            }
            y += dir[0];
            x += dir[1];
        }
    }

    return sum;
}

function print(map) {
    for (const row of map) {
        console.log(row.join(""));
    }
    console.log("");
}

print(data);

function occupied() {
    return _.sum(data.map((row) => _.sum(row.map((x) => x === "#"))));
}

function mutate() {
    const out = [];
    for (let row = 0; row < data.length; ++row) {
        out.push([]);
        for (let col = 0; col < width; ++col) {
            let c = data[row][col];
            out[row][col] = c;

            if (c === ".") {
                continue;
            }

            const n = occupiedAround(data, row, col);

            if (c === "L" && n === 0) {
                out[row][col] = "#";
            }

            if (c === "#" && n >= 5) {
                out[row][col] = "L";
            }
        }
    }
    return out;
}

// data = 
// `.......#.
// ...#.....
// .#.......
// .........
// ..#L....#
// ....#....
// .........
// #........
// ...#.....`.split("\n").map((x) => x.split(""));


// print(data);
// console.log(occupiedAround(data, 4, 3));
// // return;

let occ = 0;

while(true) {
    data = mutate();
    const newocc = occupied();
    if (newocc === occ) {
        break;
    }
    occ = newocc;
}

console.log(occ);
