const bruteForce = (string, targetWord) => {
  for(let i=0; i < string.length; i += 1) {
    let match = true;
    for(let j=0; j < targetWord.length; j += 1) {
      if(string[i+j] !== targetWord[j]) {
        match = false;
        break;
      }
    }
    if(match) {
      return i;
    }
  }
  return 1;
}


test('bruteForce', () => {
  expect(bruteForce('abcdefg', 'cde')).toBe(2);
});