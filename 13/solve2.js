const _ = require("lodash");
const {readLines} = require("../common/common");

// const lines = readLines("input.txt");
// const ts = Number(lines[0]);

// const input = "7,13,x,x,59,x,31,19";
// const input = "1789,37,47,1889";
const input = "19,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,599,x,29,x,x,x,x,x,x,x,x,x,x,x,x,x,x,17,x,x,x,x,x,23,x,x,x,x,x,x,x,761,x,x,x,x,x,x,x,x,x,41,x,x,13";
// const input = "17,x,13,19";
// const input = "11,17,19";
const buses = input.split(",").map((x) => x === "x" ? 1 : Number(x));

console.log(buses);

function check(i) {
    buses.forEach((id, j) => {
        console.log(id, i+j, id === -1 ? 0 : (i+j) % id);
    });
}

const gcd = (a, b) => (!b) ? a : gcd(b, a % b);
const lcm = (a, b) => a / gcd(a, b) * b;
const lcmarr = (arr) => arr.reduce((acc, v) => lcm(acc, v), arr[0]);

// console.log(gcd(17,13));
// console.log(lcmarr([17,13]));
// return;

function solve(adj) {
    let res = adj[0];

    for (let i = 1; i < adj.length; ++i) {
        const start = res;
        const step = lcmarr(adj.slice(0, i));
        const id = adj[i];

        console.log(step, id);
        for (let j = 2; ;++j) {
            // console.log(".", res, (res + i) % id);
            if (id < 0 || (res + i) % id === 0) {
                break;
            }

            res = start + step * j;
        }
    }

    return res;
}

console.log(solve(buses));
