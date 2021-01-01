const insertSort = (arr) => {
  for (let i = 1; i < arr.length; i += 1) {
    const target = arr[i];
    const smallerValueIndex = searchSmallerValueIndex(arr, i);
    
    arr.splice(i, 1);
    insert(arr, smallerValueIndex, target);
  }

  return arr;
};

const insert = (arr, targetIndex, value) => {
  for (let i = arr.length - 1; i >= targetIndex; i -= 1) {
    arr[i + 1] = arr[i];
  }

  arr[targetIndex] = value;

  return arr;
}

const searchSmallerValueIndex = (arr, baseIndex) => {
  for (let i = baseIndex - 1; i >= 0; i -= 1) {
    if (arr[i] < arr[baseIndex]) {
      return i + 1;
    }
  }

  return 0;
}

test('searchSmallerValueIndex', () => {
  expect(searchSmallerValueIndex([5, 1, 4, 3, 2], 1)).toBe(0);
  expect(searchSmallerValueIndex([5, 1, 4, 3, 2], 4)).toBe(2);
  expect(searchSmallerValueIndex([5, 1, 4, 3, 2], 3)).toBe(2);
  expect(searchSmallerValueIndex([5, 1, 4, 3, 8], 4)).toBe(4);
});

test('insert', () => {
  expect(insert([1, 2, 3], 0, 100)).toEqual([100, 1, 2, 3]);
  expect(insert([1, 2, 3], 1, 100)).toEqual([1, 100, 2, 3]);
  expect(insert([1, 2, 3], 2, 100)).toEqual([1, 2, 100, 3]);
  expect(insert([1, 2, 3], 3, 100)).toEqual([1, 2, 3, 100]);
});

test('insertSort', () => {
  expect(insertSort([4, 7, 2, 3, 6, 1, 5, 8])).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
});
