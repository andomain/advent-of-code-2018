const fs = require('fs');

// Set starting point of frequency counter
const START_FREQ = 0;

// Initialise counters/flags
let freq = START_FREQ;
const seenFreq = new Set();
let firstSeen = null;
let index = 0;

// TODO Read this data from the Advent of code URL rather than local
// https://adventofcode.com/2018/day/1/input
fs.readFile('./input.txt', 'utf8', (err, contents) => {
    if(err) throw err;
    
    // Convert data to array 
    const data = contents.split("\n");
    const dataLength = data.length;

    // Loop through array and increment frequency counter
    data.forEach(entry => {
        const change = parseInt(entry, 10);
        freq += change;
    });
    console.log(`Answer 1 = ${freq}`);

    // Reset frequency count;
    freq = START_FREQ;

    // Build up Set of observed frequencies, exit when duplicate seen
    while(!firstSeen) {
        const thisIndex = index % dataLength;
        const thisEntry = parseInt(data[thisIndex], 10);
        freq += thisEntry;

        if(seenFreq.has(freq)) {
            firstSeen = freq;
        }
        seenFreq.add(freq);
        index++;
    };
    console.log(`Answer 2 = ${firstSeen}`);
});
