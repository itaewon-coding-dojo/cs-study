const getInsertIndex = (array, currentIndex) => {
  let insertIndex = 0;

  for (let j = currentIndex - 1; j >= 0; j--) {
    if(array[j] < array[currentIndex]) {
      insertIndex = j+1;
      break;
    }
  }

  return insertIndex;
}

const getTempInsertSortArray = (array, insertIndex, currentIndex) => {
  const currentElement = array[currentIndex];  

  for(let k = currentIndex; k >= insertIndex + 1; k--) {
    array[k] = array[k-1];
  }

  array[insertIndex] = currentElement;  

  return array;
}


const insertSort = (array) => {
  for (let i = 1; i < array.length; i++) {
    const currentIndex = i;
 
    const insertIndex = getInsertIndex(array, currentIndex);
    
    array = getTempInsertSortArray(array, insertIndex, currentIndex)
  }

  return array;
}

test('insertSort', () => {
  expect(insertSort([5, 2])).toEqual([2, 5]);
  expect(insertSort([3, 5, 2])).toEqual([2, 3, 5]);
  expect(insertSort([5, 2, 3, 4, 1,])).toEqual([1,2,3,4,5]);
  expect(insertSort([4, 7, 2, 3, 6, 1, 5, 8])).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);

});
