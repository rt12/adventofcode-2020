const _ = require("lodash");
const {readLines} = require("../common/common");

const lines = readLines("input.txt");

const ts = Number(lines[0]);
const buses = lines[1].split(",").filter((x) => x !== "x").map(Number);

console.log(ts,  buses);

const wait = buses.map((x) => Math.floor(ts / x)*x + x);

let idx = 0;

for (let i = 0; i < wait.length; ++i) {
    if (wait[i] < wait[idx]) {
        idx = i;
    }
}

console.log(idx, buses[idx], buses[idx] * (wait[idx]-ts));
