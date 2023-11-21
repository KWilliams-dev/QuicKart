/**
 * A* Search Algorithm for pathfinding on a grid-based map
 * @param {Array} gridMap A 2D array representing the grid/map
 * @param {Object} start Starting node with coordinates (x, y)
 * @param {Object} end Ending node with coordinates (x, y)
 * @returns {Array} Shortest path using A* search
 */

const astar = (gridMap, start, end) => {
  // Helper function to calculate heuristic (Manhattan distance)
  const calculateHeuristic = (nodeA, nodeB) => {
    return Math.abs(nodeB.x - nodeA.x) + Math.abs(nodeB.y - nodeA.y);
  };

  // Define data structures and variables
  const openSet = [];
  const closedSet = new Set();
  const cameFrom = {};
  const gScore = {}; // Actual cost from start to a node
  const fScore = {}; // Estimated total cost from start to goal through node

  // Initialize scores for start node
  gScore[start] = 0;
  fScore[start] = calculateHeuristic(start, end);

  openSet.push(start);

  while (openSet.length > 0) {
    // Find the node in openSet with the lowest fScore
    let currentNode = openSet.reduce((minNode, node) =>
      fScore[node] < fScore[minNode] ? node : minNode
    );

    if (currentNode.x === end.x && currentNode.y === end.y) {
      // Reconstruct path if reached the goal
      const path = [];
      let traceNode = end;
      while (traceNode) {
        path.push(traceNode);
        traceNode = cameFrom[traceNode];
      }
      return path.reverse();
    }

    openSet.splice(openSet.indexOf(currentNode), 1);
    closedSet.add(currentNode);

    // Explore neighbors
    const neighbors = [
      { x: currentNode.x - 1, y: currentNode.y },
      { x: currentNode.x + 1, y: currentNode.y },
      { x: currentNode.x, y: currentNode.y - 1 },
      { x: currentNode.x, y: currentNode.y + 1 },
    ];

    for (const neighbor of neighbors) {
      if (
        neighbor.x < 0 ||
        neighbor.x >= gridMap.length ||
        neighbor.y < 0 ||
        neighbor.y >= gridMap[0].length ||
        gridMap[neighbor.x][neighbor.y].logic === 1 ||
        closedSet.has(neighbor)
      ) {
        continue; // Skip invalid or already evaluated nodes
      }

      const tentativeGScore = gScore[currentNode] + 1;

      if (
        !openSet.includes(neighbor) ||
        tentativeGScore < gScore[neighbor]
      ) {
        // Found a better path to this neighbor
        cameFrom[neighbor] = currentNode;
        gScore[neighbor] = tentativeGScore;
        fScore[neighbor] =
          gScore[neighbor] + calculateHeuristic(neighbor, end);

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
  }

  // No path found
  return [];
};

module.exports = astar;
