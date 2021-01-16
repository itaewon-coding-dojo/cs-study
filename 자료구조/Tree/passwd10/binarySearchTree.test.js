/* 
왼쪽자식노드는 오른쪽자식노드보다 작아야한다.
*/

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(data) {
    const node = new Node(data);

    this.root = this.insertNode(this.root, node);
  }

  insertNode(root, node) {
    if (!root) {
      return node;
    }

    root.data <= node.data ?
      root.right = this.insertNode(root.right, node) :
      root.left = this.insertNode(root.left, node)

    return root;
  }

  delete(data) { // no child | one child | 2 children
    if (!this.root) {
      console.log('비어있는 트리입니다.')
      return;
    }

    this.deleteNode(this.root, data);
  }

  deleteNode(root, data) {
    if (root === null) {
      return root;
    }
    if (data < root.data) {
      root.left = this.deleteNode(root.left, data);
    }
    if (data > root.data) {
      root.right = this.deleteNode(root.right, data);
    }
    if (data === root.data) {
      if (!root.left && !root.right) { // no child
        return null;
      }
      if (!root.left) { // 1 child
        return root.right;
      }
      if (!root.right) { // 1 child
        return root.left;
      }
      // 2 children
      root = this.getMin(root.right); //가장 작은값으로 현재 root노드 대체
      root.right = this.deleteNode(root.right, root.data); //찾았던 가장 작은값 삭제
    }
    return root;
  }

  find(root, data) {
    if (root.data === data) {
      return root;
    }

    if (root.data < data) {
      return this.find(root.right, data);
    }

    return this.find(root.left, data);
  }

  getMin(root) {
    if (root.left === null) {
      return root;
    }
    return this.getMin(root.left);
  }

  getMax() {
    if (root.right === null) {
      return root;
    }
    return this.getMax(root.right);
  }

  inOrder() { // 중위순회(왼쪽 - 자신 - 오른쪽)
    return this.inOrderNode(this.root, []);
  }

  inOrderNode(root, result) {
    if (root !== null) {
      this.inOrderNode(root.left, result);
      result.push(root.data);
      this.inOrderNode(root.right, result);
    }
    return result;
  }

  search(value) {
    return this.searchNode(this.root, value);
  }

  searchNode(root, value) {
    if (root.data < value) {
      return this.searchNode(root.right, value);
    }
    if (root.data > value) {
      return this.searchNode(root.left, value);
    }
    return root;
  }
}

test('Insert', () => {
  const tree = new BinarySearchTree();

  tree.insert(5);
  tree.insert(1);
  tree.insert(2);
  tree.insert(4);
  tree.insert(6);
  tree.insert(7);
  tree.insert(8);

  expect(tree.inOrder()).toEqual([1, 2, 4, 5, 6, 7, 8]);
});

test.only('Delete', () => {
  const tree = new BinarySearchTree();

  tree.insert(5);
  tree.insert(1);
  tree.insert(2);
  tree.insert(4);
  tree.insert(6);
  tree.insert(7);
  tree.insert(8);

  tree.delete(4);

  expect(tree.inOrder()).toEqual([ 1, 2, 5, 6, 7, 8 ]);
});

test('getMin', () => {
  const tree = new BinarySearchTree();
  const root = tree.root;

  tree.insert(3);
  tree.insert(2);
  tree.insert(1);
  tree.insert(4);
  tree.insert(5);

  expect(tree.getMin(root).data).toEqual(1);
});

test.only('search', () => {
  const tree = new BinarySearchTree();

  tree.insert(3);
  tree.insert(2);
  tree.insert(1);
  tree.insert(4);
  tree.insert(5);

  expect(tree.search(1)).toEqual({ data: 1, left: null, right: null });
});
