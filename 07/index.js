'use strict';

const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, content) => {
    if (err) throw new Error(err);
    const nodes = buildNodes(content);
    const startNode = getStartNode(nodes);
});

/**
 * Convert input string into graph nodes with dependencies
 * @param {string} str
 */
const buildNodes = str => {
    const reg = /Step (\w) must be finished before step (\w) can begin./
    const nodes = new Map();
    str.split('\n').forEach(line => {

        const [, node, dep] = reg.exec(line);
        const current = nodes.get(node) || [];

        nodes.set(node, [...current, dep])
    })
    return nodes;
}

/**
 * Determine start node (i.e is a dependency but has no dependencies of its own_
 * @param {Map} graph - Map of nodes and their dependencies
 */
const getStartNode = graph => {
    let result = new Set();

    // For each node/dep pair
    graph.forEach((deps, node) => {
        // If node has no dependencies it can be a start node
        if(!deps.length) {
            result.add(node);
        }

        // If dependency not listed as having its own dependencies then it can be a start node.
        deps.forEach(dep => {
            if(!graph.has(dep)) {
                result.add(dep);
            }
        })
    });

    // If multiple potential start nodes, sort alphabetically and start with the first
    const resultArr = [...result];
    if(resultArr.length !== 1) resultArr.sort();

    return resultArr[0];
}