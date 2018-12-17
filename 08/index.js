const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, content) => {
    if(err) throw new Error(err);

    const result = new Array(2);
    const data = processInput(content);

    result[0] = processNode(data);

    console.log(result);
});

/**
 * Convert input to array of integers
 * @param {string} str 
 */
const processInput = str => str.split(/\s+/).map(s => parseInt(s));

/**
 * Parse data stream and sum meta fields 
 * @param {array} input 
 */
const processNode = input => {
    const children = input.shift();
    const meta = input.shift();
    let result = 0;

    for(let i = 0; i < children; i++) {
        result += processNode(input);
    }

    for(let j = 0; j < meta; j++) {
        result += input.shift();
    }

    return result;
}
