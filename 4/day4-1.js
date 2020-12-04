const fs = require('fs');
const data = fs.readFileSync('data.txt').toString();

let prevPos = 0;
let pos = data.indexOf("\n\n");
let valid = 0;
do {
    let str = data.substring(prevPos, pos);
    str = " " + str.split("\n").join(" ");
    if (
        str.indexOf(" byr:") >= 0 &&
        str.indexOf(" iyr:") >= 0 &&
        str.indexOf(" eyr:") >= 0 &&
        str.indexOf(" hgt:") >= 0 &&
        str.indexOf(" hcl:") >= 0 &&
        str.indexOf(" ecl:") >= 0 &&
        str.indexOf(" pid:") >= 0 
    ) {
        valid++;
    }
    prevPos = pos+2;
    pos = data.indexOf("\n\n", prevPos);
} while (pos !== -1)

console.log(valid);