const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, content) => {
    if(err) throw new Error(err);

    const result = new Array(2);
    const data = processInput(content);

    result[0] = sumMetadata([...data]);
    result[1] = sumChildNodes([...data]);

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
const sumMetadata = input => {
    const children = input.shift();
    const meta = input.shift();
    let result = 0;

    for(let i = 0; i < children; i++) {
        result += sumMetadata(input);
    }

    for(let j = 0; j < meta; j++) {
        result += input.shift();
    }

    return result;
}

/**
 * Calculate the value of the root node
 * @param {array} input
 */
const sumChildNodes = input => {
    const children = input.shift();
    const childValues = new Array();
    const meta = input.shift();
    const metaValues = new Array();
    let result = 0;

    // If no children, sum the meta fields
    if(children === 0) {
        for(let i = 0; i < meta; i++) {
            const tmp = input.shift();
            result += tmp;
        }
        return result;
    }

    // Recursively sum children
    for(let i = 0; i < children; i++) {
        childValues[i] = sumChildNodes(input);
    }

    // Store which children to use (subtract one to use as array index)
    for(let j = 0; j < meta; j++) {
        metaValues[j] = input.shift() - 1;
    }

    // Sum children according to meta values
    result += metaValues.reduce((acc, meta) => {
        acc += childValues[meta] || 0;
        return acc;
    }, 0);

    return result;
}
