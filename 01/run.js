const fs = require('fs');

// Set starting point of frequency counter
const START_FREQ = 0;

// TODO Read this data from the Advent of code URL rather than local
// https://adventofcode.com/2018/day/1/input
fs.readFile('./input.txt', 'utf8', (err, contents) => {
    if(err) throw err;
    
    // Convert data to array and convert strings to ints
    const data = contents.split("\n").map(s => parseInt(s, 10));

    // Question 1
    const answer1 = applyChangeArray(START_FREQ, data);
    console.log(`Answer 1 = ${answer1}`);

    // Question 2
    const answer2 = findDuplicateResult(START_FREQ, data);
    console.log(`Answer 2 = ${answer2}`);
});

/**
 * Reduce array of changes to a signle accumulated value
 * @param {number} start - Start value for result
 * @param {array} arr - Array of change values to apply
 */
const applyChangeArray = (start, arr) => {
    return arr.reduce((acc, current) => (acc + current), start);
}

/**
 * Loop through change array continuously, building a Set of
 * unique results and exiting when the first duplicate is seen
 * @param {number} start - Start value for result
 * @param {array} arr - Array of change values to apply
 */
const findDuplicateResult = (start, arr) => {
    let i = 0;
    let count = start;
    let firstDup = null;
    const results = new Set();
    const length = arr.length;

    // While no result found
    while(!firstDup) {
        // Calculate intermediate result
        count += arr[i % length]; 
        // If result has been seen before then register as result
        if(results.has(count)) {
            firstDup = count;
        }
        // Add intermediate to result Set
        results.add(count);
        i++;
    }
    return firstDup;
}