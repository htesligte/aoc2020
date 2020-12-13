const fs = require('fs');
const data = fs.readFileSync('data.txt').toString();
let lines = data.split("\n");
const busses = lines[1].
    split(",").
    map((id, offset) => {return {
        id: id === 'x' ? 'x' : parseInt(id),
        offset: parseInt(offset)
    }}).
    filter((bus) => bus.id !== 'x');


let largest = {id: 0, offset: 0};
busses.map((b) => {
    if (b.id > largest.id) {
        largest = b;
    }
});
const remainingBusses = busses.filter((b) => {
    return b.id !== largest.id;
});
remainingBusses.sort((a, b) => {
    return b.id - a.id;
});

let m = 0;
let l = 0;
while(true) {
    let x = 0;
    const timestamp = m-largest.offset;
    for (let i = 0; i < remainingBusses.length; i++) {
        const bus = remainingBusses[i];
        if ((timestamp + bus.offset) % bus.id === 0) {
            x++;
        } else {
            break;
        }
    }
    if (x === remainingBusses.length) {
        console.log(timestamp);
        break;
    }
    m += largest.id;
    if (l > 10000000) {
        console.log(m);
        l = 0;
    }
    l++;
}

// 415579909630020