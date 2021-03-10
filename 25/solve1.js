// const [cpk, dpk] = [5764801, 17807724]; // test
const [cpk, dpk] = [1717001, 523731];

function findLoopSize(n, subj) {
    let value = 1;
    for (let i = 1; value !== n; ++i) {
        value = (value * subj) % 20201227;
        if (value === n) {
            return i;
        }
    }
}

function transform(loopSize, pk) {
    let value = 1;
    for(let i = 0; i < loopSize; ++i) {
        value = (value * pk) % 20201227;
    }
    return value;
}

const cls = findLoopSize(cpk, 7);
const dls = findLoopSize(dpk, 7);

console.log(cls, dls);

const key = transform(cls, dpk);

console.log(key);
