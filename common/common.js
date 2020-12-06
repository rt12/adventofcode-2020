const fs = require("fs");

module.exports = {
    readLines,
    splitGroups
}

function readLines(filename) {
    return fs.readFileSync(filename, {encoding: "utf-8"}).split("\n");
}

// split lines into groups (groups separated by an empty line)
function splitGroups(lines) {
    let result = [];
    let group = [];
    for (const line of lines) {
        if (line) {
            group.push(line);
        } else if (group.length) {
            result.push(group);
            group = [];
        }
    }

    if (group.length) {
        result.push(group);
    }

    return result;
}
