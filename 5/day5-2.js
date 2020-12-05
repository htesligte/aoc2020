const fs = require('fs');

const getPos = (chars, min, max) => {
    for (const c of chars.split('')) {
        const num = Math.ceil((max - min) / 2);
        if (c === 'F' || c === 'L') {
            max -= num;
        } else {
            min += num;
        }
    }
    if (min !== max) {
        throw new Error("something broke :(");
    }
    return min;
}

const findMySeat = (seats, maxSeatId) => {
    for (let i = 1; i <= maxSeatId; i++) {
        if (!seats.includes(i)) {
            if (seats.includes(i-1) && seats.includes(i+1)) {
                return i;
            }
        }
    }
    throw new Error(":(");
} 

const data = fs.readFileSync('data.txt').toString();
const lines = data.split("\n");
let maxSeatId = 0;
const seats = [];
for (line of lines) {
    const matches = line.match(/([FB]+)([RL]+)/);
    const row = getPos(matches[1], 0, 127);
    const col = getPos(matches[2], 0, 7);
    const seatId = row * 8 + col;
    if (seatId > maxSeatId) {
        maxSeatId = seatId;
    }
    seats.push(seatId);
}
console.log(maxSeatId);
console.log(findMySeat(seats, maxSeatId));