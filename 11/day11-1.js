const fs = require('fs');
const data = fs.readFileSync('data.txt').toString();
let lines = data.split("\n");

const getSeat = (x, y) => {
    return lines[y][x];
}

const replaceAt = (string, i, c) => {
    return string.substr(0, i) + c + string.substr(i+1);
}

const applyChanges = (changes) => {
    for (const change of changes) {
        if (lines[change.y][change.x] === '#') {
            lines[change.y] = replaceAt(lines[change.y], change.x, 'L');
        }
        else if (lines[change.y][change.x] === 'L') {
            lines[change.y] = replaceAt(lines[change.y], change.x, '#');
        }
        else if (lines[change.y][change.x] === '.') {
            throw new Error("Cannot change the floor :o");
        }
    }
}

debugLines = () => {
    for (const line of lines) {
        console.log(line);
    }
    console.log("");
    console.log("");
    console.log("");
    console.log("");
    console.log("");
}

let changes = [];
// first just read all seats

let it = 0;
do {
    changes = [];
    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) {
            if (lines[y][x] === '.') {
                continue;
            }

            // find adjacent seats
            const seats = [];
            // up
            y > 0 ? seats.push({y: y-1, x: x}) : null;
            // up-right
            y > 0 && x < lines[y-1].length-1 ? seats.push({y: y-1, x: x+1}) : null;
            // right
            x < lines[y].length-1 ? seats.push({y: y, x: x+1}) : null;
            // bottom-right
            y < lines.length-1 && x < lines[y].length-1 ? seats.push({y: y+1, x: x+1}) : null;
            // bottom
            y < lines.length-1 ? seats.push({y: y+1, x: x}) : null;
            // bottom-left
            y < lines.length-1 && x > 0 ? seats.push({y: y+1, x: x-1}) : null; 
            // left
            x > 0 ? seats.push({y: y, x: x-1}) : null;
            // top-left
            y > 0 && x > 0 ? seats.push({y: y-1, x: x-1}) : null;

            let occupied = 0;
            for (const adjacent of seats) {
                if (lines[adjacent.y][adjacent.x] === '#') {
                    occupied++;
                }
            }
            if (lines[y][x] === 'L' && occupied === 0) {
                changes.push({y, x});
            }
            if (lines[y][x] === '#' && occupied >= 4) {
                changes.push({y, x});
            }
        }
    }
    it++;
    applyChanges(changes);
} while(changes.length > 0);

let occupied = 0;
for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
        if (lines[y][x] === '.') {
            continue;
        }
        if (lines[y][x] === '#') {
            occupied++;
        }
    }
}
console.log(occupied);