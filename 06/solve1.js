// https://adventofcode.com/2020/day/6

const _ = require("lodash");
const {readLines, splitGroups} = require("../common/common");

const groups = splitGroups(readLines("input.txt"));
const count = _.sum(groups.map((group) => _.uniq(group.join("")).length));

console.log(count);

// Answer: 6703
