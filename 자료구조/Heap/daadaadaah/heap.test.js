class Heap {
  constructor() {
    this.nodes = [];
  }
  
  peak() { 
    return this.nodes[0];
  }

  swap(index1, index2) {
    const index1Node = this.nodes[index1];
    const index2Node = this.nodes[index2];

    this.nodes[index1] = index2Node;
    this.nodes[index2] = index1Node;
  }

  getParentNodeIndex(childNodeIndex) {
    return Math.floor((childNodeIndex-1)/2);
  }
  
  getLeftChildNodeIndex(parentNodeIndex) {
    return 2*parentNodeIndex + 1;
  }

  getRightChildNodeIndex(parentNodeIndex) {
    return 2*parentNodeIndex + 2;
  }

  insertLast (newValue) {
    this.nodes.push(newValue);
    this.rearrangeByInsert();
    
    return this.nodes;
  }

  removePeak () {
    const peekNode = this.nodes[0];

    this.nodes[0] = this.nodes.pop();

    this.rearrangeByRemove();

    return peekNode; 
  }

  rearrangeByInsert(newNodeIndex = this.nodes.length - 1) {

  }

  rearrangeByRemove(newRootNodeIndex = 0) {

  }
}

class MinHeap extends Heap {
  constructor() {
    super();
  }

  rearrangeByInsert(newNodeIndex = this.nodes.length - 1) {
    if (newNodeIndex === 0) {
      return;
    }

    const currentNode = this.nodes[newNodeIndex];

    const parentIndex = this.getParentNodeIndex(newNodeIndex);
    const parentNode = this.nodes[parentIndex];

    if (parentNode <= currentNode) {
      return;
    }

    this.swap(newNodeIndex, parentIndex);
    newNodeIndex = parentIndex;
    this.rearrangeByInsert(newNodeIndex);
  }

  rearrangeByRemove(newRootNodeIndex = 0) {
    if(newRootNodeIndex > this.nodes.length) {
      return
    }

    const newRootNode = this.nodes[newRootNodeIndex];

    const leftChildIndex = this.getLeftChildNodeIndex(newRootNodeIndex);
    const leftChildNode = leftChildIndex < this.nodes.length ? this.nodes[leftChildIndex] : null;

    const rightChildIndex = this.getRightChildNodeIndex(newRootNodeIndex);
    const rightChildNode = rightChildIndex < this.nodes.length ? this.nodes[rightChildIndex] : null;

    const minChildIndex = leftChildNode < rightChildNode || rightChildIndex === this.nodes.length ? leftChildIndex : rightChildIndex;

    if(minChildIndex >= this.nodes.length || newRootNode <= this.nodes[minChildIndex]) {
      return;
    }

    this.swap(newRootNodeIndex, minChildIndex);
    newRootNodeIndex = minChildIndex;
    this.rearrangeByRemove(newRootNodeIndex);
  }
}

class MaxHeap extends Heap {
  constructor() {
    super();
  }

  rearrangeByInsert(newNodeIndex = this.nodes.length - 1) {
    if (newNodeIndex === 0) {
      return;
    }

    const currentNode = this.nodes[newNodeIndex];

    const parentIndex = this.getParentNodeIndex(newNodeIndex);
    const parentNode = this.nodes[parentIndex];

    if (parentNode >= currentNode) {
      return;
    }

    this.swap(newNodeIndex, parentIndex);
    newNodeIndex = parentIndex;
    this.rearrangeByInsert(newNodeIndex);
  }

  rearrangeByRemove(newRootNodeIndex = 0) {
    if(newRootNodeIndex > this.nodes.length) {
      return
    }

    const newRootNode = this.nodes[newRootNodeIndex];

    const leftChildIndex = this.getLeftChildNodeIndex(newRootNodeIndex);
    const leftChildNode = leftChildIndex < this.nodes.length ? this.nodes[leftChildIndex] : null;

    const rightChildIndex = this.getRightChildNodeIndex(newRootNodeIndex);
    const rightChildNode = rightChildIndex < this.nodes.length ? this.nodes[rightChildIndex] : null;

    const maxChildIndex = leftChildNode > rightChildNode ? leftChildIndex : rightChildIndex;

    if(maxChildIndex >= this.nodes.length || newRootNode >= this.nodes[maxChildIndex]) {
      return;
    }

    this.swap(newRootNodeIndex, maxChildIndex);
    newRootNodeIndex = maxChildIndex;
    this.rearrangeByRemove(newRootNodeIndex);
  }
}

describe('Heap', () => {
  describe('MaxHeap', () => {
    test('insert', () => {
      const maxHeap = new MaxHeap();
      [6, 5, 3, 1, 8, 7, 2, 4].forEach(value => maxHeap.insertLast(value));
      expect(maxHeap.nodes).toEqual([8, 6, 7, 4, 5, 3, 2, 1]);  
    });

    test('delelte', () => {
      const heap = new MaxHeap();

      [6, 5, 3, 1, 8, 7, 2, 4].forEach(value => heap.insertLast(value));
      [8, 7, 6, 5, 4, 3, 2, 1].forEach(value => {
        expect(heap.removePeak()).toBe(value);
      });
    });
  })

  describe('MinHeap', () => {
    test('insert', () => {
      const minHeap = new MinHeap();
      const z = minHeap.insertLast(6);
      
      expect(minHeap.peak()).toBe(6);

      minHeap.insertLast(5);
      expect(minHeap.peak()).toBe(5);
      
      minHeap.insertLast(3);
      expect(minHeap.peak()).toBe(3);

      minHeap.insertLast(1);
      expect(minHeap.peak()).toBe(1);
      
      minHeap.insertLast(8);
      expect(minHeap.peak()).toBe(1);

      minHeap.insertLast(7);
      expect(minHeap.peak()).toBe(1);

      minHeap.insertLast(2);
      expect(minHeap.peak()).toBe(1);

      minHeap.insertLast(4);
      expect(minHeap.peak()).toBe(1);    
    });

    test('delelte', () => {
      const minHeap = new MinHeap();

      [6, 5, 3, 1, 8, 7, 2, 4].forEach(value => minHeap.insertLast(value));
      [1, 2, 3, 4, 5, 6, 7, 8].forEach(value => {  
        expect(minHeap.removePeak()).toBe(value);
      });
    });
  });
});


