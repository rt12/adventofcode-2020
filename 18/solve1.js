const _ = require("lodash");
const {readLines} = require("../common/common");

// expr := term op tail
// term := int | '(' expr ')'
// 
// 

class Parser {
    constructor(str) {
        this.str = str;
        this.p = 0;
    }

    parse() {
        let cur = this.readTerm();

        for (;;) { 
            const c = this.peek();
            if (c === ')') {
                this.next();
                break;
            }

            if (c === undefined) {
                break;
            }

            const op = this.readOp();
            const arg = this.readTerm();

            if (op === "*") {
                cur *= arg;
            } else if (op === '+') {
                cur += arg;
            }
        }

        return cur;
    }
    
    readTerm() {
        this.skipws();

        if (this.peek() == '(') {
            this.next();
            return this.parse();
        }

        return this.readInt();
    }

    readInt() {
        this.skipws();

        let num = "";
        for (let c = this.peek(); c >= '0' && c <='9';) {
            num += c;
            this.next();
            c = this.peek();
        }

        // console.log("readInt", num);

        return num.length > 0 ? Number.parseInt(num, 10) : undefined;
    }

    readOp() {
        this.skipws();
        const c = this.next();
        if (c != "*" && c != "+") {
            this.abort();
            return;
        }
        return c;
    }

    abort() {
        const msg = `Unexpected symbol '${this.peek()}' at pos ${this.p}, left: ${this.str.slice(this.p)}`;
        // console.log(`Unexpected symbol '${this.peek()}' at pos ${this.p}, left: ${this.str.slice(this.p)}`);
        throw new Error(msg);

        // throw new Error(`Unexpected symbol '${this.peek()}' at pos ${this.p}`)
    }

    skipws() {
        while(this.peek() === ' ') {
            this.next();
        }
    }

    peek() {
        return this.str[this.p];
    }

    next() {
        return this.str[this.p++];
    }

    unget() {
        this.p--;
    }
}


const lines = readLines("input.txt");
// const lines = ["1 + 2 * 3 + 4 * 5 + 6", 
// "(1)", 
// "1 + (1+2)",
// "1 + (2 * 3) + (4 * (5 + 6))"
// ];


let sum = 0;
try {
    for (const line of lines) {
        console.log("Parsing", line);
        const parser = new Parser(line);
        sum += parser.parse();
        // console.log(parser.parse());
    }
} catch (err) {
    console.log(err);
}

console.log(sum);