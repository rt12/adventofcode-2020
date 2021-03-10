const _ = require("lodash");
const {readGroups, parseNumberArray} = require("../common/common");

const [inputRules, inputMy, inputNearby] = readGroups("input.txt");

const rules = inputRules.reduce((acc, line) => {
    const [_, name, cond] = /(.+): (.*)/.exec(line);
    const ranges = cond.split(" or ").map((r) => {
        const [_, minv, maxv] = /(\d+)-(\d+)/.exec(r);
        return [Number(minv), Number(maxv)];
    });

    acc[name] = ranges;
    return acc;
}, {});

const my = parseNumberArray(inputMy[1]);
const nearby = inputNearby.slice(1).map(parseNumberArray);

const allRules = _.flatten(Object.values(rules));

function isValidRange(v, range) {
    return v >= range[0] && v <= range[1];
}

function isValidValue(v, ranges) {
    return ranges.some((r) => isValidRange(v, r));
}

// sum of all invalid values
const sum = _.sumBy(nearby, (t) => _.sum(t.filter((v) => !isValidValue(v, allRules))));
console.log(sum);

// start part 2

// filter out invalid tickets
const valid = nearby.filter((t) => t.every((v) => allRules.some((range) => isValidRange(v, range))));

const props = Object.keys(rules);
const propRules = Object.values(rules);

// form a validity map: ticket -> field -> position validity
const vmap = valid.map((t) => 
    t.map((v) => 
        propRules.map((r) => isValidValue(v, r))
));

const posvalid = [];

for (let i = 0; i < props.length; ++i) {
    for (let j = 0; j < props.length; ++j) {
        if (vmap.every((v) => v[i][j])) {
            posvalid[j] = (posvalid[j] || []).concat(i);
        }
    }
}

// sort by number of valid positions
const pv = posvalid.map((v, i) => [i, v]).sort((a, b) => a[1].length - b[1].length);

const found = {};

pv.forEach(([pos, opt]) => {
    for (let i = 0; i < opt.length; ++i) {
        const item = opt[i];
        if (!found[item]) {
            found[item] = props[pos];
        }
    }
});

const mul = Object.entries(found).
    filter(([_, name]) => name.startsWith("departure")).
    reduce((acc, v) => acc * my[v[0]], 1);

console.log(mul);
