class Node {
  constructor(value) {
    this.value = value;
    this.parentNode = null;
    this.leftChildNode = null;
    this.rightChildNode = null;
  }

  getHeight() {
    if (!this.value) {
      return 0;
    }

    let leftHeight = this.leftChildNode ? this.leftChildNode.getHeight() : 0;
    let rightHeight = this.rightChildNode ? this.rightChildNode.getHeight() : 0;

    return 1 + Math.max(leftHeight, rightHeight);
  }
}

class BinarySearchTree {
  constructor(rootValue) {
    this.rootNode = new Node(rootValue);
    this.height = 0;
  }

  insert(newValue) {
    let curretParentNode = this.rootNode;
    while (curretParentNode) {
      const childNode = newValue < curretParentNode.value ? 'leftChildNode' : 'rightChildNode';

      if (!curretParentNode[childNode]) {
        const newNode = new Node(newValue);
        newNode.parentNode = curretParentNode;
        curretParentNode[childNode] = newNode;
        return;
      }

      curretParentNode = curretParentNode[childNode];
    }
  }

  getHeight() {
    if (!this.rootNode) {
      return 0;
    }

    return this.rootNode.getHeight();
  }

  findMin() {
    let curretParentNode = this.rootNode;
    while (curretParentNode.leftChildNode) {
      curretParentNode = curretParentNode.leftChildNode;
    }
    const minValue = curretParentNode.value;
    return minValue;
  }

  findMax() {
    let curretParentNode = this.rootNode;
    while (curretParentNode.rightChildNode) {
      curretParentNode = curretParentNode.rightChildNode;
    }
    const maxValue = curretParentNode.value;
    return maxValue;
  }

  getNode(targetValue) {
    let curretParentNode = this.rootNode;
    while (curretParentNode) {
      if (targetValue === curretParentNode.value) {
        const targetNode = curretParentNode;
        return targetNode;
      }

      const childNode = targetValue < curretParentNode.value ? 'leftChildNode' : 'rightChildNode';
      curretParentNode = curretParentNode[childNode];
    }
  }

  remove(value) {
    const removeNode = this.getNode(value);

    if (!removeNode.leftChildNode && !removeNode.rightChildNode) {
      const childNode = removeNode.value < removeNode.parentNode.value ? 'leftChildNode' : 'rightChildNode';
      removeNode.parentNode[childNode] = null;
      return removeNode;
    }

    if (!removeNode.leftChildNode && removeNode.rightChildNode) {
      const childNode = removeNode.value < removeNode.parentNode.value ? 'leftChildNode' : 'rightChildNode';
      removeNode.parentNode[childNode] = removeNode.rightChildNode;
      return removeNode;
    }

    if (removeNode.leftChildNode && !removeNode.rightChildNode) {
      const childNode = removeNode.value < removeNode.parentNode.value ? 'leftChildNode' : 'rightChildNode';
      removeNode.parentNode[childNode] = removeNode.leftChildNode;
      return removeNode;
    }

    removeNode.parentNode.leftChildNode = removeNode.leftChildNode;
    removeNode.parentNode.rightChildNode = removeNode.rightChildNode;
    return removeNode;
  }
}

describe('BinarySearchTree', () => {
  describe('insert', () => {
    it('add data', () => {
      const tree = new BinarySearchTree(5);
      tree.insert(3);

      expect(tree.rootNode.leftChildNode.value).toBe(3);
      expect(tree.rootNode.leftChildNode.parentNode.value).toBe(5);


      tree.insert(4);

      expect(tree.rootNode.leftChildNode.value).toBe(3);
      expect(tree.rootNode.leftChildNode.rightChildNode.value).toBe(4);
      expect(tree.rootNode.leftChildNode.parentNode.value).toBe(5);


      tree.insert(7);

      expect(tree.rootNode.rightChildNode.value).toBe(7);
    });
  });

  describe('findMin', () => {
    it('find min value', () => {
      const tree = new BinarySearchTree(5);
      tree.insert(3);
      tree.insert(4);
      tree.insert(7);
      tree.insert(1);
      tree.insert(2);


      expect(tree.findMin()).toBe(1);
    });
  });

  describe('findMax', () => {
    it('find max value', () => {
      const tree = new BinarySearchTree(5);
      tree.insert(3);
      tree.insert(4);
      tree.insert(7);
      tree.insert(1);
      tree.insert(2);


      expect(tree.findMax()).toBe(7);
    });
  });

  describe('getHeight', () => {
    it('get height', () => {
      const tree = new BinarySearchTree(5);
      tree.insert(3);
      tree.insert(4);
      tree.insert(7);
      tree.insert(1);

      expect(tree.getHeight()).toBe(3);
    });
  });

  describe('getNode', () => {
    it('get node', () => {
      const tree = new BinarySearchTree(5);
      tree.insert(3);
      tree.insert(4);
      tree.insert(7);
      tree.insert(1);

      expect(tree.getNode(4).value).toBe(4);
    });
  });

  describe('remove', () => {
    context('when child doesnt exist', () => {
      it('remove data', () => {
        const tree = new BinarySearchTree(5);
        tree.insert(3);
        tree.insert(4);
        tree.insert(7);
        tree.insert(1);

        tree.remove(7);

        expect(tree.rootNode.rightChildNode).toBeNull();
      });
    });

    context('when 1 child exist', () => {
      it('remove data', () => {
        const tree = new BinarySearchTree(5);
        tree.insert(4);
        tree.insert(3);
        tree.insert(7);

        tree.remove(4);

        expect(tree.rootNode.leftChildNode.value).toBe(3);
      });
    });

    context('when 2 child exist', () => {
      const tree = new BinarySearchTree(5);
      tree.insert(3);
      tree.insert(4);
      tree.insert(7);
      tree.insert(1);

      tree.remove(3);

      expect(tree.rootNode.leftChildNode.value).toBe(1);
      expect(tree.rootNode.rightChildNode.value).toBe(4);
    });
  });
});