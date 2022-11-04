/**
 * The Dijkstra algorithm is a greedy algorithm that utilizes a weighted graph to produce the 
 * shortest path between two nodes in the graph.  
 * @param {Array} graph a weighted and directed graph represented by a 2D array
 * @param {Object} start the source node
 * @param {Object} end the destination node
 * @returns {Array} containing the shortest path from the source to end nodes
 */

const dijkstra = (graph, start, end) => {
    const map = [...graph];


    /**
     * Will quickly and more efficiently help to reference nodes in the graph without 
     * using map[x][y] each time a node is referenced
     * @param {Object} node references the x and y coordinates of the desired node in the map
     * @return {Object} a node representing a coordinate in the map
     */

    const mapNode = (node) => map[node.x][node.y];


    /**
     * Determines the node that is closest to the source node
     * @param {Array} unprocessed contains nodes that have been visited, but the calculations perfomed on those nodes are unfinished
     * @returns {Object} the closest node to the source node
     */

    const lowestCostNode = (unprocessed) => {
        let lowestCost = Infinity;
        let lowestCostNode = null;

        /*
            Determines which node in unprocessed is the closest to the source node.
            If a set of multiple nodes are the same distance to the source, then 
            the lowestCostNode will always be the last node in the set.
        */

        unprocessed.forEach(node => {
            if(node.srcDistance < lowestCost) {
                lowestCost = node.srcDistance;
                lowestCostNode = node;
            }
        });
        return mapNode(lowestCostNode);
    };
    

    /**
     * Will calculate the shortest path to the destination node by storing by progressively 
     * storing each node in the path each time this function is called
     * @param {Object} adjacentNode is the node next to the current node
     * @param {Number} edge is the distance between the adjacent and current nodes
     * @param {Object} currentNode is the node currently being processed
     */

    const calcLowestCost = (adjacentNode, edge, currentNode) => {
        const sourceDistance = currentNode.srcDistance + edge;
        const evalNode = mapNode(adjacentNode);

        if(sourceDistance < evalNode.srcDistance) {
            evalNode.srcDistance = sourceDistance;
            shortestPath = [...currentNode.path];
            
            if(!shortestPath.includes(currentNode)) {
                shortestPath.push(currentNode);
            };

            evalNode.path = shortestPath;
        };
    };


    /**
     * Will calculate the shortest path using the Dijkstra algorithm
     * @returns {Array} the shortest path between the start and end nodes
     */

    const algorithm = () => {
        const source = mapNode(start);
        const destination = mapNode(end);
        const processed = [];   // visited nodes in which all calculations have been completed
        const unprocessed = []; // visited nodes in which calculations are in progress

        let currentNode = source;

        source.srcDistance = 0;
        source.logic = 0;
        destination.logic = 0;

        unprocessed.push(source);

        while(!processed.includes(mapNode(destination))) {  // stop iterating when the destination node has been processed
            currentNode = lowestCostNode(unprocessed);
            currentNode.path.push(currentNode);

            /*
                currentNode will always be processed. 
                This will remove any processed nodes from the unprocessed
                nodes list
            */

            unprocessed.splice(unprocessed.indexOf(currentNode), 1);

            /*
                Iterate through the currentNode's neighboring nodes, and
                determine if each neighbor has been processed or is an obstacle
            */
           
            currentNode.neighbors.forEach(neighbor => {
                let adjacentNode = mapNode(neighbor[0]);
                if(adjacentNode.logic === 0 && !processed.includes(adjacentNode) && !unprocessed.includes(adjacentNode)) {
                    let edge = neighbor[1];
                    calcLowestCost(adjacentNode, edge, currentNode);
                    unprocessed.push(adjacentNode);
                }; 
            });
            processed.push(currentNode);
        };

        return destination.path;
    };

    return algorithm();
}
module.exports = dijkstra;