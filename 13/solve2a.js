// const input = "7,13,x,x,59,x,31,19";
// const input = "1789,37,47,1889";
// const input = "17,x,13,19";
// const input = "11,17,19";
const input = "19,x,x,x,x,x,x,x,x,x,x,x,x,37,x,x,x,x,x,599,x,29,x,x,x,x,x,x,x,x,x,x,x,x,x,x,17,x,x,x,x,x,23,x,x,x,x,x,x,x,761,x,x,x,x,x,x,x,x,x,41,x,x,13";
const buses = input.split(",").map((x) => x === "x" ? 1 : Number(x));

const gcd = (a, b) => (!b) ? a : gcd(b, a % b);
const lcm = (a, b) => a / gcd(a, b) * b;

function solve(adj) {
    let res = adj[0];
    let step = res;

    for (let i = 1; i < adj.length; ++i) {
        const id = adj[i];
        step = lcm(step, adj[i-1]);
        // console.log(step);

        for (let j = 2; ;++j) {
            if (id < 0 || (res + i) % id === 0) {
                break;
            }

            res += step;
        }
    }

    return res;
}

console.log(solve(buses)); // 1012171816131114

