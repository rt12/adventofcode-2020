const _ = require("lodash");
const {readLines} = require("../common/common");
const lines = readLines("input.txt");

const allergens = new Map();
const allingr = new Map();

function setIntersection(set, list) {
    return new Set(list.filter((x) => set.has(x)));
}

lines.forEach((line) => {
    const [_all, foodlist, note] = /(.+) \(contains (.+)\)/.exec(line);
    const may = note.split(", ");
    const ingr = foodlist.split(" ");

    ingr.forEach((x) => {
        const cnt = allingr.get(x);
        if (cnt) {
            allingr.set(x, cnt + 1);
        } else {
            allingr.set(x, 1);
        }
    });

    may.forEach((x) => {
        const val = allergens.get(x);
        if (val) {
            allergens.set(x, setIntersection(val, ingr));
        } else {
            allergens.set(x, new Set(ingr));
        }
    });
});

const bad = new Set(_.flatten(Array.from(allergens.values()).map((set) => Array.from(set.values()))));

let sum = 0;
for (const [item, cnt] of allingr.entries()) {
    if (!bad.has(item)) {
        sum += cnt;
    }
}

console.log("Count", sum);

// part2
const final = new Map();

// remove possible variations
while(allergens.size !== final.size) {
    for (const [key, set] of allergens) {
        if (final.has(key)) {
            continue;
        }
        const newset = Array.from(set).filter((x) => !final.has(x));
        if (newset.length === 1) {
            final.set(newset[0], key);
        }
    }
}

const sorted = _.sortBy(Array.from(final.entries()), (x) => x[1]);
console.log("List", sorted.map((x) => x[0]).join(","));
