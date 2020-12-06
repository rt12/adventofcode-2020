// https://adventofcode.com/2020/day/1

const {readLines} = require("../common/common");

const lines = readLines("input.txt");
const list = lines.map(Number).sort((a, b) => a - b);

for (let k = 0; k < list.length; ++k) {
    for (let i = 0, j = list.length - 1; i < list.length && i != j;) {
        const sum = list[i] + list[j] + list[k];
        if (sum === 2020) {
            console.log(list[i] * list[j] * list[k]);
            return;
        }

        if (sum > 2020) {
            --j;
        } else {
            ++i;
        }
    }
}

// Answer: 193171814
