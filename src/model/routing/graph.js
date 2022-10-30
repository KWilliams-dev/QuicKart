function graph(map) {
  
  const aisles = map.aisle;
  const entrance = map.entrance;
  const checkout = map.checkout;
  const width = map.width;
  const length = map.length;
  
  const obstacles = [];

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
  addObstacles(checkout);
  
  const graph = [];
  
  function createNode(x, y, logic) {
    return { 
      x: x,
      y: y,
      logic: logic,
      srcDistance: Infinity,
      neighbors: []
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
      } if(col - 1 >= 0){ //S
        addEdge(graph[row][col],graph[row][col - 1])
      } if(row + 1 <= width){ //E
        addEdge(graph[row][col],graph[row + 1][col])
      } if(row - 1 >= 0){  //W
        addEdge(graph[row][col],graph[row - 1][col])
      } if(col + 1 <= length && row + 1 <= width){ //NE
        addEdge(graph[row][col],graph[row + 1][col + 1])
      } if(col + 1 <= length && row - 1 >= 0){ //NW
        addEdge(graph[row][col],graph[row - 1][col + 1])
      } if(col - 1 >= 0 && row + 1 <= width){ //SE
        addEdge(graph[row][col],graph[row + 1][col - 1])
      } if(col - 1 >= 0 && row - 1 >= 0){ //SW
        addEdge(graph[row][col],graph[row - 1][col - 1])
      }
      
    }
  }

  return graph;
}
module.exports=graph;


/*Quick sort 

const distance = (x1, x2, y1, y2) => {
          return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
        }
        //SOURCE 24,27  
        list.forEach(item => {
          item.distance = distance(item.xVal, source.xVal, item.yVal, source.yVal)
        })
    
    
        quickSort(list, 0, list.length - 1)
        console.log(list)

        function quickSort(arr, low, high) {
            if(low < high) {
                let p = partition(arr, low, high)
                quickSort(arr, low, p - 1)
                quickSort(arr, p + 1, high)
            }
        }
        function partition(arr, low, high) {
            let pivot = arr[high].distance
            let partitionIndex = low - 1;
            for(let i = low; i < high - 1; i++) {
                if(arr[i].distance < pivot) {
                    partitionIndex++
                    swap(arr, arr[partitionIndex], arr[i])
                }
            }
            
            partitionIndex++
            swap(arr[partitionIndex], arr[high])
            return partitionIndex
        }
        function swap(arr, low, high) {
            let temp = arr[low]
            arr[low] = arr[high]
            arr[high] = temp
        }
*/