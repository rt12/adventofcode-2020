// https://adventofcode.com/2020/day/5
const _ = require("lodash");
const {readLines} = require("../common/common");

const lines = readLines("input.txt");

function getSeatId(code) {
    const binary = code.split("").map((x) => (x === "B" || x === "R") ? 1 : 0).join("");
    return Number.parseInt(binary, 2);
}

const seatmap = lines.map(getSeatId).reduce((acc, id) => {
    const row = id >> 3;
    const col = id & 7;
    acc[row] = (acc[row] || 0) | (1 << col); // bitmask of used seats in a row
    return acc;
}, []);

// remove first and last row and filter rows with vacant seats
const vacantRows = Object.entries(seatmap).slice(1, -1).filter(([_, num]) => num < 255);
const vacantRow = _.first(vacantRows);
const vacantSeatId = Number(vacantRow[0]) * 8 + Math.log2(255 - vacantRow[1]);

console.log(vacantSeatId);

// Answer: 548
