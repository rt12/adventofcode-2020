// https://adventofcode.com/2020/day/8
const _ = require("lodash");
const {readLines} = require("../common/common");
const lines = readLines("input.txt");

let v = {};
let acc = 0;

for (let i = 0; i < lines.length;) {
    if (v[i]) {
        console.log(acc);
        break;
    }

    v[i] = 1;
    let [cmd, arg] = lines[i].split(" ");
    arg = Number(arg);

    if (cmd === "jmp") {
        i += arg;
    } else {
        if (cmd === "acc") {
            acc += arg;
        }
        i++;
    }
}

// Answer: 1420
