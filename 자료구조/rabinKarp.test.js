const rabinKarp = (string, targetWord) => {
  const targetHash = getHash(targetWord);
  const length = targetWord.length;
  let currentHash = getHash(string.substring(0,length));
  for(let i = 0; i < string.length - length; i += 1) {
    if(targetHash === currentHash){
      return i;
    }
    currentHash = updateHash(currentHash, string[i], string[i+length], length)
  }
}

const updateHash = (currentHash, first, last = '0', length) => {
  return (currentHash - first.charCodeAt(0) * Math.pow(2, length - 1)) * 2 + last.charCodeAt(0); 
}

const getHash = (string) => {
  console.log(string);
  return string.split('').reduce((acc,cur,i) => {
    console.log(acc, cur.charCodeAt(0), cur.charCodeAt(0) * Math.pow(2, string.length - i -1))
    return acc + cur.charCodeAt(0) * Math.pow(2, string.length - i -1);
  },0)
}



test('rabinKarp', () => {
  expect(rabinKarp('abcdefg', 'cde')).toBe(2);
});