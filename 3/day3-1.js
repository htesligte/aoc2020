const fs = require('fs');
const readPos = (x, y, input, lineLength) => {
    const charPos = x + y * lineLength;
    return input[charPos];
}
const input = fs.readFileSync('data.txt');
const newlinePos = input.indexOf("\n");
const lineLength = newlinePos+1;
let char = false;
let x = 0, y = 0, trees = 0;
do {
    char = readPos(x, y, input, lineLength);
    if (String.fromCharCode(char) === '#') {
        trees++;
    }

    x += 3;
    if (x >= newlinePos) {
        x -= newlinePos;
    }
    y++
} while(char);
console.log(trees);