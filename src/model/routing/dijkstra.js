const dijkstra = (map, src, finish) => {

    const mapNode = (node) => map[node.x][node.y];

    const source = mapNode(src);
    const destination = mapNode(finish);

    const lowestDistanceNode = (unprocessed) => {
        let lowestDistance = Infinity;
        let lowestDistanceNode = null;

        unprocessed.forEach(node => {
            if(node.srcDistance < lowestDistance) {
                lowestDistance = node.srcDistance;
                lowestDistanceNode = node;
            }
        });
        return mapNode(lowestDistanceNode);
    };
    
    const minDistance = (adjacentNode, edge, currentNode) => {
        const sourceDistance = currentNode.srcDistance + edge;
        const evalNode = mapNode(adjacentNode);

        if(sourceDistance < evalNode.srcDistance) {
            evalNode.srcDistance = sourceDistance;
            const shortestPath = [...currentNode.path];
            
            if(!shortestPath.includes(currentNode)) {
                shortestPath.push(currentNode);
            };

            evalNode.path = shortestPath;
        };
    };

    const algorithm = () => {
        source.srcDistance = 0;
        source.logic = 0;
        destination.logic = 0;

        let currentNode = source;

        const processed = [];
        const unprocessed = [];

        unprocessed.push(source);

        while(!processed.includes(mapNode(destination))) {
            currentNode = lowestDistanceNode(unprocessed);
            currentNode.path.push(currentNode);
            unprocessed.splice(unprocessed.indexOf(currentNode), 1);

            currentNode.neighbors.forEach(neighbor => {
                let adjacentNode = mapNode(neighbor[0]);
                if(adjacentNode.logic === 0 && !processed.includes(adjacentNode) && !unprocessed.includes(adjacentNode)) {
                    let edge = neighbor[1];
                    minDistance(adjacentNode, edge, currentNode);
                    unprocessed.push(adjacentNode);
                }; 
            });
            processed.push(currentNode);
        };

        destination.path.forEach(node => {
            console.log(node.x + "," + node.y);
        });

        return [source,destination];
    }

    return algorithm();
}
module.exports = dijkstra;