// ! GRAPHS

// * Vertex - a node
// * Edge - a connection between nodes

// * Weighted / Unweighted - values assigned to distances between vertices
// * Directed / Undirected - directions assigned to distances between vertices

// ! UNDIRECTED GRAPH
class Graph {
  constructor() {
    this.adjacencyList = {}; // list og neighbors
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1, vertex2) {
    // You can also add some error checking here
    // For example, check if the vertex1 and exist
    this.adjacencyList[vertex1].push(vertex2);
    this.adjacencyList[vertex2].push(vertex1);
  }

  removeEdge(vertex1, vertex2) {
    // Keep everything in the array under the key of vertex1 except vertex2
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
      (v) => v !== vertex2
    );

    // Keep everything in the array under the key of vertex2 except vertex2
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
      (v) => v !== vertex1
    );
  }

  removeVertex(vertex) {
    // So, we have to remove not only the vertex itself but also
    // its mentions inside of the other arrays 
        while(this.adjacencyList[vertex].length) {
            const adjacentVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex); // the order of the args doesn't matter in the UNDIRECTED GRAPH
        }
        // Now we have to remove the vertex itself
        delete this.adjacencyList[vertex];
  }
}

let graph = new Graph();

graph.addVertex("Tokio");
graph.addVertex("Las Vegas");
graph.addVertex("San Francisco");
console.log(graph.adjacencyList); // {Tokio: Array(0), Las Vegas: Array(0), San Francisco: Array(0)}

graph.addEdge("Tokio", "Las Vegas");
graph.addEdge("Tokio", "San Francisco");
console.log(graph.adjacencyList); // Tokio: ["Las Vegas', "San Francisco"], Las Vegas: ["Tokio'], San Francisco: ["Tokio"]

graph.removeEdge("Tokio", "Las Vegas");
console.log(graph.adjacencyList); // Tokio: ["San Francisco"], Las Vegas: [], San Francisco: ["Tokio"]

graph.removeVertex("Tokio"); 
console.log(graph.adjacencyList); // {Las Vegas: Array(0), San Francisco: Array(0)}

// !GRAPH TRAVERSAL (visiting every single vertex in the graph)
