const _ = require("lodash");

const list = [2,15,0,9,1,20];

// const list = [0,3,6];

const map = [];
let x;
let prev;

for (let i = 0; i < 30000000; ++i) {
    if (i % 100000 === 0) {
        console.log(i);
    }
    if (i < list.length) {
        x = list[i];
        map[x] = [i];
    } else {
        x = prev;

        if (x in map) {
            let values = map[x];
            if (values.length > 1) {
                x = values[1] - values[0];
            } else {
                x = 0;
            }
            // console.log(i, x, "spoken before", values);
        } else {
            // console.log(i, x, "spoken first time", x);
            x = 0;
        }

        let arr = (map[x] || []);
        if (arr.length < 2) {
            arr.push(i);
        } else {
            arr = [arr[1], i];
        }

        map[x] = arr;
    }

    prev = x;
}

console.log(x);
