const _ = require("lodash");
const {readLines} = require("../common/common");

let data = readLines("input.txt").map((v) => [v.substr(0, 1), Number(v.substr(1))]);

const pos = [0, 0];

const directions = {
    E: [1, 0],
    N: [0, -1],
    W: [-1, 0],
    S: [0, 1]
}

let dir = [1, 0]; // E

function rotate(degree, lr) {
    degree /= 90;
    let sign = lr === "R" ? -1 : 1;

    for (let i = 0; i < degree; ++i) {
        [dir[0], dir[1]] = [dir[1] * sign, dir[0] * -sign];
    }

    return dir;
}

// console.log(dir);
// console.log(rotate(3, 1));

for (const [cmd, v] of data) {

    if (["R", "L"].includes(cmd)) {
        rotate(v, cmd);
    } else {
        let d;

        if (cmd === "F") {
            d = dir;
        } else {
            d = directions[cmd];
        }

        pos[0] += d[0] * v;
        pos[1] += d[1] * v;
    }
    
    console.log(cmd, v, dir, JSON.stringify(pos));
}

// console.log(pos);
console.log(Math.abs(pos[0]) + Math.abs(pos[1]));