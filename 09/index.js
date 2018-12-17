const fs = require('fs');

const args = process.argv.slice(2);

try {
    if (args.length !== 1) {
        throw new Error('Usage: index.js <inputFile>');
    }

    fs.readFile(args[0], 'utf8', (err, content) => {
        if (err) throw new Error(err);
        const data =processInput(content);
        console.log(data);
    });

} catch(e) {
    console.log(e);
}

processInput = str => {
    const reg = /(\d+) players; last marble is worth (\d+) points/;
    const isTestReg = /\: high score is (\d+)$/;

    return str.split('\n').map(line => {
        const matches = reg.exec(line);
        const isTest = isTestReg.exec(line);

        return {
            players: matches[1],
            lastMarble: matches[2],
            test: isTest ? isTest[1] : null,
        }
    })
}