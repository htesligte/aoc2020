const fs = require('fs');
const data = fs.readFileSync('data.txt').toString();
const lines = data.split("\n");

let uniqueParents = [];

const getNumChilds = (color) => {
    let numChilds = 0;
    for (const line of lines) {
        if (line.indexOf(color) !== 0) {
            continue;
        }
        const matches = line.match(/([0-9]+) ([a-z ]+) bags?/g);
        if (!matches) {
            return 0;
        }

        for (child of matches) {
            const res = child.match(/([0-9]+) ([a-z ]+) bags?/);
            numChilds += parseInt(res[1]);
            numChilds += parseInt(res[1]) * getNumChilds(res[2]);
        }
        return numChilds;
    }
}
console.log(getNumChilds("shiny gold"));