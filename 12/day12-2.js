const fs = require('fs');
const data = fs.readFileSync('data.txt').toString();
let lines = data.split("\n");

const posShip = {y: 0, x: 0};
const posWp = {y: 1, x: 10};

changeWp = (d, u) => {
    switch (d) {
        case 'N':
            posWp.y += u;
            break;
        
        case 'E':
            posWp.x += u;
            break;
        
        case 'S':
            posWp.y -= u;
            break;

        case 'W':
            posWp.x -=u;
            break;
        }
}

turnWp = (d, deg) => {
    const t = deg/90;
    if (t == 2) {
        turnWp(d, 90); // yeah I know how lazy this is come fight me
    }
    if (t == 3) {
        turnWp(d, 90);
        turnWp(d, 90);
    }
    if (d == 'R') {
        const y = 0-posWp.x;
        const x = posWp.y;
        posWp.y = y;
        posWp.x = x;
    } else {
        const y = posWp.x;
        const x = 0-posWp.y;
        posWp.y = y;
        posWp.x = x;
    }
}

moveForward = (u) => {
    posShip.x = posShip.x + (posWp.x * u);
    posShip.y = posShip.y + (posWp.y * u);
}

for (const line of lines) {
    const c = line[0];
    const u = parseInt(line.substr(1));
    if (['N', 'E', 'S', 'W'].includes(c)) {
        changeWp(line[0], u);
    }
    else if(c === 'F') {
        moveForward(u);
    }
    else {
        turnWp(line[0], u);
    }
}

console.log(Math.abs(posShip.x) + Math.abs(posShip.y));