// max-Heap
class Heap {
  constructor() {
    this.elements = [];    
  }

  insert(value) {
    this.elements = [...this.elements, value];
    const lastChildIndex = this.elements.length - 1;
    this.heapifyInsert(lastChildIndex);
  }

  remove() {
    const rootIndex = 0;
    const root = this.elements[rootIndex];
    this.swap(rootIndex, this.elements.length - 1)
    this.elements = this.elements.slice(rootIndex, -1);
    this.heapifyRemove(rootIndex);
    return root;
  }

  heapifyInsert(childIndex) {
    const parentIndex = Math.ceil(childIndex / 2 - 1);
    const child = this.elements[childIndex];
    const parent = this.elements[parentIndex];

    if (child > parent) {
      this.swap(parentIndex, childIndex);
      this.heapifyInsert(parentIndex)
    }
  }

  heapifyRemove(parentIndex) {
    const leftChildIndex = parentIndex * 2 + 1;
    const rightChildIndex = parentIndex * 2 + 2;
    const parent = this.elements[parentIndex];
    const leftChild = this.elements[leftChildIndex];
    const rightChild = this.elements[rightChildIndex];
    
    if (leftChild > parent) {
      this.swap(leftChildIndex, parentIndex);
      this.heapifyRemove(leftChildIndex);
    }

    if (rightChild > parent) {
      this.swap(rightChildIndex, parentIndex);
      this.heapifyRemove(rightChildIndex);
    }
  }

  swap(firstIndex, secondIndex) {
    const temp = this.elements[firstIndex];
    this.elements[firstIndex] = this.elements[secondIndex];
    this.elements[secondIndex] = temp;
  }
}

test('insert', () => {
  const heap = new Heap();
  [6, 5, 3, 1, 8, 7, 2, 4].forEach(value => heap.insert(value));
  expect(heap.elements).toEqual([8, 6, 7, 4, 5, 3, 2, 1]);
});

test('remove', () => {
  const heap = new Heap();
  [6, 5, 3, 1, 8, 7, 2, 4].forEach(value => heap.insert(value));
  [8, 7, 6, 5, 4, 3, 2, 1].forEach(value => {
    expect(heap.remove()).toBe(value);
  });
});
