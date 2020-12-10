const _ = require("lodash");
const {readLines} = require("../common/common");

const data = readLines("input.txt").map(Number).sort((a, b) => a - b);

const count = _.memoize((i, cur) => {
    if (i === data.length) {
        return 1;
    }

    let sum = 0;
    for (; i <= data.length; ++i) {
        if (data[i] - cur <= 3) {
            sum += count(i + 1, data[i]);
        } else {
            break;
        }
    }

    return sum;
});

const res = count(0, 0); // 4628074479616
console.log(res);
