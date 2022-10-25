const graph = require('./graph');

const dijkstra = (map, source, destination) => {
    
    //access destination: map[destination.x][destination.y]
    //access source: map[source.x][source.y]

/*
{
  x: 0,
  y: 0,
  logic: 0,
  srcDistance: Infinity,
  neighbors: [
    [ [Object], 1 ],
    [ [Object], 1 ],
    [ [Object], 1.4142135623730951 ]
  ]
}
*/
    const path = [];
    const source = map[source.x][source.y];
    source.srcDistance = 0;
    //start at source node

    //create a visited array to track all processed nodes

    //set all other nodes to infinity

    //update path length for each vertex, if it has NOT been visited

    //if path length is less, update next node to that vertex


    const visited = [];
    const processed = [];
    processed.push(source);

    const lowestCostNode = (processed) => {
        let lowestCost = Infinity;
        let lowestNode = null;
        processed.forEach(node => {
            node.forEach(neighbor => {
                if(neighbor[1] < lowestCost) {
                    lowestCost = neighbor[1];
                    lowestNode = neighbor[0];
                }
            })
        });
        return lowestNode;
    }

    const minDistance = (node, edge, source) => {
        let sourceNodeDistance = source.srcDistance
        if(sourceNodeDistance + edge < node.srcDistance) {
            node.srcDistance = sourceNodeDistance + edge
            node.path.push(source)
        }
    }

    while(node != destination) {
        let currentNode = lowestCostNode(processed)
        currentNode.forEach(neighbor => {
            if(!visited.includes(neighbor)) {
                minDistance(neighbor[0],neighbor[1],currentNode)
                processed.push(neighbor)
            }
        })
        visited.push(currentNode)
    }
 
    return visited;
}
module.exports = dijkstra;