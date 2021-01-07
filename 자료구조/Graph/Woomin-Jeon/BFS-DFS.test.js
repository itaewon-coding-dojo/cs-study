const DFS = (graph, visitedNodes, currentNode) => {
  visitedNodes.add(currentNode);
  const nextPathes = graph[currentNode];

  nextPathes.forEach(path => {
    if (visitedNodes.has(path)) {
      return;
    }

    DFS(graph, visitedNodes, path);
  });
};

const BFS = (graph, startNode) => {
  const visitedNodes = [];
  const queue = [startNode];

  while (queue.length > 0) {
    const currentNode = queue.shift();

    if (visitedNodes.includes(currentNode)) {
      continue;
    }

    visitedNodes.push(currentNode);
    const nextPathes = graph[currentNode];
    queue.push(...nextPathes);
  }

  return visitedNodes;
};

const graph = {
  A: ['C', 'F', 'E'],
  B: ['C', 'D'],
  C: ['A', 'B', 'F'],
  D: ['B', 'G'],
  E: ['A', 'F'],
  F: ['A', 'C', 'E'],
  G: ['D'],
}

test('DFS', () => {
  const visitedNodes = new Set();
  const startNode = 'A';

  DFS(graph, visitedNodes, startNode);

  expect([...visitedNodes]).toEqual(["A", "C", "B", "D", "G", "F", "E"]);
});

test('BFS', () => {
  const startNode = 'A';

  expect(BFS(graph, startNode)).toEqual(["A", "C", "F", "E", "B", "D", "G"]);
});

