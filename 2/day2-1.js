const fs = require('fs');
const data = fs.readFileSync('data.txt');
const array = data.toString().split("\n");

let count = 0;
for (const line of array) {
    const elements = line.match(/([0-9]+)-([0-9]+) ([a-z]{1}): ([a-z]+)/);
    const regex = new RegExp(`${elements[3]}`, 'g');
    const charCount = (elements[4].match(regex) || []).length;
    if(charCount >= parseInt(elements[1]) && charCount <= parseInt(elements[2])) {
        count++;
    }
}
console.log(count);