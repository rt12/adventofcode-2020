const list = [2,15,0,9,1,20];

const map = new Map();
let x;
let prev;

for (let i = 0; i < 30000000; ++i) {
    if (i % 100000 === 0) {
        console.log(i);
    }
    if (i < list.length) {
        x = list[i];
        map.set(x, [i]);
    } else {
        x = prev;

        if (map.has(x)) {
            let values = map.get(x);
            if (values.length > 1) {
                x = values[values.length - 1] - values[values.length - 2];
            } else {
                x = 0;
            }
        } else {
            x = 0;
        }

        let arr = (map.get(x) || []);
        if (arr.length < 2) {
            arr.push(i);
        } else {
            arr = [arr[1], i];
        }

        map.set(x, arr);
    }

    prev = x;
}

console.log(x); // 1280
