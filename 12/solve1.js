const _ = require("lodash");
const {readLines} = require("../common/common");

let data = readLines("input.txt").map((v) => [v.substr(0, 1), Number(v.substr(1))]);

const pos = [0, 0];

const directions = [
    [1, 0],
    [0, -1],
    [-1, 0],
    [0, 1]
]

const dirmap = {
    E: 0,
    N: 1,
    W: 2,
    S: 3
}

let dir = 0; // E

function rotate(degree, sign) {
    dir += degree * sign; 
    dir %= 4;
    if (dir < 0) {
        dir += 4;
    }
    return dir;
}

// console.log(dir);
// console.log(rotate(3, 1));

for (const [cmd, v] of data) {

    if (["R", "L"].includes(cmd)) {
        rotate(v / 90, cmd === "R" ? -1 : 1);
    } else {
        let d;

        if (cmd === "F") {
            d = directions[dir];
        } else {
            d = directions[dirmap[cmd]];
        }

        pos[0] += d[0] * v;
        pos[1] += d[1] * v;
    }
    
    console.log(cmd, v, dir, JSON.stringify(pos));
}

// console.log(pos);
console.log(Math.abs(pos[0]) + Math.abs(pos[1]));