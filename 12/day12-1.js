const fs = require('fs');
const data = fs.readFileSync('data.txt').toString();
let lines = data.split("\n");

let heading = 90;
let pos = {y: 0, x: 0};

changePos = (d, u) => {
    switch (d) {
        case 'N':
            pos.y += u;
            break;
        
        case 'E':
            pos.x += u;
            break;
        
        case 'S':
            pos.y -= u;
            break;

        case 'W':
            pos.x -=u;
            break;
        }
}

changeHeading = (d, deg) => {
    if (d === 'L') {
        heading -= deg;
        if (heading < 0) {
            heading += 360;
        }
    } else {
        heading += deg;
        if (heading >= 360) {
            heading -= 360;
        }    
    }
}


moveForward = (u) => {
    // luckily for challenge 1 we don't have odd degrees so we will only move in one direction
    if (heading === 0) {
        changePos('N', u);
    } else if(heading === 90) {
        changePos('E', u);
    } else if (heading === 180) {
        changePos('S', u);
    } else if (heading === 270) {
        changePos('W', u);
    }
}

for (const line of lines) {
    const c = line[0];
    const u = parseInt(line.substr(1));
    if (['N', 'E', 'S', 'W'].includes(c)) {
        changePos(line[0], u);
    }
    else if(c === 'F') {
        moveForward(u);
    }
    else {
        changeHeading(line[0], u);
    }
}

console.log(Math.abs(pos.x) + Math.abs(pos.y));