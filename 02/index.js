const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, content) => {
    if (err) throw err;

    // Process input string
    const data = processInput(content);
    // Convert input data into lookup of each ID
    const lookup = buildLookup(data);
    // Comvert array of lookups into checksum
    const result = calcChecksum(lookup);
    console.log(`Answer = ${result}`);
});

/**
 * Convert inut string into usable array of IDs
 * Split into individual Ids, sort alphabetically and remove any
 * non-prepeated characters
 * @param {string} input - Multiline input string
 */
const processInput = input => {
    return input.split('\n')
        .map(l => l.split('').sort()
            .filter(filterRepeatChar).join('')
        )
        .map(str => maxStringLengths(str));
}

/**
 * Take an array of records of repeated characters in IDs
 * and build an overall result
 * TODO: Remove need to initialise, making it more generic
 * TODO: Convert into a reduce 
 * @param {array} arr - Array of Id records
 */
const buildLookup = arr => {
    const result = {
        2: 0,
        3: 0,
    };
    arr.forEach(id => {
        id.forEach(count => {
            result[count] = result[count] += 1;
        });
    });
    return result;
}

/**
 * Calculate the checksum from the lookup 
 * @param {object} - Lookup record of ID data
 */
calcChecksum = lookup => {
    let tmp = 1;
    Object.keys(lookup).forEach(key => (tmp *= lookup[key]));
    return tmp;
} 

/**
 * Build a Set of unique repeated character lengths
 * @param {string} - Input string 
 */
maxStringLengths = str => {
    const n = str.length; 
    const res = new Set(); 
    let count = 1; 

    for(let i = 0; i < n; i++) {
        if((i < (n - 1)) && str[i] === str[i+1]) {
            count++;
        } else {
            res.add(count);
            count = 1;
        }
    }

    return res;
}

/**
 * Filter callback to remove any non repeated characters in a string array
 */
filterRepeatChar = (ch, idx, arr) => {
    if (idx === 0) return ch === arr[idx + 1];
    if (idx === arr.length - 1) return ch === arr[idx - 1];
    return ch === arr[idx + 1] || ch === arr[idx - 1];
}