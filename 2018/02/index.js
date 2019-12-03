const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, content) => {
    if (err) throw err;

    const lines = content.split('\n');

    // Process input string
    const data = sortAndStrip(lines);
    // Convert input data into lookup of each ID
    const lookup = buildLookup(data);
    // Convert array of lookups into checksum
    const result1 = calcChecksum(lookup);
    console.log(`Answer 1 = ${result1}`);

    // Search for similar strings
    const result2 = getSimilar(lines);
    console.log(`Answer 2 - ${result2}`);

});

/**
 * Convert inut string into usable array of IDs
 * Split into individual Ids, sort alphabetically and remove any
 * non-prepeated characters
 * @param {string} input - Multiline input string
 */
const sortAndStrip = arr => {
    return arr.map(l => l.split('').sort()
        .filter(filterRepeatChar).join('')
    ).map(str => maxStringLengths(str));
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

    for (let i = 0; i < n; i++) {
        if ((i < (n - 1)) && str[i] === str[i + 1]) {
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

/**
 * Loop through array of lines and compare for similarity
 * @param {array} - arr - Array of lines
 */
getSimilar = arr => {
    let a, b;
    const length = arr.length;
    let result = false;

    for (let i = 0; i <= length - 2; i++) {
        a = arr[i];
        for (let j = 1; j <= length - 1; j++) {
            if (i !== j) {
                b = arr[j];
                result = compareString(a, b);
                if (result) break;
            }
        }
        if(result) break;
    }
    return result;
}

/**
 * Compare two strings to check for similarity.
 * If only different by <=n chars then return
 * matching characters
 * @param {string} a
 * @param {string} b
 * @param {number} similarity - Max different chars
 */
compareString = (a, b, similarity = 1) => {
    const aSplit = a.split('');
    const bSplit = b.split('');
    const length = aSplit.length;

    let different = 0;
    let result = '';

    for (let i = 0; i <= length - 1; i++) {
        if (aSplit[i] === bSplit[i]) {
            result += aSplit[i];
        } else {
            different += 1;
            if (different > similarity) {
                different = 0;
                return false;
            }
        }
    }
    return result;

}