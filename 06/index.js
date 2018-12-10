const { max, maxBy } = require('lodash');
const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, content) => {
    if (err) throw new Error(err);
    const coordinates = getCoordinates(content);
});

/**
 * Convert input string to array of coordinates
 * @param {string} str 
 */
const getCoordinates = str => {
    return str.split('\n').map(line => line.split(', '));
}

const getDistance = ([x1,y1], [x2,y2]) => {
    return (Math.abs(x1 - x2) + Math.abs(y1 - y2));
}