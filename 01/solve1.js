// https://adventofcode.com/2020/day/1

const {readLines} = require("../common/common");

const lines = readLines("input.txt");
const list = lines.map(Number).sort((a, b) => a - b);

for (let i = 0, j = list.length - 1; i < list.length;) {
    const sum = list[i] + list[j];
    if (sum === 2020) {
        console.log(list[i] * list[j]);
        return;
    }

    if (sum > 2020) {
        --j;
    } else {
        ++i;
    }
}

// Answer: 482811
