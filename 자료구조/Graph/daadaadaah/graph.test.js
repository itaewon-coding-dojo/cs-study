class Node {
  constructor(value) {
    this.data = value;
    this.nextNode = null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.tail = null;
    this.count = 0;
  }

  enqueue(value) {
    const newNode = new Node(value);
    this.count++;

    if (!this.front) {
      this.front = newNode;
      this.tail = newNode;

      return;
    }

    if (this.tail) {
      this.tail.nextNode = newNode;
      this.tail = newNode;
    }
  }

  dequeue() {
    if (!this.front) {
      return;
    }

    const removeNode = this.front;
    this.front = removeNode.nextNode;
    this.count--;

    return removeNode;
  }

  peek() {
    return this.front;
  }

  isEmpty() {

  }
}

class Stack {
  constructor() {
    this.top = null;
    this.count = 0;
  }

  push(data) {
    const node = new Node(data);
    node.nextNode = this.top;
    this.top = node;
    this.count++;
  }

  pop() {
    if (!this.top) {
      return false;
    }

    const topNode = this.top;
    this.top = topNode.nextNode;
    this.count--;

    return topNode;
  }

  peek() {
    return this.top;
  }
}

class Vertex {
  constructor(value) {
    this.value = value;
    this.marked = false;
    this.adjustNodes = new Set();
    this.degree = this.adjustNodes.size;
  }
}

class Graph {
  constructor() {
    this.vertexs = new Map();
  }

  getGraph() {
    return this.vertexs;
  }

  addVertex(value) {
    const vertex = new Vertex(value);
    this.vertexs.set(value, vertex);
  }

  addArc(source, destination) {
    this.vertexs.get(source).adjustNodes.add(destination);
    this.vertexs.get(source).degree = this.vertexs.get(source).adjustNodes.size;

    this.vertexs.get(destination).adjustNodes.add(source);
    this.vertexs.get(destination).degree = this.vertexs.get(destination).adjustNodes.size;
  }

  removeVertex(value) {
    if (!this.vertexs.has(value)) {
      return;
    }

    this.vertexs.get(value).adjustNodes.forEach(adjustNode => {
      this.vertexs.get(adjustNode).adjustNodes.delete(value);
    });

    this.vertexs.delete(value);
  }

  removeArc(value1, value2) {
    if (!(this.vertexs.has(value1) && this.vertexs.has(value2))) {
      return;
    }

    this.vertexs.get(value2).adjustNodes.delete(value1);
    this.vertexs.get(value1).adjustNodes.delete(value2);
  }

  bfs(startingVertex) {
    let queue = new Queue();
    let circuitousPath = [];

    queue.enqueue(startingVertex);
    this.vertexs.get(startingVertex).marked = true;

    while (queue.count > 0) {
      const currentNode = queue.dequeue().data;
      circuitousPath.push(currentNode);

      const adjacencyListOfCurrentNode = this.vertexs.get(currentNode).adjustNodes;
      for (let node of adjacencyListOfCurrentNode) {
        if (!this.vertexs.get(node).marked) {
          queue.enqueue(node);
          this.vertexs.get(node).marked = true;
        }
      }
    }

    return circuitousPath;
  }

  dfs(startingVertex) {
    let stack = new Stack();
    let circuitousPath = [];

    stack.push(startingVertex);
    this.vertexs.get(startingVertex).marked = true;

    while (stack.count > 0) {
      const currentNode = stack.pop().data;
      circuitousPath.push(currentNode);

      const adjacencyListOfCurrentNode = this.vertexs.get(currentNode).adjustNodes;
      for (let node of adjacencyListOfCurrentNode) {
        if (!this.vertexs.get(node).marked) {
          stack.push(node);
          this.vertexs.get(node).marked = true;
        }
      }
    }

    return circuitousPath;
  }
}

describe('Graph', () => {
  describe('addVertex', () => {
    it('add Vertex', () => {
      let graph = new Graph();
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addVertex('C');

      expect(graph.getGraph().get('A').value).toEqual('A');
      expect(graph.getGraph().get('B').value).toEqual('B');
      expect(graph.getGraph().get('C').value).toEqual('C');
    });
  });

  describe('addArc', () => {
    it('add Arc', () => {
      let graph = new Graph();
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addVertex('C');

      graph.addArc('A', 'B');
      graph.addArc('A', 'C');

      const adjustNodes = new Set();
      adjustNodes.add('B');
      adjustNodes.add('C');

      expect(graph.getGraph().get('A').value).toEqual('A');
      expect(graph.getGraph().get('A').adjustNodes).toEqual(adjustNodes);
      expect(graph.getGraph().get('A').degree).toEqual(2);
    });
  });

  describe('removeVertex', () => {
    it('remove Vertex', () => {
      let graph = new Graph();
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addVertex('C');

      graph.addArc('A', 'B');
      graph.addArc('A', 'C');

      graph.removeVertex('C');

      expect(graph.getGraph().has('C')).toBeFalsy();
      expect(graph.getGraph().get('A').adjustNodes.has('C')).toBeFalsy();
    });
  });

  describe('removeArc', () => {
    it('remove Arc', () => {
      let graph = new Graph();
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addVertex('C');

      graph.addArc('A', 'B');
      graph.addArc('A', 'C');

      graph.removeArc('A', 'C');

      expect(graph.getGraph().get('A').adjustNodes.has('C')).toBeFalsy();
      expect(graph.getGraph().get('C').adjustNodes.has('A')).toBeFalsy();
    });
  });

  describe('BFS', () => {
    it('return  ["A", "C", "B", "D", "G", "E", "F"]', () => {
      let graph = new Graph();
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addVertex('C');
      graph.addVertex('D');
      graph.addVertex('E');
      graph.addVertex('F');
      graph.addVertex('G');

      graph.addArc('A', 'C');
      graph.addArc('A', 'B');
      graph.addArc('A', 'D');
      graph.addArc('D', 'E');
      graph.addArc('E', 'F');
      graph.addArc('B', 'G');

      expect(graph.bfs('A')).toStrictEqual(['A', 'C', 'B', 'D', 'G', 'E', 'F']);
    });
  });

  describe('DFS', () => {
    it('return  ["A", "B", "C", "G", "D", "E", "F"]', () => {
      let graph = new Graph();
      graph.addVertex('A');
      graph.addVertex('B');
      graph.addVertex('C');
      graph.addVertex('D');
      graph.addVertex('E');
      graph.addVertex('F');
      graph.addVertex('G');

      graph.addArc('A', 'D');
      graph.addArc('A', 'C');
      graph.addArc('A', 'B');
      graph.addArc('C', 'G');
      graph.addArc('D', 'E');
      graph.addArc('E', 'F');

      expect(graph.dfs('A')).toStrictEqual(['A', 'B', 'C', 'G', 'D', 'E', 'F']);
    });
  });
});
