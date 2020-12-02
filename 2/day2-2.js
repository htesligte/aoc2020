const fs = require('fs');
const data = fs.readFileSync('data.txt');
const array = data.toString().split("\n");

let count = 0;
for (const line of array) {
    const elements = line.match(/([0-9]+)-([0-9]+) ([a-z]{1}): ([a-z]+)/);
    
    if (
        elements[4][parseInt(elements[1])-1] === elements[3] ^
        elements[4][parseInt(elements[2])-1] === elements[3]
        ) {
            count++;
        }
}

console.log(count);