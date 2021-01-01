// O(n^2)
// 첫 요소부터 요소를 두개씩 비교 해서 앞 요소가 더 크면 두번째 요소와 자리 바꿈. 모든 요소들을 비교 하고 이 비교를 n 만큼 반복한다. 
const bubbleSort = (array) => {
  const newArray = [...array];
  newArray.forEach(_ => { 
    newArray.forEach((e, index) => {
      if(newArray[index +1] < e) {
        [newArray[index], newArray[index +1]] = [newArray[index + 1], e];
      }
    })
  });
  return newArray;
}

test('bubbleSort', () => {
  expect(bubbleSort([2,6,8,4,1,3,7,5])).toEqual([1,2,3,4,5,6,7,8]);
});

//O(n^2)
//정렬된 목록과 정렬되지 않은 목록을 동일한 배열에 유지. 
//정렬된 목록에 항목을 삽입할 올바른 위치를 찾아 넣음.
const insertionSort = (array, newArray = [], index = 0) => {
  if(index === array.length) {
    return newArray;
  }
  const currentElement = array[index];
  return insertionSort(array, insert(newArray,currentElement), index + 1);
}
const insert = (array, element) => {
  let index = 0;
  const newArray = [...array];
  while(newArray[index] && newArray[index] < element) {
    index += 1;
  }
  newArray.splice(index, 0,element)
  return newArray;
}


test('insertionSort', () => {
  expect(insertionSort([2,6,8,4,1,3,7,5])).toEqual([1,2,3,4,5,6,7,8]);
});

//O(n^2)
//(오름차순)첫번째 요소 부터 배열을 모두 탐색하여 최소값을 찾아서 그것과 자리를 바꾼다. n번만큼 반복

const selectionSort = (array,currentIndex = 0) => {
  if(currentIndex === array.length){
    return array;
  }
  
  const minIndex = array.reduce((acc, cur, index) => {
    if(index >= currentIndex && (acc.value === null || acc.value > cur)) {
      return {index, value: cur};
    }
    return acc;
  }, {index: null, value: null}).index

  return selectionSort(swap(array, minIndex, currentIndex), currentIndex +1);
}

const swap = (array, targetIndex, currentIndex) => {
 [array[targetIndex], array[currentIndex]] = [array[currentIndex], array[targetIndex]];
 return array;
}

test('selectionSort', () => {
  expect(selectionSort([2,6,8,4,1,3,7,5])).toEqual([1,2,3,4,5,6,7,8]);
});


// worst case : O(n^2) (이미 정렬이 되어 있는 경우)
// best case : O(n log n)
//임의의 pivot골라서 그 기준으로 작은건 왼쪽 배열, 큰건 오른쪽 배열에 담는다. 
//각각 배열을 또 pivot 골라서 같은 작업을 실행한다.

const quickSort = (array) => {
  if(!array[0]) {
    return[];
  }
  const pivot = array[array.length -1];

  const {left, right} = array.reduce((acc,cur)=> {
    if(cur === pivot) {
      return acc;
    }
    if(cur > pivot ){
      acc.right = [...acc.right, cur];
      return acc;
    }
    acc.left = [...acc.left, cur];
    return acc
  },{'left': [], 'right':[]})

  return [...quickSort(left), pivot,...quickSort(right)];
}


test('quickSort', () => {
  expect(quickSort([2,6,8,4,1,3,7,5])).toEqual([1,2,3,4,5,6,7,8]);
});


//worst case : O(n log n)
//best case : O(n log n)
//배열을 반씩 잘라 나가면서 하나의 요소로 쪼갠 다음 다시 병합시키면서 정렬해 나간다
//분할과 병합 단계로 나뉘는데 분할 단계는 시간 복잡도에 포함되지 않는다


const mergeSort = (array) => {
  if(array.length <= 1) {
    return [array[0]];
  }
  const midIndex = Math.floor((array.length)/2)
  return merge(mergeSort(array.slice(0,midIndex)), mergeSort(array.slice(midIndex)));
}

const merge = (leftArray = [], rightArray = []) => {
  const newArray = [];
  while(leftArray[0] || rightArray[0]) {
    if(!leftArray[0]) {
      newArray.push(rightArray.shift());
      continue;
    }
    if(!rightArray[0]) {
      newArray.push(leftArray.shift());
      continue;
    }
    if(rightArray[0] > leftArray[0]) {
      newArray.push(leftArray.shift());
      continue;
    }
    newArray.push(rightArray.shift());
  }
  return newArray;
}

test('mergeSort', () => {
  expect(mergeSort([2,6,8,4,1,3,7,5])).toEqual([1,2,3,4,5,6,7,8]);
});

// test('merge', () => {
//   expect(merge([2,6], [4,8])).toEqual([2,4,6,8]);
// });

//최선의 경우 : O(n)
// 최악의 경우 : O(n^2)
// gap을 선택하여 첫 요소 부터 해당 gap(간격)에 떨어진 요소들과 비교하여 isertion sort 실행.
// gap을 줄여 나가면서 계속 진행.


const shellSort = (array) => {
  let newArray = array;
  let gap = Math.floor(array.length/2);
  while(gap > 0) {
    const arrays = [];
    for(let currentIndex = 0; currentIndex < gap; currentIndex += 1) {
      for(let gapIndex = currentIndex; gapIndex < newArray.length; gapIndex += gap) {
        if(arrays[currentIndex]) {
          arrays[currentIndex]= [...arrays[currentIndex], newArray[gapIndex]];
          continue;
        }
        arrays[currentIndex] = [newArray[gapIndex]]
      }
    }
    newArray = arrays.map(array => insertionSort(array)).reduce((acc,cur)=> [...acc, ...cur]); 
    gap = Math.floor(gap/2);   
  }
  return newArray;
}


test('shell', () => {
  expect(shellSort([2,6,8,4,1,3,7,5])).toEqual([1,2,3,4,5,6,7,8]);
});
