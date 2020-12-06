// https://adventofcode.com/2020/day/2
const _ = require("lodash");
const {readLines} = require("../common/common");

const lines = readLines("input.txt");
const list = lines.map((line) => {
    const parsed = /(\d+)-(\d+) (\w): (.*)/.exec(line);
    const data = {
        min: Number(parsed[1]),
        max: Number(parsed[2]),
        char: parsed[3],
        str: parsed[4]
    }
    return data;
});

const valid = _.sumBy(list, (acc) => {
    const count = _.sumBy(acc.str, (c) => c === acc.char);
    return count >= acc.min && count <= acc.max;
});

console.log(valid);

// Answer: 493
