/**
 * A* Search Algorithm builds ontop of the Dijkstra's Algorithm
 * The only difference is the addition of a heuristic
 * @param {Array} graph 
 * @param {Object} start 
 * @param {Object} end 
 * @returns {Array} shortest path using A* search
 */

const astar = (graph, start, end) => {
    /** What needs to be done:
     * 
     * 1.) reference nodes from the map
     * 2.) create variables
     * 3.) create heuristic
     * 4.) implement search algorithm
     * 
     * Pseudocode:

        push start onto openSet
        while(openSet is not empty) {
            currentNode = find lowest f in openSet
            if currentNode is final, return the successful path
            push currentNode onto closedSet and remove from openSet
            foreach neighbor of currentNode {
                if neighbor is not in openSet {
                save g, h, and f then save the current parent
                add neighbor to openSet
            }
            if neighbor is in openSetbut the current g is better than previous g {
                save g and f, then save the current parent
            }
        }
     */
    
    // 1.) refrences nodes from the map

    const map = [...graph];

    const mapNode = (node) => map[node.x][node.y];

    // 2.) create variables
    //let path = [];
    //let neighbors = []; // neighbors of the current grid point

    // 3.) create heuristic

    /** heuristic-- an educated guess of how far it is between two points
     * can use either Euclidean distance (uses pythagorean theorem) or
     * Manhattan distance which is the diff. between the x values + diff. between the y values
     * Manhattan distance shows all the real distances between sources and destination ie.
     * multiple potential routes
     * Euclidean distance - is the shortest path between source and destination
     * for more info: https://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
     * 
     * will use Manhattan distance since it is standard for square grids 
    */

    const heuristic = (position0, position1) => {
        let distance = Math.abs(position1.x - position0.x) + Math.abs(position1.y - position0.y);
  
        return distance;
    }
    
    // 4.) implement search algorithm

    /** Author: Khamilah Nixon
     * find lowest cost node in openSet
     * @param {Array} openSet array containing unevaluated grid points
     */

    const lowestCostNode = (openSet) => {
        let lowestCost = Infinity;
        let winner = null;

        openSet.forEach(node => {
            if(node.srcDistance < lowestCost) {
                lowestCost = node.srcDistance;
                winner = node;
            }
        });
        return mapNode(winner);
    };
    
    const search = () => {
        const source = mapNode(start);
        const destination = mapNode(end);
        const openSet = []; // array containing unvaluated grid points
        const closedSet = []; // array containing completely evaluated grid points

        let current = source;

        source.srcDistance = 0;
        source.logic = 0;
        destination.logic = 0;

        f = 0; // total cost function
        g = 0; // cost function from start to the current grid point
        h = 0; // heuristic estimated cost function from current grid point to the goal
        this.parent = undefined; // immediate source of the current grid point

        openSet.push(source);

        while(!openSet.includes(mapNode(destination))) {
            // find lowest cost node in openSet
           current = lowestCostNode(openSet);
                       
           // if current is final, return the successful path
            current.path.push(current);

            // remove current from openSet
            openSet.slice(openSet.indexOf(current), 1);

            current.neighbors.forEach(neighbor => {
                // neighbors of current node
                if (!closedSet.includes(neighbor)) {
                    let possibleG = current.g + 1;

                    // if neighbor is not in openset save g, h, and f 
                    // then save the current parent

                    if (!openSet.includes(neighbor)) {
                        neighbor.g = possibleG;
                        neighbor.h = heuristic(neighbor, destination);
                        neighbor.f = neighbor.g + neighbor.h;
                        neighbor.parent = current;
                        // add neighbor to openset
                        openSet.push(neighbor);
                    } else if (possibleG >= neighbor.g) {
                        // if neighbor is in openSet but the current g is better than 
                        // previous g { save g and f, then save the current parent}
                        neighbor.g = possibleG;
                        neighbor.h = heuristic(neighbor, destination);
                        neighbor.f = neighbor.g + neighbor.h;
                        neighbor.parent = current;
                    }
                }
            });
            // add current to closedSet
            closedSet.push(current);
        };
         return destination.path;
    };

    return search();
}
module.exports = astar;