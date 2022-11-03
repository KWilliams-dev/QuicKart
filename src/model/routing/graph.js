const graph = (map) => {
  
  const aisles = map.aisle
  const entrance = map.entrance
  const checkout = map.checkout
  const width = map.width
  const length = map.length
  
  const obstacles = []

  function addObstacles(obstacleArr) {
    obstacleArr.forEach(element => {
      for(let row = element.xStartVal; row <= element.xEndVal; row++) {
        for(let col = element.yStartVal; col <= element.yEndVal; col++) {
          obstacles.push(`${row},${col}`)
        }
      }
    });
  }

  addObstacles(aisles);
  addObstacles(entrance);
  addObstacles(checkout);
  
  const graph = [];
  
  function createNode(x, y, logic) {
    return { 
      x: x,
      y: y,
      logic: logic,
      srcDistance: Infinity,
      neighbors: [],
      path: []
    }
  }
  
  function addEdge(origin, destination){
    if(!(origin.neighbors.find(element => element[0] === destination))){
      const distance = (x1, x2, y1, y2) => Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
      const d = distance(origin.x, destination.x, origin.y, destination.y);
      origin.neighbors.push([destination,d])
      destination.neighbors.push([origin,d])
    }
  }
    

  for(let row = 0; row <= width; row++) {
    graph.push([])
    for(let col = 0; col <= length; col++) {
      if(obstacles.includes(`${row},${col}`)) {
        graph[row].push(createNode(row, col, 1))
      }
      else {
        graph[row].push(createNode(row, col, 0))
      }
    }
  }

  for(let row = 0; row < graph.length; row++) {
    for(let col = 0; col < graph[row].length; col++) {
      if(col + 1 <= length){ //N
        addEdge(graph[row][col],graph[row][col + 1])
      } if(col + 1 <= length && row + 1 <= width){ //NE
        addEdge(graph[row][col],graph[row + 1][col + 1])
      } if(row + 1 <= width){ //E
        addEdge(graph[row][col],graph[row + 1][col])
      } if(col - 1 >= 0 && row + 1 <= width){ //SE
        addEdge(graph[row][col],graph[row + 1][col - 1])
      } if(col - 1 >= 0){ //S
        addEdge(graph[row][col],graph[row][col - 1])
      } if(col - 1 >= 0 && row - 1 >= 0){ //SW
        addEdge(graph[row][col],graph[row - 1][col - 1])
      } if(row - 1 >= 0){  //W
        addEdge(graph[row][col],graph[row - 1][col])
      } if(col + 1 <= length && row - 1 >= 0){ //NW
        addEdge(graph[row][col],graph[row - 1][col + 1])
      }
      
    }
  }

  // const shortestPath = (grid, k) => {
  //   let potentialPaths = 
  // }

  // const graph = []

  // for(let x = 0; x <= width; x++) {
  //   for(let y = 0; y <= length; y++) {
      
  //     const weight = (direction) => {
  //       let isEdge = false;
  //       if(direction.includes("N")){
  //           isEdge ||= y + 1 > length;
  //       } 
  //       if(direction.includes("E")){
  //           isEdge ||= x + 1 > width;
  //       } 
  //       if(direction.includes("S")){
  //           isEdge ||= y - 1 < 0;
  //       } 
  //       if(direction.includes("W")){
  //           isEdge ||= x - 1 < 0;
  //       }
  //       return isEdge ? null : 1
  //     }

  //     const nodeFormat = x + "," + y;

  //     graph.push({
  //       xVal: x,
  //       yVal: y,
  //       NW: weight("NW"),
  //       N: weight("N"),
  //       NE: weight("NE"),
  //       E: weight("E"),
  //       SE: weight("SE"),
  //       S: weight("S"),
  //       SW: weight("SW"),
  //       W: weight("W"),
  //     })

  //     for(let node in graph[nodeFormat]) {
  //       if(graph[nodeFormat][node] === null) {
  //         delete graph[nodeFormat][node]
  //       }
  //     }
  //   }
  // }
    // const itemList = () => {
    //   let str = '';
    //   items.forEach(element => {
    //     str.concat(element + " ")
    //   });
    //   return str;
    // }
    // const i = itemList.split(' ');
    // return i;
    // const adjacencyList = new Map();

    // function add

  return graph;
}
module.exports=graph;