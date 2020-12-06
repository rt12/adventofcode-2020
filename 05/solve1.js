// https://adventofcode.com/2020/day/5
const _ = require("lodash");
const {readLines} = require("../common/common");

const lines = readLines("input.txt");

function getSeatId(code) {
    const binary = code.split("").map((x) => (x === "B" || x === "R") ? 1 : 0).join("");
    return Number.parseInt(binary, 2);
}

const max = _.max(lines.map(getSeatId));
console.log(max);

// Answer: 989
