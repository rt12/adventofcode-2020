const _ = require("lodash");
const {readGroups} = require("../common/common");

const input = readGroups("input.txt");
const tiles = [];

function reverseString(str) {
    return str.split("").reverse().join("");
}

// border indices
const TOP = 0;
const RIGHT = 1;
const BOTTOM = 2;
const LEFT = 3;

function getBorders(map) {
    // borders, clockwise: top, right, bottom, left
    return [
        map[0], 
        map.map((row) => _.last(row)).join(""),
        _.last(map),
        map.map((row) => row[0]).join("")
    ];
}

function trimMap(map) {
    return map.slice(1, -1).map((row) => row.slice(1, -1));
}

for (const t of input) {
    const [_all,tnum] = /Tile (\d+):/.exec(t[0]);

    const map = t.slice(1);
    const borders = getBorders(map);

    tiles.push({
        id: Number(tnum),
        map: trimMap(map), 
        borders,
        reversed: borders.map((b) => reverseString(b)),
        adj: []
    });
}

const tilesMap = _.keyBy(tiles, "id");
const width = Math.sqrt(tiles.length);

for (const tile of tiles) {
    for (const other of tiles) {
        if (tile.id !== other.id) {
            if (tile.borders.some((b) => other.borders.includes(b) || other.reversed.includes(b))) {
                tile.adj.push(other);
            }
        }
    }
}

const corners = tiles.filter((t) => t.adj.length === 2);
const res = corners.reduce((acc, t) => acc*t.id, 1);
console.log(res);

function rotateImg(img) {
    const size = img.length;
    const rotated = _.times(size, () => []);

    for (let y = 0; y < size; ++y) {
        for (let x = 0; x < size; ++x) {
            rotated[y][x] = img[size - x - 1][y];
        }
    }

    return rotated.map((row) => row.join(""));
}

class Solver {
    constructor(startTile) {
        this.image = _.times(width, () => []);
        this.used = {};
        this.maxdepth = 0;

        this.startTile = startTile;
    }

    rotate(tile) {
        return {
            id: tile.id,
            adj: tile.adj,
            map: rotateImg(tile.map),
            borders: [
                reverseString(tile.borders[3]),
                tile.borders[0],
                reverseString(tile.borders[1]),
                tile.borders[2]
            ]
        }
    }

    flipVertical(tile) {
        return {
            id: tile.id,
            adj: tile.adj,
            map: _.clone(tile.map).reverse(),
            borders: [
                tile.borders[2],
                reverseString(tile.borders[1]),
                tile.borders[0],
                reverseString(tile.borders[3])
            ]
        }
    }

    fits(x, y, tile) {
        // return true;
        const brd = tile.borders;

        // console.log(brd);
        // console.log(this.image);

        return (x === 0 || brd[LEFT] === this.image[y][x - 1].borders[RIGHT]) &&
            (y === 0 || brd[TOP] === this.image[y - 1][x].borders[BOTTOM]);
    }

    printImage() {
        console.log("Image:")
        this.image.forEach((row) => {
            row.forEach((t) => {
                console.log(t.map);
            });
        });
    }

    mul() {
        return this.image[0][0].id *
            this.image[0][width-1].id *
            this.image[width-1][0].id *
            this.image[width-1][width-1].id;
    }

    solve(pos) {
        if (pos === tiles.length) {
            return true;
        }

        const x = pos % width;
        const y = Math.floor(pos / width);

        let adj;

        if (pos === 0) {
            adj = [this.startTile];
        } else {
            const prev = x === 0 ? this.image[y - 1][x] : this.image[y][x - 1];
            adj = prev.adj;
        }

        // console.log(y, x, adj ? adj.map((x) => x.id) : "oops");
        // console.log(this.image[y]);

        for (let tile of adj) {
            if (this.used[tile.id]) {
                continue;
            }
            // console.log("check", tile.id);
            this.used[tile.id] = true;

            for (let r = 0; r < 4; ++r) {
                if (this.fits(x, y, tile)) {
                    this.image[y][x] = tile;
                    if (this.solve(pos + 1)) {
                        return true;
                    }
                }

                const fv = this.flipVertical(tile);
                if (this.fits(x, y, fv)) {
                    this.image[y][x] = fv;
                    if (this.solve(pos + 1)) {
                        return true;
                    }
                }

                tile = this.rotate(tile);
            }

            this.used[tile.id] = false;
        }

        return false;
    }

    buildMap() {
        return _.flatten(this.image.map((row) => {
            const height = row[0].map.length;
            const lines = _.times(height, (y) => row.map((t) => t.map[y]).join(""));
            return lines;
        }));
    }
}

const monster = [
    "^..................#.",
    "#....##....##....###",
    "^.#..#..#..#..#..#..."
].map((p) => new RegExp(p));

const init = corners[0];
const solver = new Solver(init);
const s = solver.solve(0);
console.log(s);
solver.printImage();
let img = solver.buildMap();
console.log(img);

function findMonsters(img) {
    let cnt = 0;
    for (let i = 0; i < img.length - monster.length; ++i) {

        const re = /#....##....##....###/g;

        for (;;) {
            const m = re.exec(img[i + 1]);
            if (!m) {
                break;
            }

            // if (monster[0].exec(img[i].slice(m.index))) {
                // cnt++;
            // }

            if (//monster[0].exec(img[i].slice(m.index)) &&
                monster[2].exec(img[i+2].slice(m.index))) {
                cnt++;
            }
        }
    }
    return cnt;
}

const dashcount = _.sum(img.map((row) => row.split("").filter((x) => x === "#").length));

const cnt = [];
for(let r = 0; r < 4; ++r) {
    cnt.push(findMonsters(img));
    console.log(img);
    const flip = _.clone(img).reverse();
    console.log(flip);
    // console.log("flip");
    cnt.push(findMonsters(flip));
    // console.log("rotate");
    img = rotateImg(img);
}

console.log(dashcount, _.compact(cnt), _.compact(cnt).map((x) => dashcount - x*15));
console.log(dashcount - 15*_.sum(cnt));

// 2013 - too low
