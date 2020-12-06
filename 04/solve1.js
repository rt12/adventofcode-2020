// https://adventofcode.com/2020/day/4
const _ = require("lodash");
const {readLines, splitGroups} = require("../common/common");

const lines = readLines("input.txt");
const groups = splitGroups(lines);

const fields = [
    "byr",
    "iyr",
    "eyr",
    "hgt",
    "hcl",
    "ecl",
    "pid"
];

function validate(obj) {
    return fields.filter((key) => !!obj[key]).length === fields.length;
}

const passports = groups.map((group) => 
    // construct object from key-value pairs
    _.fromPairs(
        // split lines into key-value pairs
        group.join(" ").split(" ").map((pair) => pair.split(":")))
);

const valid = _.sumBy(passports, validate);
console.log(valid);

// Answer: 254
