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

const valid = _.sumBy(list, (acc) => 
    (acc.str[acc.min - 1] === acc.char && acc.str[acc.max - 1] !== acc.char) ||
    (acc.str[acc.min - 1] !== acc.char && acc.str[acc.max - 1] === acc.char)
);

console.log(valid);

// Answer: 593
