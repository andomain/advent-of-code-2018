'use strict';

const fs = require('fs');
let result = 0;

fs.readFile('./input.txt', 'utf8', (err, content) => {
    const claims = getClaims(content);
    const overlapCount = getOverlaps(claims);

    console.log(`Answer 1 - ${overlapCount}`);
});

/**
 * Parse the input into usable claims
 * @param {string} str - Input string
 * @return {array}
 */
const getClaims = (str) => {
    const reg = /\#(\d+) @ (\d+),(\d+): (\d+)x(\d+)/;
    return str.split('\n').map(line => {
        const matches = reg.exec(line.trim());
        return { id: parseInt(matches[1]), x: parseInt(matches[2]), y: parseInt(matches[3]), w: parseInt(matches[4]), h: parseInt(matches[5]) };
    });
}

/**
 * Calculate overlapping claims and return the count 
 * @param {array} claims - Array of claims to process
 */
const getOverlaps = claims => {
    const grid = {};
    claims.forEach(claim => {
        for (let x = claim.x; x < (claim.x + claim.w); x++) {
            for (let y = claim.y; y < (claim.y + claim.h); y++) {
                grid[`${x},${y}`] = (grid[`${x},${y}`] || 0) + 1;
            }
        }
    });

    for (let square of Object.values(grid)) {
        if (square > 1) {
            result++;
        }
    }

    return result;
}

