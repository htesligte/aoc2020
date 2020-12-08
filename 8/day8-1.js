const fs = require('fs');
const data = fs.readFileSync('data.txt').toString();
const lines = data.split("\n");

getVal = (str) => {
    if (str[0] === '+') {
        return parseInt(str.substring(1));
    }
    return 0 - parseInt(str.substring(1));
}

const prevLines = [];
let it = 0;
let acc = 0;
while(it+1 < lines.length) {
    if (prevLines.includes(it)) {
        break;
    }
    prevLines.push(it);
    const [ins, val] = lines[it].split(" ");
    switch (ins) {
        case 'acc':
            it++;
            acc += getVal(val);
            break;
        
        case 'nop':
            it++;
            break;

        case 'jmp':
            it += getVal(val);
            break;
    }
}
console.log(acc);