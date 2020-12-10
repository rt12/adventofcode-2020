const _ = require("lodash");
const {readLines} = require("../common/common");

const data = readLines("input.txt").map(Number).sort((a, b) => a - b);

let diffs1 = 0;
let diffs3 = 1; // last connection to the device
let cur = 0;

for (const rate of data) {
    const diff = rate - cur;
    if (diff === 1) {
        diffs1++;
    } else if (diff === 3) {
        diffs3++;
    }
    cur = rate;
}

console.log(diffs1 * diffs3); // 1980
