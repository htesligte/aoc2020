const fs = require('fs');
const data = fs.readFileSync('data.txt').toString();
let lines = data.split("\n").map(v => parseInt(v));
const differences = {1: 0, 2: 0, 3: 0};
let currentAdapter = 0;
while (true) {
    let foundAdapter = false;
    for (i = 1; i <= 3; i++) {
        if (lines.includes(currentAdapter+i)) {
            currentAdapter += i;
            differences[i]++;
            foundAdapter = true;
            break;
        }
    }

    if (!foundAdapter) {
        differences[3]++;
        // currentAdapter is nu max
        console.log(differences[1] * differences[3]);
        break;
    }
}