const swap = (array, index1, index2) => {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}

const bubbleSort = (array) => {
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i -1 ; j++) {
      if(array[j] > array[j+1]) {
        swap(array, j, j+1);
      }
    }
  }
 
  return array;
}

test('BubbleSort', () => {
  expect(bubbleSort([5, 2])).toEqual([2, 5]);

  expect(bubbleSort([3, 5, 2])).toEqual([2, 3, 5]);

  expect(bubbleSort([5, 2, 3, 4, 1,])).toEqual([1,2,3,4,5]);

});
