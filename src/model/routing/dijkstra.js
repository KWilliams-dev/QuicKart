const dijkstra = (graph, source, end) => {
    const start = graph.map((e) => {
        return e.node;
    }).indexOf(source)
    const finish = graph.map((e) => {
        return e.node;
    }).indexOf(end)
    graph[finish].node = 0

    const lowestCostNode = () => {
        
    }

    return graph;
}
module.exports = dijkstra;