const fs = require('fs');
const data = fs.readFileSync('data.txt').toString();

const getCompletePassportLines = (data) => {
    const validPassports = [];
    let prevPos = 0;
    let pos = data.indexOf("\n\n");
    do {
        let str = data.substring(prevPos, pos);
        str = " " + str.split("\n").join(" ");
        if (
            str.indexOf(" byr:") >= 0 &&
            str.indexOf(" iyr:") >= 0 &&
            str.indexOf(" eyr:") >= 0 &&
            str.indexOf(" hgt:") >= 0 &&
            str.indexOf(" hcl:") >= 0 &&
            str.indexOf(" ecl:") >= 0 &&
            str.indexOf(" pid:") >= 0 
        ) {
            validPassports.push(str.trim());
        }
        prevPos = pos+2;
        pos = data.indexOf("\n\n", prevPos);
    } while (pos !== -1)
    return validPassports;
}

const isValidPassportField = (field, value) => {
    let retVal = true;
    switch(field) {
        case 'byr':
            if (!value.match(/[0-9]{4}/)) {
                return false;
            }
            if (parseInt(value) < 1920 || parseInt(value) > 2002) {
                return false;
            }
            return true;

        case 'iyr':
            if (!value.match(/[0-9]{4}/)) {
                return false;
            }
            if (parseInt(value) < 2010 || parseInt(value) > 2020) {
                return false;
            }
            return true;

        case 'eyr':
            if (!value.match(/[0-9]{4}/)) {
                return false;
            }
            if (parseInt(value) < 2020 || parseInt(value) > 2030) {
                return false;
            }
            return true;

        case 'hgt':
            if (!value.match(/[0-9]+(cm|in)/)) {
                return false;
            }
            if (value.indexOf("cm") !== -1) {
                return parseInt(value) >= 150 && parseInt(value) <= 193;
            }
            if (value.indexOf("in") !== -1) {
                return parseInt(value) >= 59 && parseInt(value) <= 76;
            }
            return false;
        
        case 'hcl':
            return !!value.match(/#[0-9a-z]{6}/) && value.length === 7; 

        
        case 'ecl':
            return !!value.match(/amb|blu|brn|gry|grn|hzl|oth/);
        
        case 'pid':
            return !!value.match(/[0-9]{9}/) && value.length === 9;
        
        case 'cid':
            return true;
    }
    return false;
}

const isValidPassportLine = (passportLine) => {
    for (const passportField of passportLine.split(" ")) {
        const [field, value] = passportField.split(":");
        const retVal = isValidPassportField(field, value);
        if (!retVal) {
            return false;
        }
    }
    return true;
}

let valid = 0;
for (const passportLine of getCompletePassportLines(data)) {
    if (isValidPassportLine(passportLine.trim())) {
        valid++;
    }
}

console.log(valid);