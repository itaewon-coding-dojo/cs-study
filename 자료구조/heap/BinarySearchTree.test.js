class Node {
  constructor(value) {
    this.value = value;
    this.parent = null;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  insert(value) {
    const newNode = new Node(value);

    if (this.rootNode === null) {
      this.rootNode = newNode;
      return;
    }
    let nextNode = this.rootNode;
    let prevNode = null;

    while (nextNode !== null) {
      prevNode = nextNode;
      if (value < nextNode.value) {
        nextNode = nextNode.left;
        continue;
      }
      nextNode = nextNode.right;
    }

    newNode.parent = prevNode;

    if (prevNode && prevNode.value > newNode.value) {
      prevNode.left = newNode;
      return;
    }
    prevNode.right = newNode;
  }

  getHeight() {
    const heights = [];
    this.getHeights(heights);

    // console.log(heights, 'array');
    const maxHeight = Math.max(...heights);
    // console.log(maxHeight, 'maxheight');
    this.height = maxHeight;
    return maxHeight;
  }

  getHeights(heights, height = 1, currentNode = this.rootNode) {
    this.height = 0;
    if (!this.rootNode) {
      return 0;
    }
    this.height = Math.max(height, this.height);
    if (currentNode.right) {
      this.getHeights(heights, height + 1, currentNode.right);
    }
    if (currentNode.left) {
      this.getHeights(heights, height + 1, currentNode.left);
    }
    heights.push(height);
  }

  peakValue() {
    return this.rootNode.value;
  }

  findMax(node) {
    let currentNode = node || this.rootNode;
    while (currentNode.right !== null) {
      currentNode = currentNode.right;
    }
    return currentNode;
  }

  findMin(node) {
    let currentNode = node || this.rootNode;
    while (currentNode.left !== null) {
      currentNode = currentNode.left;
    }
    return currentNode;
  }

  remove(value) {
    const currentNode = this.getNodeByValue(value);

    if (!currentNode.left && !currentNode.right) {
      const direction = this.getChildDirection(currentNode);
      currentNode.parent[direction] = null;
      return;
    }

    if (!currentNode.left) {
      const minNode = this.findMin(currentNode.right);
      this.changeParentDirection(currentNode, minNode);
      return;
    }

    const maxNode = this.findMax(currentNode.left);
    maxNode.left = currentNode.left;
    this.changeParentDirection(currentNode, maxNode);
  }

  changeParentDirection(node, targetNode) {
    targetNode.parent = node.parent;
    const direction = this.getChildDirection(node);
    node.parent[direction] = targetNode;
  }

  getChildDirection(node) {
    return node.parent.value > node.value ? 'left' : 'right';
  }

  getNodeByValue(value) {
    let currentNode = this.rootNode;
    let previousNode = null;
    while (currentNode.value !== value && currentNode !== null) {
      previousNode = currentNode;
      if (value < currentNode.value) {
        currentNode = currentNode.left;
        continue;
      }
      currentNode = currentNode.right;
    }
    return currentNode;
  }

  peakValue() {
    return this.rootNode.value;
  }
}

test('insert', () => {
  const bst = new BinarySearchTree();
  bst.insert(25);
  bst.insert(17);
  bst.insert(34);
  bst.insert(19);
  bst.insert(24);
  bst.insert(5);
  expect(bst.peakValue()).toBe(25);
  expect(bst.getHeight()).toBe(4);
});

test('findMax', () => {
  const bst = new BinarySearchTree();
  bst.insert(25);
  bst.insert(17);
  bst.insert(34);
  bst.insert(19);
  bst.insert(24);
  bst.insert(5);
  expect(bst.findMax(bst.rootNode.left).value).toBe(24);
  expect(bst.findMax().value).toBe(34);
});

test('findMin', () => {
  const bst = new BinarySearchTree();
  bst.insert(25);
  bst.insert(17);
  bst.insert(34);
  bst.insert(19);
  bst.insert(24);
  bst.insert(5);
  expect(bst.findMin(bst.rootNode.right).value).toBe(34);
  expect(bst.findMin().value).toBe(5);
});

test('remove no child', () => {
  const bst = new BinarySearchTree();
  bst.insert(3);
  bst.insert(1);
  bst.insert(5);

  bst.remove(1);
  expect(bst.rootNode.left).toBe(null);
});

test('remove 1 child left', () => {
  const bst = new BinarySearchTree();
  bst.insert(5);
  bst.insert(8);
  bst.insert(3);
  bst.insert(4);
  bst.remove(3);

  expect(bst.rootNode.left.value).toBe(4);
});

test('remove 1 child right', () => {
  const bst = new BinarySearchTree();
  bst.insert(5);
  bst.insert(8);
  bst.insert(3);
  bst.insert(4);
  bst.insert(7);
  bst.remove(8);

  expect(bst.rootNode.right.value).toBe(7);
});

test('remove 2 child', () => {
  const bst = new BinarySearchTree();
  bst.insert(5);
  bst.insert(8);
  bst.insert(3);
  bst.insert(4);
  bst.insert(1);
  bst.remove(3);

  expect(bst.rootNode.left.value).toBe(1);
});
