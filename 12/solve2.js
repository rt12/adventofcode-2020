const _ = require("lodash");
const {readLines} = require("../common/common");

let data = readLines("input.txt").map((v) => [v.substr(0, 1), Number(v.substr(1))]);

const directions = {
    E: [1, 0],
    N: [0, -1],
    W: [-1, 0],
    S: [0, 1]
}

function rotate(loc, degree, lr) {
    degree /= 90;
    let sign = lr === "R" ? -1 : 1;

    for (let i = 0; i < degree; ++i) {
        [loc[0], loc[1]] = [loc[1] * sign, loc[0] * -sign];
    }

    return loc;
}

const pos = [0, 0];
const wp = [10, -1];

// console.log(dir);
// console.log(rotate(3, 1));

for (const [cmd, v] of data) {
    if (["R", "L"].includes(cmd)) {
        rotate(wp, v, cmd);
    } else {
        if (cmd === "F") {
            pos[0] += wp[0]*v;
            pos[1] += wp[1]*v;
        } else {
            const d = directions[cmd];
            wp[0] += d[0] * v;
            wp[1] += d[1] * v;
        }
    }
    
    console.log(cmd, v, wp, JSON.stringify(pos));
}

// console.log(pos);
console.log(Math.abs(pos[0]) + Math.abs(pos[1]));