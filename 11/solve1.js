const _ = require("lodash");
const {readLines} = require("../common/common");

let data = readLines("input.txt").map((x) => x.split(""));
const width = data[0].length;

function occupiedAround(map, row, col) {
    let sum = 0;

    for (let y = -1; y <= 1; ++y) {
        for (let x = -1; x <= 1; ++x) {
            if (y === 0 && x === 0) {
                continue;
            }
            if (row + y >= 0 && row + y < data.length &&
                col + x >= 0 && col + x < width) {
                sum += map[row + y][col + x] === "#";
            }
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

            if (c === "#" && n >= 4) {
                out[row][col] = "L";
            }
        }
    }
    return out;
}

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
