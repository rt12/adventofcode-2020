// https://adventofcode.com/2020/day/3
const {readLines} = require("../common/common");

const list = readLines("input.txt");
const width = list[0].length;
const height = list.length;

let count = 0;
for (let y = 0, x = 0; y < height; ++y, x += 3) {
    if (list[y][x % width] === "#") {
        count++;
    }
}

console.log(count);

// Answer: 228
