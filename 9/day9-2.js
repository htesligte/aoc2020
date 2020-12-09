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

const findWeakness = (n) => {
    for (let pos = 0; pos < lines.length; pos++) {
        const values = [];
        for (pos2 = pos; pos2 < lines.length; pos2++) {
            values.push(lines[pos2]);
            const sum = values.reduce((a, b) => a+b);
            if (sum > n) {
                break;
            }
            if (sum === n) {
                const min = Math.min(...values);
                const max = Math.max(...values);
                return min+max;
            }
        }
    }
}

for (let i = 25; i < lines.length; i++) {
    if(!isValid(lines[i], lines.slice(i-25, i))) {
        console.log(findWeakness(lines[i]))
    }
}