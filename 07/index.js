const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, content) => {
    const result = new Array(2);

    const lines = getLines(content);
    const graph = buildGraph(lines);
    result[0] = buildPath(graph);

    console.log(result);
});

/**
 * Convert input string into node/branch data
 * @param {string} str 
 */
const getLines = str => {
    const reg = /Step (\w) must be finished before step (\w) can begin./
    return str.split('\n').map(line => {
        const [, node, dep] = reg.exec(line);
        return { node, dep }
    });
}

/**
 * Convert an array of nodes/branches and build a graph
 * @param {array} input - Array of graph data
 */
const buildGraph = input => {
    const graph = {};
    input.forEach(({ node, dep }) => {
        const prev = graph[`${dep}`] || [];
        graph[`${dep}`] = [...prev, node];
        if (!graph[`${node}`]) {
            graph[`${node}`] = [];
        }
    });
    return graph;
}

/**
 * Get the first alphabetical node with 0 dependencies
 * @param {object} graph 
 */
const getStartNode = graph => {
    const result = Object.keys(graph).filter(node => graph[`${node}`].length === 0);

    // Return the first alphabetical candidate
    return result.sort()[0];
}

/**
 * Loop through the array building the path
 * @param {object} graph 
 */
const buildPath = graph => {
    let result = '';
    let tmp = JSON.parse(JSON.stringify(graph));
    while (Object.keys(tmp).length) {
        const startNode = getStartNode(tmp);
        result += startNode;
        tmp = updateDependencies(tmp, startNode);
    }
    return result;
}

/**
 * Remove a node from the graph and any dependencies
 * @param {object} graph 
 * @param {string} node  
 */
updateDependencies = (graph, node) => {
    delete graph[node];
    Object.keys(graph).forEach(graphNode => {
        const index = graph[graphNode].indexOf(node);
        if (index > -1) {
            graph[graphNode].splice(index, 1);
        }
    });
    return graph;
}