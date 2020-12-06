// https://adventofcode.com/2020/day/6

const _ = require("lodash");
const {readLines, splitGroups} = require("../common/common");

const groups = splitGroups(readLines("input.txt"));
const count = _.sum(groups.map((group) =>
    Object.values(_.countBy(group.join(""))).filter((x) => x === group.length).length));

console.log(count);

// Answer: 3430
