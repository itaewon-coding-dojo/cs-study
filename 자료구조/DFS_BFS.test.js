

class Graph { 
  constructor() {
    this.map = new Map();
    this.root = null;
  }


  addEdge(a,b) {
    if(this.root === null) {
      this.root = a;
    }
    const arr = this.map.get(a);
    if(arr) {
      this.map.set(a,[...this.map.get(a),b ])
      return;
    }
    this.map.set(a,[b])
  }

  
  dfs(currentNumber= this.root, history = []) {
    history.push(currentNumber);
    const nextNumbers = this.map.get(currentNumber);
    if(!nextNumbers || nextNumbers.every(number => history.includes(number))) {
      return [currentNumber];
    }
    for(let i = 0; i < nextNumbers.length; i += 1){
      if(!history.includes(nextNumbers[i])) {
        return [currentNumber, ...this.dfs(nextNumbers[i], history)];
      }
    }
  }

  bfs() {
    let queue = [this.root];
    let answer = [this.root];
    while(queue[0]){
      const currentNumber = queue.shift();
      const numbers = this.map.get(currentNumber) || []
      let filteredNumbers =  numbers.filter(number => !answer.includes(number));
      answer = [...answer, ...filteredNumbers];
      queue = [...queue, ...filteredNumbers];
    }
    return answer;
  }
}

test('dfs', () => {
  const graph = new Graph();
  graph.addEdge(1,2);
  graph.addEdge(1,5);
  graph.addEdge(2,3);
  graph.addEdge(3,4);
  graph.addEdge(4,5);
  graph.addEdge(5,6);
  graph.addEdge(6,1);
  console.log(graph)
  expect(graph.dfs()).toEqual([1,2,3,4,5,6]);
});

test('bfs', () => {
  const graph = new Graph();
  graph.addEdge(1,2);
  graph.addEdge(1,5);
  graph.addEdge(2,3);
  graph.addEdge(3,4);
  graph.addEdge(4,5);
  graph.addEdge(5,6);
  graph.addEdge(6,1);
  expect(graph.bfs()).toEqual([1,2,5,3,6,4]);
});