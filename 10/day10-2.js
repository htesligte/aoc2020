const cache = {};
const fs = require('fs');
const data = fs.readFileSync('data.txt').toString();
let lines = data.split("\n").map(v => parseInt(v));
const largest = lines.sort((a,b)=>a-b).reverse()[0];
lines.push(0);
lines.push(largest+3);

const findNumberOfChilds = (num) => {
    if (num === 0) {
        return 1;
    }
    if (num < 0) {
        return 0;
    }
    if (cache[num]) {
        return cache[num];
    }
    let numChilds = 0;
    for (let i = 1; i <= 3; i++) {
        if (lines.includes(num-i)) {
            numChilds += findNumberOfChilds(num-i);
        }
    }
    cache[num] = numChilds;
    return numChilds;
};
 
console.log(findNumberOfChilds(largest+3));