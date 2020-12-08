// https://adventofcode.com/2020/day/7
const _ = require("lodash");
const {readLines} = require("../common/common");
const list = readLines("input.txt");

const map = list.reduce((acc, x) => {
    const [_x, outer, inner] = /(.*) bags contain (.*)\./.exec(x);
    if (inner === "no other bags") {
        acc[outer] = {};
    } else {
        acc[outer] = _.fromPairs(inner.replace(/\s*bags?/g, "").split(", ").map(
            (x) => [x.substr(2), Number(x.substr(0, 2))]));
    }
    return acc;
}, {});

function countInner(bagtype, mul) {
    return _.sum(Object.entries(map[bagtype]).map(([type, count]) => {
        return mul*count + countInner(type, mul*count);
    }));
}

console.log(countInner("shiny gold", 1));

// Answer: 220149
