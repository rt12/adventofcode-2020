// https://adventofcode.com/2020/day/3
const {readLines} = require("../common/common");

const list = readLines("input.txt");
const width = list[0].length;
const height = list.length;

const routes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
];

const mul = routes.reduce((mul, route) => {
    let count = 0;
    for (let y = 0, x = 0; y < height; y += route[1], x += route[0]) {
        if (list[y][x % width] === "#") {
            count++;
        }
    }
    return mul * count;
}, 1);

console.log(mul);

// Answer: 6818112000
