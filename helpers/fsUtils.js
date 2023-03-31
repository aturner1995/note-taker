const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination,content) => {
    fs.writeFile(destination, JSON.stringify(content), (err) => {
        if (err) {
            console.log(err);
        }
    })
}

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err,data) => {
        if (err) {
            console.error(err);
        }
        else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file,parsedData);
        }
    })
}

module.exports = { readFromFile, writeToFile, readAndAppend };