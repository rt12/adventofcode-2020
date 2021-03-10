const _ = require("lodash");
const {readLines} = require("../common/common");

const lines = readLines("input.txt");

let mask;
let mem = {};

function applyMask(arr, value, mask, pos) {
    if (pos === mask.length) {
        const addr = Number.parseInt(arr.join(""), 2);
        mem[addr] = value;
        return;
    }

    const c = mask[pos];
    if (c === "0") {
        applyMask(arr, value, mask, pos + 1);
    } else if (c === "1") {
        arr[pos] = "1";
        applyMask(arr, value, mask, pos + 1);
    } else if (c === "X") {
        arr[pos] = "0";
        applyMask(arr, value, mask, pos + 1);
        arr[pos] = "1";
        applyMask(arr, value, mask, pos + 1);
    }
}

function count() {
    return _.sum(Object.values(mem));
}

for (const line of lines) {
    const maskreg = /mask = (.*)/.exec(line);
    if (maskreg) {
        mask = maskreg[1].split("");
        console.log(mask.join(""), "\n");
    } else {
        const pr = /mem\[(\d+)\] = (\d+)/.exec(line);
        if (pr) {
            const [addr, value] = [Number(pr[1]).toString(2).padStart(mask.length, "0"), Number(pr[2])];
            console.log(addr, value);
            applyMask(addr.split(""), value, mask, 0);
        }
    }
}

console.log(count());
