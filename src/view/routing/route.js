// import dijkstra from '../../model/routing/dijkstra'
import {setState}  from 'react';

export const route = (list, source) => {
    
    const dijkstra = () => {
        
    }


    const adjacencyList = new Map();
        
    //     function addNode(node) {
    //         adjacencyList.set(node, [])
    //     }

    //     function addEdge(origin, destination) {
    //         adjacencyList.get(origin).push(destination);
    //         adjacencyList.get(destination).push(origin)
    //     }
    //     list.forEach(element => {
            
    //     });
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


    // const distance = (x1, y1, x2, y2) => {
    //     return Math.sqrt(Math.pow((x2-x1)) + Math.pow(y2-y1))
    // }
    // const calcDist = (a) => distance(a.xVal, a.yVal, start.xVal, start.yVal);
    // source.sort((a,b) => {
    //     (calcDist(a) > calcDist(b)) ? 1 : (calcDist(a) === calcDist(b))
    // }
    
    // const finish = graph.map((e) => {
    //     return e.node;
    // }).indexOf(end)
    // graph[finish].node = 0

    // const lowestCostNode = () => {
        
    // }
    
    // console.log(dijkstra(source));

    return route;
}

/*push startNode onto openList
while(openList is not empty) {
 currentNode = find lowest f in openList
 if currentNode is final, return the successful path
 push currentNode onto closedList and remove from openList
 foreach neighbor of currentNode {
     if neighbor is not in openList {
            save g, h, and f then save the current parent
            add neighbor to openList
     }
     if neighbor is in openList but the current g is better than previous g {
             save g and f, then save the current parent
     }
 }*/
