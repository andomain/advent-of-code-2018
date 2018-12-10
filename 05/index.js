const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, content) => {
    if (err) throw new Error(err);

    const result = [];

    const pass1 = react(content);

    result[0] = pass1.compound.length;

    const characters = pass1.chars;
    console.log(stripChar(content, 'a'));
});

/**
 * Reduce a string by removing polar opposites
 * @param {string} str - Polymer to react
 */
const react = str => {
    const stack =[];
    const dict = new Set();
    str.split('').forEach(c => {
        dict.add(c.toLowerCase());
        if (!stack.length || !areOpposite(peek(stack), c)) {
            stack.push(c);
        } else {
            stack.pop();
        }
    })

    return {
        compound: stack.join(''),
        chars: [...dict].sort(),
    };
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

/**
 * Remove case-insensitive characters from a string
 * @param {string} str - String to process
 * @param {string} c - character to remove
 */
const stripChar = (str, c) => {
    const reg = new RegExp(c, "ig");
    return str.replace(reg, '');
}