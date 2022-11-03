const dijkstra = (map, src, destination) => {

    let mapNode = (node) => map[node.x][node.y]

    
    const source = mapNode(src);
    source.srcDistance = 0 

    const settled = [];
    const unsettled = [];
    unsettled.push(source);

    const lowestDistanceNode = (unsettled) => {
        let lowestDistance = Infinity;
        let lowestDistanceNode = null;
        unsettled.forEach(node => {
            if(node.srcDistance < lowestDistance) {
                lowestDistance = node.srcDistance
                lowestDistanceNode = node
            }
        });
        // console.log(lowestDistanceNode)
        return mapNode(lowestDistanceNode);
    }

    const shortestPath = []

    let count = 0
    const minDistance = (evaluationNode, edgeWeight, sourceNode) => {
        const sourceDistance = sourceNode.srcDistance
        if(sourceDistance + edgeWeight < evaluationNode.srcDistance) {
            mapNode(evaluationNode).srcDistance = sourceDistance + edgeWeight
            const shortestPath = sourceNode.path
            if(!shortestPath.includes(sourceNode)) {
                shortestPath.push(sourceNode)
            }     
            mapNode(evaluationNode).path = shortestPath  
            // let length = 0;
            // shortestPath.forEach(node => length += node.srcDistance) 
            // console.log( count + "    (" + evaluationNode.x + " " + evaluationNode.y + ")     " + "    (" + sourceNode.x + " " + sourceNode.y + ")     " + evaluationNode.srcDistance + "    " + length) 
            // if(evaluationNode.srcDistance > length) {
            //     mapNode(evaluationNode).path = shortestPath 
            // } 
            // count++
        }
    }

    //CurrentNode.x != destination.x && currentNode.y != destination.y
    let currentNode = source
    while(!unsettled.includes(mapNode(destination))) {
        let temp = currentNode
        currentNode = lowestDistanceNode(unsettled)
        while(currentNode === null) {
            unsettled.splice(unsettled.indexOf(temp), 1)
            currentNode = lowestDistanceNode(unsettled)
        }
        currentNode.path.push(currentNode)
        unsettled.splice(unsettled.indexOf(currentNode), 1)
        currentNode.neighbors.forEach(neighbor => {
           let adjacentNode = mapNode(neighbor[0])
           let edgeWeight = neighbor[1]
           if(adjacentNode.logic === 0 && !settled.includes(adjacentNode) && !unsettled.includes(adjacentNode)) {
            minDistance(adjacentNode, edgeWeight, currentNode)
            unsettled.push(adjacentNode)
           } 
        })
        settled.push(currentNode)
    }
    
    const temp = mapNode(destination).path
    // temp.push(mapNode(destination))
    const node = temp[temp.length - 2]
    // temp.forEach(i => {
    //     console.log(i.x + " " + i.y)
    // })
    // console.log(node.x + " " + node.y);
    // minDistance()
    // console.log(temp)
    console.log( mapNode(destination).path)
}
module.exports = dijkstra;