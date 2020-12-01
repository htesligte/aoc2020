const fs = require('fs');
const data = fs.readFileSync('data.txt');
const array = data.toString().split("\n");

for (x = 0; x < array.length; x++) {
    for (y = x+1; y < array.length; y++) {
        for (z = y+1; z < array.length; z++) {
            if (
                parseInt(array[x]) +
                parseInt(array[y]) +
                parseInt(array[z]) === 2020
            ) {
                console.log(array[x], array[y], array[z]);
                console.log(array[x] * array[y] * array[z]);
            }
        }
            
        
    }
}