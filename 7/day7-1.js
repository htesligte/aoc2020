const fs = require('fs');
const data = fs.readFileSync('data.txt').toString();
const lines = data.split("\n");

let uniqueParents = [];

const getParentColors = (color) => {
    for (const line of lines) {
        if (line.indexOf(color) === -1 || line.indexOf("no other") !== -1) {
            continue;
        }
        const parentColorArr = line.substring(0, line.indexOf(" bags contain")).split(" ");
        const parentColor = parentColorArr[parentColorArr.length -1];
        if (!uniqueParents.includes(parentColor)) {
            uniqueParents.push(parentColor);
            getParentColors(parentColor, lines);
        }
    }
}
getParentColors("shiny gold");
console.log(uniqueParents, uniqueParents.length);