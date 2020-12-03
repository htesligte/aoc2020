const fs = require('fs');
const readPos = (x, y, input, lineLength) => {
    const charPos = x + y * lineLength;
    return input[charPos];
}

const findTrees = (stepX, stepY) => {
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

        x += stepX;
        if (x >= newlinePos) {
            x -= newlinePos;
        }
        y += stepY
    } while(char);
    return trees;
}

console.log(
    findTrees(1, 1) * 
    findTrees(3, 1) * 
    findTrees(5, 1) *  
    findTrees(7, 1) * 
    findTrees(1, 2)
);