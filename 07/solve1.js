// https://adventofcode.com/2020/day/7
const _ = require("lodash");
const {readLines} = require("../common/common");
const list = readLines("input.txt");

const rules = list.map((x) => {
    const [_x, outer, inner] = /(.*) bags contain (.*)\./.exec(x);
    const items = inner.replace(/\s*bags?/g, "").split(", ").map((x) => x.substr(2));
    return [outer, items];
});

// create inverse map
const map = rules.reduce((map, [outer, inner]) => {
    inner.forEach((item) => {
        map[item] = (map[item] || []).concat(outer);
    });
    return map;
}, {});

function countRecursive(bagtype, set) {
    const valid = map[bagtype];
    if (valid) {
        valid.forEach((outer) => {
            set[outer] = 1;
            countRecursive(outer, set);
        });
    }
}

const res = {};
countRecursive("shiny gold", res);
console.log(Object.keys(res).length);

// Answer: 126
