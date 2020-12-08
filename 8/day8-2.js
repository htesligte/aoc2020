const fs = require('fs');
let acc = 0;
getVal = (str) => {
    if (str[0] === '+') {
        return parseInt(str.substring(1));
    }
    return 0 - parseInt(str.substring(1));
}

const willProgramHang = (lines) => {
    const prevLines = [];
    let it = 0;
    acc = 0;
    while(it+1 < lines.length) {
        if (prevLines.includes(it)) {
            return true;
        }
        prevLines.push(it);
        const [ins, val] = lines[it].split(" ");
        switch (ins) {
            case 'acc':
                it++;
                acc += getVal(val);
                break;
            
            case 'nop':
                it++;
                break;

            case 'jmp':
                it += getVal(val);
                break;
        }
    }
    return false;
}

const run = () => {
    const data = fs.readFileSync('data.txt').toString();
    let lines = data.split("\n");
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].indexOf("acc") === 0) {
            continue;
        }
        if (lines[i].indexOf("jmp") === 0) {
            lines[i] = lines[i].replace("jmp", "nop");
            if (!willProgramHang(lines)) {
                console.log(i, lines[i], acc);
                return;
            }
        }
        if (lines[i].indexOf("nop") === 0) {
            lines[i] = lines[i].replace("jmp", "nop");
            if (!willProgramHang(lines)) {
                console.log(i, lines[i], acc);
                return;
            }
        }
        lines = data.split("\n");
    }
    console.log("program allways hangs :(");
}
run();