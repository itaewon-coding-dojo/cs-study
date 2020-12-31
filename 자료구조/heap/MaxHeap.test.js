class MaxHeap {
  constructor() {
    this.items = [];
  }

  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }

  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  hasLeftChild(currentIndex) {
    return this.getLeftChildIndex(currentIndex) <= this.items.length - 1;
  }

  hasRightChild(currentIndex) {
    return this.getRightChildIndex(currentIndex) <= this.items.length - 1;
  }

  hasParent(currentIndex) {
    return this.getParentIndex(currentIndex) <= this.items.length - 1;
  }

  getLeftChild(index) {
    return this.items[this.getLeftChildIndex(index)];
  }

  getRightChild(index) {
    return this.items[this.getRightChildIndex(index)];
  }

  getParent(index) {
    return this.items[this.getParentIndex(index)];
  }

  swap(indexOne, indexTwo) {
    let temp = this.items[indexOne];
    this.items[indexOne] = this.items[indexTwo];
    this.items[indexTwo] = temp;
  }

  isEmpty() {
    return this.items.length === 0;
  }
  peek() {
    if (this.isEmpty()) {
      return;
    }
    return this.items[0];
  }

  remove() {
    if (this.isEmpty()) {
      return;
    }
    if (this.items.length === 1) {
      return this.items.pop();
    }
    const item = this.items.pop();
    const removed = this.items[0];
    this.items[0] = item;

    this.heapifyDownward();
    return removed;
  }

  insert(item) {
    this.items.push(item);
    this.heapifyUpward();
  }

  heapifyUpward() {
    let currentIndex = this.items.length - 1;
    while (this.getParent(currentIndex) < this.items[currentIndex]) {
      this.swap(this.getParentIndex(currentIndex), currentIndex);
      currentIndex = this.getParentIndex(currentIndex);
    }
  }

  heapifyDownward() {
    let currentIndex = 0;
    while (this.hasLeftChild(currentIndex)) {
      let greaterChildIndex = this.getLeftChildIndex(currentIndex);
      if (
        this.hasRightChild(currentIndex) &&
        this.getRightChild(currentIndex) > this.getLeftChild(currentIndex)
      ) {
        greaterChildIndex = this.getRightChildIndex(currentIndex);
      }
      if (this.items[currentIndex] > this.items[greaterChildIndex]) {
        break;
      }
      this.swap(currentIndex, greaterChildIndex);
      currentIndex = greaterChildIndex;
    }
  }

  toArray() {
    return this.items;
  }
}

module.exports = MaxHeap;

test('insert', () => {
  const heap = new MaxHeap();
  [6, 5, 3, 1, 8, 7, 2, 4].forEach((value) => heap.insert(value));
  expect(heap.toArray()).toEqual([8, 6, 7, 4, 5, 3, 2, 1]);
});
test('remove', () => {
  const heap = new MaxHeap();
  [6, 5, 3, 1, 8, 7, 2, 4].forEach((value) => heap.insert(value));
  [8, 7, 6, 5, 4, 3, 2, 1].forEach((value) => {
    expect(heap.remove()).toBe(value);
  });
});
