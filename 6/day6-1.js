const fs = require('fs');
const data = fs.readFileSync('data.txt').toString();

let prevPos = 0;
let pos = data.indexOf("\n\n");
let sum = 0;
do {
    let str = data.substring(prevPos, pos);
    str = str.split("\n").join("");
    const count = new Set(str.split("")).size;
    sum += count;
    prevPos = pos+2;
    pos = data.indexOf("\n\n", prevPos);
} while (pos !== -1)
console.log(sum);