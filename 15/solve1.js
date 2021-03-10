const list = [2,15,0,9,1,20];

const map = {};
let x;
let prev;

for (let i = 0; i < 2020; ++i) {
    if (i < list.length) {
        x = list[i];
        map[x] = [i];
    } else {
        x = prev;

        if (x in map) {
            let values = map[x];
            if (values.length > 1) {
                x = values[values.length - 1] - values[values.length - 2];
            } else {
                x = 0;
            }
        } else {
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

console.log(x); // 1280
