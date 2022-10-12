const graph = (width, length) => {
    const graph = {}

    for(let x = 0; x <= width; x++) {
      for(let y = 0; y <= length; y++) {
        
        const weight = (direction) => {
          let isEdge = false;
          if(direction.includes("N")){
              isEdge ||= y + 1 > length;
          } else if(direction.includes("E")){
              isEdge ||= x + 1 > width;
          } else if(direction.includes("S")){
              isEdge ||= y - 1 < 0;
          } else if(direction.includes("W")){
              isEdge ||= x - 1 < 0;
          }
          return isEdge ? null : 1
        }

        const nodeFormat = "(" + x + "," + y + ")";

        graph[nodeFormat] = {
          NW: weight("NW"),
          N: weight("N"),
          NE: weight("NE"),
          E: weight("E"),
          SE: weight("SE"),
          S: weight("S"),
          SW: weight("SW"),
          W: weight("W"),
        }

        for(let node in graph[nodeFormat]) {
          if(graph[nodeFormat][node] === null) {
            delete graph[nodeFormat][node]
          }
          console.log(node)
        }
      }
    }
    return graph;
}
module.exports = graph