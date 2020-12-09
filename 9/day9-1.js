const fs = require('fs');
const data = fs.readFileSync('data.txt').toString();
let lines = data.split("\n").map(v => parseInt(v));

const isValid = (n, subset) => {
    for (const v of subset) {
        const validVal = n - v;
        if (validVal == v) {
            continue;
        }
        if (subset.includes(validVal)) {
            return true;
        }
    }
    return false;
}
for (let i = 25; i < lines.length; i++) {
    if(!isValid(lines[i], lines.slice(i-25, i))) {
        console.log(lines[i]);
        break;
    }
}