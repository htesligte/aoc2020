const fs = require('fs');
const data = fs.readFileSync('data.txt').toString();
let lines = data.split("\n");

const findSeat = (pos, type) => {
    let y = pos.y;
    let x = pos.x;
    switch (type) {
        case 'up': 
            while (y > 0) {
                y--;
                if (lines[y][x] != '.') {
                    return {y, x};
                }
            }        
            return false;

        case 'up-right':
            while (y > 0 && x < lines.length) {
                y--;
                x++;
                if (lines[y][x] != '.') {
                    return {y, x};
                }
            }
            return false;

        case 'right':
            while (x < lines[pos.y].length) {
                x++;
                if (lines[y][x] != '.') {
                    return {y, x};
                }
            }
            return false;

        case 'down-right':
            while (x < lines[pos.y].length && y < lines.length-1) {
                x++;
                y++;
                if (lines[y][x] != '.') {
                    return {y, x};
                }
            }
            return false;
        
        case 'down':
            while (y < lines.length-1) {
                y++;
                if (lines[y][x] != '.') {
                    return {y, x};
                }
            }
            return false;

        case 'down-left':
            while (y < lines.length-1 && x > 0) {
                y++;
                x--;
                if (lines[y][x] != '.') {
                    return {y, x};
                }
            }
            return false;

        case 'left':
            while (x > 0) {
                x--;
                if (lines[y][x] != '.') {
                    return {y, x};
                }
            }
        return false;

        case 'up-left':
            while (x > 0 && y > 0) {
                x--;
                y--;
                if (lines[y][x] != '.') {
                    return {y, x};
                }
            }
            return false;
        
    }
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
            let seats = [];
            // up
            seats.push(findSeat({y, x}, 'up'));
            // up-right
            seats.push(findSeat({y, x}, 'up-right'));
            // right
            seats.push(findSeat({y, x}, 'right'));
            // down-right
            seats.push(findSeat({y, x}, 'down-right'));
            
            // down
            seats.push(findSeat({y, x}, 'down'));
            // down-left
            seats.push(findSeat({y, x}, 'down-left'));
            // left
            seats.push(findSeat({y, x}, 'left'));
            // up-left
            seats.push(findSeat({y, x}, 'up-left'));
            seats = seats.filter((seat) => !!seat);

            let occupied = 0;
            for (const adjacent of seats) {
                if (lines[adjacent.y][adjacent.x] === '#') {
                    occupied++;
                }
            }
            if (lines[y][x] === 'L' && occupied === 0) {
                changes.push({y, x});
            }
            if (lines[y][x] === '#' && occupied >= 5) {
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