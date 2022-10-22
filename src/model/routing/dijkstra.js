const graph = require('./graph');

const dijkstra = (map, source, destination) => {
    
    //access destination: map[destination.x][destination.y]
    //access source: map[source.x][source.y]
    const path = [];
    const src = map[source.x][source.y]; 
    const srcDistance = src.srcDistance = 0;
    
    const visited = [];

    for(let row = 0; row < map.length; row++) {

    }
    visited.push(src);
    src.neighbors.forEach(element => {
        if(element.srcDistance === 1) {
            element.srcDistance += srcDistance 
        }
    });

    function lowestCostNode(source, neighbors) {
        let lowest = Infinity;
        map[]
        return lowest;
    }
    

    return path;
}
module.exports = dijkstra;