const { group } = require('console');
const fs = require('fs');
const data = fs.readFileSync('data.txt').toString();

let prevPos = 0;
let pos = data.indexOf("\n\n");
let sum = 0
do {
    let str = data.substring(prevPos, pos);
    const groupSize = (str.match(/\n/g) || []).length+1;
    str = str.split("\n").join("");
    const obj = {};
    for (const c of str.split("")) {
        if (!obj[c]) {
            obj[c] = 0;
        }
        obj[c]++;
    }
    let count = 0;
    for (const c of Object.keys(obj)) {
        if (obj[c] === groupSize) {
            count++;
        }
    }

    sum += count;
    prevPos = pos+2;
    pos = data.indexOf("\n\n", prevPos);
} while (pos !== -1)
console.log(sum);