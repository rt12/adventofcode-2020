const mln = 1_000_000;
// const input = "389125467"; // test
const input = "193467258";
const pre = input.split("").map(Number);

const lookup = new Map(); // value => list node

let head = {};
let tail = pre.reduce((tail, val) => {
    const node = {val};
    lookup.set(val, node); 
    tail.next = node;
    return node;
}, head);

for (let val = pre.length + 1; val <= mln; ++val) {
    const node = {val};
    lookup.set(val, node); 
    tail.next = node;
    tail = node;
}

// make it a loop
tail.next = head.next;
head = head.next;

for (let i = 1; i <= 10 * mln; ++i) {
    let cur = head.val;
    const pick = [head.next, head.next.next, head.next.next.next];

    for(;;) {
        --cur;
        if (cur === 0) {
            cur = mln;
        }

        const node = lookup.get(cur);
        if (!pick.includes(node)) {
            // cut picked elements
            head.next = pick[2].next;
            pick[2].next = node.next;
            // link picked after found node
            node.next = pick[0]; 
            break;
        }
    }

    head = head.next;
}
 
let first = lookup.get(1);
console.log(first.next.val * first.next.next.val);
