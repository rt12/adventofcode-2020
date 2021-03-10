const _ = require("lodash");

// const input = "389125467"; // test
const input = "193467258";
const cups = input.split("").map(Number);

let pos = 0;
let cur = 0;

for (let i = 1; i <= 100; ++i) {
    cur = cups[pos];
    let dest = cur - 1;

    console.log("-- move", i);
    console.log("cups", cups.join(" "));
    
    const pick = _.times(3, () => cups.splice((pos + 1) < cups.length ? pos + 1 : 0, 1)[0]);

    console.log("pick up", pick.join(" "));
    console.log("cur", cur);

    for (;;) {
        const destPos = cups.findIndex((x) => x === dest);
        if (destPos !== -1) {
            console.log("destination", cups[destPos]);
            cups.splice(destPos + 1, 0, ...pick);
            break;
        }

        --dest;

        if (dest <= 0) {
            dest = 9;
        }
    }

    pos = (cups.findIndex((x) => x === cur) + 1) % cups.length;
}
 
const start = cups.findIndex((x) => x === 1);
console.log(start);
const res = _.times(cups.length - 1, (x) => cups[(start + x + 1) % cups.length]).join("");
console.log(res);
