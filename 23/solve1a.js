const _ = require("lodash");

const mln = 1_000_000;
// const input = "389125467"; // test
const input = "193467258";
const pre = input.split("").map(Number);

const lookup = new Map();

let head = {};
let tail = pre.reduce((tail, val) => {
    const node = {val};
    lookup.set(val, node); 
    tail.next = node;
    return node;
}, head);

console.log(lookup.size);

// make it a loop
tail.next = head.next;
head = head.next;

function getlist(head) {
    const res = [];
    let cur = head;
    do {
        res.push(cur.val);
        cur = cur.next;
    } while (cur != head);
    return res.join(" "); 
}

for (let i = 1; i <= 100; ++i) {
    let cur = head.val;
    const pick = [head.next, head.next.next, head.next.next.next];

    // console.log(i, cur, getlist(head));
    
    for(;;) {
        --cur;
        if (cur === 0) {
            cur = 9;
        }

        const node = lookup.get(cur);
        if (!pick.includes(node)) {
            head.next = pick[2].next; // cut picked elements
            pick[2].next = node.next;
            node.next = pick[0];
            break;
        }
    }

    head = head.next;
}
 
const res = [];
let np = lookup.get(1).next;

for (let i = 0; i < pre.length - 1; ++i) {
    res.push(np.val);
    np = np.next;
}

console.log(res.join(""));
