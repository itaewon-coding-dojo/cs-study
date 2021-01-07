// 무조건 정렬된 리스트에서 실행
// 평균 복잡도 O(√n)
// 점프 하면서 interval을 찾는 순간 linear search 실행

const jumpSearch = (array, target) => {

  const jumpSize = Math.floor(Math.sqrt(array.length));
  let index = 0;
  //점프
  while(target > array[index]) {
    index += jumpSize;
  }
  //반대 방향으로 linear search
  for(let i = index; i > index -jumpSize; i -= 1) {
    if(target === array[i]) {
      return i;
    }
  }

  return 'Not Found';
}

test('jumpSearch', () => {
  expect(jumpSearch([0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610 ], 55)).toBe(10);
  
  expect(jumpSearch([0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610 ], 54)).toBe('Not Found');

  expect(jumpSearch([0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610 ], 144)).toBe(12);
  
  expect(jumpSearch([0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610 ], 233)).toBe(13);

  expect(jumpSearch([10, 20, 30,40 ,50,60, 70, 80, 90 ], 90)).toBe(8);
});

