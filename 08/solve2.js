// https://adventofcode.com/2020/day/8
const _ = require("lodash");
const {readLines} = require("../common/common");
const lines = readLines("input.txt");

const prog = lines.map((line) => {
    const [cmd, arg] = line.split(" ");
    return [cmd, Number(arg)];
});

function isFinite() {
    let v = {};
    let acc = 0;
    for (let i = 0; i < prog.length;) {
        if (v[i]) {
            return false;
        }

        v[i] = 1;
        const [cmd, arg] = prog[i];

        if (cmd === "jmp") {
            i += arg;
        } else {
            if (cmd === "acc") {
                acc += arg;
            }
            i++;
        }
    }

    console.log(acc);
    return true;
}

for (const j in prog) {
    const prev = prog[j][0];

    if (prev === "jmp") {
        prog[j][0] = "nop";
    } else if (prev === "nop") {
        prog[j][0] = "jmp";
    }

    if (isFinite(j)) {
        break;
    }

    prog[j][0] = prev;
}

// Answer: 1245
