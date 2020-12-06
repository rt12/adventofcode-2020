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

function within(value, min, max) {
    const num = Number(value);
    return min <= num && num <= max;
}

// byr (Birth Year) - four digits; at least 1920 and at most 2002.
// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
// hgt (Height) - a number followed by either cm or in:
// If cm, the number must be at least 150 and at most 193.
// If in, the number must be at least 59 and at most 76.
// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
// pid (Passport ID) - a nine-digit number, including leading zeroes.
// cid (Country ID) - ignored, missing or not.

function validate(obj) {
    if (fields.filter((key) => !!obj[key]).length !== fields.length) {
        return false;
    }

    const hgt = String(obj["hgt"]);
    const hgtNum = hgt.slice(0, -2);

    return (
        within(obj["byr"], 1920, 2002) &&
        within(obj["iyr"], 2010, 2020) &&
        within(obj["eyr"], 2020, 2030) &&
        (
            (hgt.endsWith("cm") && within(hgtNum, 150, 193)) ||
            (hgt.endsWith("in") && within(hgtNum, 59, 76))
        ) &&
        /^#[\w\d]{6}$/.test(obj["hcl"]) &&
        ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(obj["ecl"]) &&
        /^[\d]{9}$/.test(obj["pid"])
    );
}

const passports = groups.map((group) => 
    _.fromPairs(group.join(" ").split(" ").map((pair) => pair.split(":")))
);

const valid = _.sumBy(passports, validate);
console.log(valid);

// Answer: 184
