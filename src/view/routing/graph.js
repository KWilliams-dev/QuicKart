/**
 * Will create a weighted, directed graph from its width, and length, and obstacle position
 * in the map
 * @param {Array} map is an object representing a store map
 * @returns {Array} a map
 */

const graph = (map) => {
  const aisles = map.aisle;
  const entrance = map.entrance;
  const checkout = map.checkout;
  const obstacles = [];

  /**
   * Will create an array of coordinates that contain obstacles
   * @param {Array} obstacleArr is a list of objects with coordinates that represent obstacles
   */

  const addObstacles = (obstacleArr) => {
    obstacleArr.forEach(element => {
      for(let row = element.xStartVal; row <= element.xEndVal; row++) {
        for(let col = element.yStartVal; col <= element.yEndVal; col++) {
          obstacles.push(`${row},${col}`);
        }
      }
    });
  }


  /**
   * Creates a node representing a grid cell
   * @param {Number} x is the x-coodinate
   * @param {Number} y is the y-coordinate
   * @param {Number} logic determines if the node is routable (0) or contains an obstacle (1)
   * @returns {Object} a node
   */
  
  const createNode = (x, y, logic) => {
    return { 
      x: x,
      y: y,
      logic: logic,
      srcDistance: Infinity,
      neighbors: [],
      path: []
    }
  }


  /**
   * Will add connections between two nodes in the graph as well as adding the 
   * distance between the nodes
   * @param {Object} origin is the source node
   * @param {Object} destination is the end node
   */

  const addEdge = (origin, destination) => {
    if(!(origin.neighbors.find(element => element[0] === destination))){

      // Distance between adjacent 1 unit grid cells in the N, S, E, W directions: 1
      // Distance between adjacent 1 unit grid cells in the NE, NW, SE, SW directions: sqrt(2)
    
      const distance = (x1, x2, y1, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      const d = distance(origin.x, destination.x, origin.y, destination.y);
      origin.neighbors.push([destination,d]);
      destination.neighbors.push([origin,d]);
    }
  }

  const graph = [];
  const width = map.width;
  const length = map.length;


  /**
   * Will add nodes to the graph and determine if that node is an obstacle 
   * or not
   */
  
  const addNodes = () => {
    for(let row = 0; row <= width; row++) {
      graph.push([]);
      for(let col = 0; col <= length; col++) {
        if(obstacles.includes(`${row},${col}`)) {
          graph[row].push(createNode(row, col, 1));
        }
        else {
          graph[row].push(createNode(row, col, 0));
        }
      }
    }
  }


  /**
   * Will add connections between the nodes in the graph in the north, south,
   * east, west, northwest, northeast, southwest, and southeast directions
   */

  const createConnections = () => {
    for(let row = 0; row < graph.length; row++) {
      for(let col = 0; col < graph[row].length; col++) {
        if(col + 1 <= length){ //N
          addEdge(graph[row][col],graph[row][col + 1]);
        } 
        
        if(col + 1 <= length && row + 1 <= width){ //NE
          addEdge(graph[row][col],graph[row + 1][col + 1]);
        } 
        
        if(row + 1 <= width){ //E
          addEdge(graph[row][col],graph[row + 1][col]);
        } 
        
        if(col - 1 >= 0 && row + 1 <= width){ //SE
          addEdge(graph[row][col],graph[row + 1][col - 1]);
        } 
        
        if(col - 1 >= 0){ //S
          addEdge(graph[row][col],graph[row][col - 1]);
        } 
        
        if(col - 1 >= 0 && row - 1 >= 0){ //SW
          addEdge(graph[row][col],graph[row - 1][col - 1]);
        } 
        
        if(row - 1 >= 0){  //W
          addEdge(graph[row][col],graph[row - 1][col]);
        } 
        
        if(col + 1 <= length && row - 1 >= 0){ //NW
          addEdge(graph[row][col],graph[row - 1][col + 1]);
        }
        
      }
    }
  }

  addObstacles(aisles);
  addObstacles(entrance);
  addObstacles(checkout);
  addNodes();
  createConnections();
  
  return graph;
}

module.exports = graph;
