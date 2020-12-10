// https://adventofcode.com/2020/day/9
const _ = require("lodash");
const {readLines} = require("../common/common");

const preambleLen = 25;
const data = readLines("input.txt").map(Number);

function isSum(begin, end, sum) {
    for (let i = begin; i < end; ++i) {
        for (let j = i + 1; j < end; ++j) {
            if (data[i] + data[j] === sum) {
                return true;
            }
        }
    }

    return false;
}

function findInvalid() {
    for (let begin = 0, end = preambleLen; end < data.length; ++begin, ++end) {
        const cur = data[end];
        if (!isSum(begin, end, cur)) {
            return cur;
        }
    }
}

function findSequence(id) {
    for (let len = 2; len < data.length; ++len) {
        for (let i = 0; i < data.length; ++i) {
            let sum = 0;
            for (let j = i; j < i + len; ++j) {
                sum += data[j];
                if (sum > id) {
                    break;
                }
            }

            if (sum === id) {
                const reg = data.slice(i, i + len).sort((a, b) => a - b);
                return reg[0] + _.last(reg);
            }
        }
    }
}

const id = findInvalid();
console.log(id); // 14144619
console.log(findSequence(id)); // 1766397
