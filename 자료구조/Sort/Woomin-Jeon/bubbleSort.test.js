const bubbleSort = (arr) => {
  arr.forEach(() => {
    arr.forEach((_, i) => {
      const prev = arr[i - 1];
      const curr = arr[i];

      if (prev > curr) {
        arr[i - 1] = curr;
        arr[i] = prev;
      }
    });
  });

  return arr;
};

test('bubbleSort', () => {
  expect(bubbleSort([4, 7, 2, 3, 6, 1, 5, 8])).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
});
