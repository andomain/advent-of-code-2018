'use strict';

const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, content) => {
    const claims = getClaims(content);

    console.log(`Answer 1 - ${getOverlaps(claims)}`);
    console.log(`Answer 2 - ${uniqueClaim(claims)}`);
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
    let result = 0;
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

/**
 * Find a unique, non overlapping claim
 * @param {array} claims - Array of claims
 */
const uniqueClaim = (claims) => {
    for (let a = 0; a < claims.length; ++a) {
        let unique = true;
        for (let b = 0; b < claims.length; ++b) {
            if (a === b) continue;
            if (overlaps(claims[a], claims[b])) {
                unique = false;
                break;
            }
        }

        if (unique) return claims[a].id;
    }
}

/**
 * Calculate if two claims overlap
 * @param {claim} a 
 * @param {claim} b 
 */
const overlaps = (a, b) => {
    return (
        (a.x < b.x + b.w) &&
        (a.y < b.y + b.h) &&
        (b.x < a.x + a.w) &&
        (b.y < a.y + a.h)
    );
}
