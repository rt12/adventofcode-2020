const _ = require("lodash");
const {readGroups} = require("../common/common");

const [lines, data] = readGroups("input.txt");
const rules = {};

for (const line of lines) {
    const [id, rule] = line.split(": ");

    if (rule[0] === '"') {
        rules[id] = rule[1];
    } else {
        const subrules = rule.split(" | ").map((list) => list.split(" ").reverse());
        rules[id] = subrules;
    }
}

function match(str, pos, queue) {
    if (pos === str.length) {
        return queue.length === 0;
    }

    if (queue.length === 0 || queue.length > str.length) {
        return false;
    }

    const id = queue.pop();
    const rule = rules[id];

    if (typeof rule === "string") {
        if (str[pos] !== rule) {
            return false;
        }
        return match(str, pos + 1, queue);
    }

    return rule.some((x) => match(str, pos, queue.concat(x)));
} 

// part1
console.log(_.sum(data.map((x) => match(x, 0, [0])))); 

// part2
rules[8] = [["42"], ["42", "8"]].map((x) => x.reverse());
rules[11] = [["42", "11", "31"], ["42", "31"]].map((x) => x.reverse());

console.log(_.sum(data.map((x) => match(x, 0, [0])))); 
