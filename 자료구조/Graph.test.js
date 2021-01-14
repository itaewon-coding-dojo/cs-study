

class Graph { 
  constructor() {
    this.map = new Map();
    this.vertex = {};
  }

  addVertex(vertex) {
    if(this.vertex[vertex]) {
      return;
    }
    this.vertex[vertex] = true;
  }

  removeVertex(vertex) {
    if(!this.vertex[vertex]) {
      return;
    }

    delete this.vertex[vertex]; 
    this.map.delete(vertex); 
    this.map.forEach((value, key)=> { 
      if(value.includes(vertex)) {
        this.removeEdge(key, value[0]);
      }
    })
  }

  removeEdge(key,value) {
    if(!this.hasEdge(key,value)){
      return;
    }

    const filteredKeys = [...this.map.get(key).filter(x=> x !== value)];
  
    if(!filteredKeys[0]) {
      this.map.delete(key);
      return;
    }
    this.map.set(key, filteredKeys);
  }

  hasVertex(a) {
    return !!this.vertex[a];
  }

  hasEdge(a,b) {
    if(!this.vertex[a]) {
      return false;
    }

    const values = this.map.get(a);
    if(values && values.filter(el => el === b)[0]) {
      return true;
    }
    return false
  }

  addEdge(a,b) {
    if(!this.vertex[a] || !this.vertex[b]) {
      return;
    }

    const arr = this.map.get(a);
    if(arr) {
      this.map.set(a,[...this.map.get(a),b ])
      return;
    }
    this.map.set(a,[b])
  }
}

test('removeVertex', () => {
  const graph = new Graph();
  [1,2,3,4,5,6].forEach(num => {
    graph.addVertex(num);
  })

  graph.addEdge(1,2);
  graph.addEdge(1,5);
  graph.addEdge(2,3);
  graph.addEdge(3,4);
  graph.addEdge(4,5);
  graph.addEdge(5,6);
  graph.addEdge(6,1);

  graph.removeVertex(1)
  
  expect(graph.hasEdge(6,1)).toBe(false);
  expect(graph.hasVertex(1)).toBe(false);

  graph.addVertex(7);
  expect(graph.hasEdge(7,6)).toBe(false);
});

test('removeEdge', () => {
  const graph = new Graph();
  [1,2,3,4,5,6].forEach(num => {
    graph.addVertex(num);
  })

  graph.addEdge(1,2);
  graph.addEdge(1,5);
  graph.addEdge(2,3);
  graph.addEdge(3,4);
  graph.addEdge(4,5);
  graph.addEdge(5,6);
  graph.addEdge(6,1);

  graph.removeEdge(6,1)
  expect(graph.hasEdge(6,1)).toBe(false);
});
