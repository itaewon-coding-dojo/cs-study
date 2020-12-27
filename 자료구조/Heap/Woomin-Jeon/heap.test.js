class Heap {
  constructor() {
    this.items = [];
  }

  insert(value) {
    this.items.push(value);
    this.heapifyByInsert(this.items.length - 1);
  }

  heapifyByInsert(index) {
    const parentIndex = Math.floor((index - 1) / 2);
    const childIndex = index;

    if (this.items[parentIndex] < this.items[childIndex]) {
      this.swap(parentIndex, childIndex);
      this.heapifyByInsert(parentIndex);
    }
  }

  remove() {
    const root = this.items[0];
    this.items[0] = this.items.pop();
    this.heapifyByRemove(0);

    return root;
  }

  heapifyByRemove(index) {
    const parentIndex = index;
    const leftIndex = (index * 2) + 1;
    const rightIndex = (index * 2) + 2;

    const leftItem = this.items[leftIndex] ?? -1;
    const rightItem = this.items[rightIndex] ?? -1;

    const biggerIndex =  leftItem > rightItem ? leftIndex : rightIndex;

    if (this.items[parentIndex] < this.items[biggerIndex]) {
      this.swap(parentIndex, biggerIndex);
      this.heapifyByRemove(biggerIndex);
    }
  }

  swap(a, b) {
    const temp = this.items[a];
    this.items[a] = this.items[b];
    this.items[b] = temp;
  }
}

test('insert', () => {
  const heap = new Heap();

  [6, 5, 3, 1, 8, 7, 2, 4].forEach(value => heap.insert(value));
  
  expect(heap.items).toEqual([8, 6, 7, 4, 5, 3, 2, 1]);
});

test('remove', () => {
  const heap = new Heap();

  [6, 5, 3, 1, 8, 7, 2, 4].forEach(value => heap.insert(value));

  [8, 7, 6, 5, 4, 3, 2, 1].forEach(value => {
    expect(heap.remove()).toBe(value);
  });
});

