const _ = require("lodash");
const {readLines} = require("../common/common");

const lines = readLines("input.txt");

let mask;
let mem = {};

function applyMask(value, mask) {
    const arr = value.split("");
    const len = mask.length;

    for (const pos in mask) {
        const c = mask[pos];

        if (c === "1") {
            arr[pos] = "1";
        } else if (c === "0") {
            arr[pos] = "0";
        }
    }
    return arr.join("");
}

function count() {
    return _.sum(Object.values(mem));
}

for (const line of lines) {
    const maskreg = /mask = (.*)/.exec(line);
    if (maskreg) {
        mask = maskreg[1].split("");
    } else {
        const pr = /mem\[(\d+)\] = (\d+)/.exec(line);
        if (pr) {
            const [addr, value] = [Number(pr[1]), BigInt(pr[2]).toString(2).padStart(mask.length, "0")];
            const mod = applyMask(value, mask);
            console.log(addr, value, mod);
            mem[addr] = Number.parseInt(mod, 2);
        }
    }
}

console.log(count());
