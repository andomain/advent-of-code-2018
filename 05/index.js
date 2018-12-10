const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, content) => {
    if (err) throw new Error(err);

    const result = [];

    result[0] = react(content).length;
    console.log(result[0]);

});

/**
 * Reduce a string by removing polar opposites
 * @param {string} str - Polymer to react
 */
const react = str => {
    const stack =[];
    str.split('').forEach(c => {
        if (!stack.length || !areOpposite(peek(stack), c)) {
            stack.push(c);
        } else {
            stack.pop();
        }
    })

    return stack.join('');
}

/**
 * Implement a stack peek method
 * @param {array} stack
 */
const peek = (stack) => (stack[stack.length - 1]);

/**
 * Dtermine if two characters are the same but opposite cases
 * @param {string} a
 * @param {string} b
 */
const areOpposite = (a, b) => {
    // If characters are not the same return false
    if (a.toLowerCase() !== b.toLowerCase()) {
        return false;
    }

    // If a is lowercase, return true if b is uppercase or vice versa
    return isUpperCase(a) ? isUpperCase(b, false) : isUpperCase(b);
}

/**
 * Check if a character is upper/lower case (default upper)
 * @param {string} c
 * @param {boolean} upper - Check for upper case
 */
const isUpperCase = (c, upper = true) => {
    if (upper) {
        return c === c.toUpperCase();
    }
    return c === c.toLowerCase();
}