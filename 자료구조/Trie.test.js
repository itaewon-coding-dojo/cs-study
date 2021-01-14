class Node {
  constructor() {
    this.keys = new Map();
    this.end = false;
  }

  setEnd() {
    this.end = true;
  };

  isEnd() {
    return this.end;
  };
}

class Trie {
  constructor() {
    this.root = new Node();  
  }

  add(input, currentNode = this.root) {
    if(input.length === 0) {
      currentNode.setEnd();
      return;
    }
    const currentLetter = input[0];
    const nextLetterNode = currentNode.keys.get(currentLetter) || new Node();

    if(!currentNode.keys.has(currentLetter)) {
      currentNode.keys.set(currentLetter, nextLetterNode);
    }

    return this.add(input.substring(1), nextLetterNode);
  }

  getWords(input) {
    const words = [];
    const startNode = this.getStartNode(input);

    if(startNode === 'not found') {
      return startNode;
    }
    this.dfs(startNode, words, input)
    return words;
  }

  getStartNode(input) {
    if(!input) {
      return this.root;
    }

    let count = 0;
    let currentNode = this.root;

    while(input.length > count) {
      if(!currentNode.keys.has(input[count])) {
        return 'not found';
      }
      currentNode = currentNode.keys.get(input[count]);
      count += 1;
    }

    return currentNode;
  };

  dfs(currentNode, results, input = '', currentWord = '') {
    if(currentNode.length === 0) {
      return;
    }

    if(currentNode.isEnd()) {
      results.push(input + currentWord);
    }

    currentNode.keys.forEach((node, currentLetter) => {
      this.dfs(node, results, input, currentWord + currentLetter);
    })
  }

  isWord(input) {
    const node = this.getStartNode(input);
    if(node === 'not found') {
      return false;
    } 
    return node.end;
  }
};

describe('Trie', () => {
  beforeEach(() => {
    newTrie = new Trie()
    newTrie.add('ball'); 
    newTrie.add('bat'); 
    newTrie.add('doll'); 
    newTrie.add('dork'); 
    newTrie.add('do'); 
    newTrie.add('dorm')
    newTrie.add('send')
    newTrie.add('sense')
  })

  describe('getWords', () => {
    it('returns matching words', () => {
      expect(newTrie.getWords()).toEqual(
        [
          'ball', 'bat',
          'do',   'doll',
          'dork', 'dorm',
          'send', 'sense'
        ]
      );
      expect(newTrie.getWords('ba')).toEqual(
        [
          'ball', 'bat'
        ]
      );
      expect(newTrie.getWords('s')).toEqual(
        [
          'send', 'sense'
        ]
      );
      expect(newTrie.getWords('doll')).toEqual(
        [
          'doll'
        ]
      );
      expect(newTrie.getWords('dolla')).toBe(
        'not found'
      );
    });
  });
  
  describe('isWord', () => {
    it('checks word existence and validity', () => {
      newTrie = new Trie()
      newTrie.add('ball'); 
      newTrie.add('bat'); 
      newTrie.add('doll'); 
      newTrie.add('dork'); 
      newTrie.add('do'); 
      newTrie.add('dorm')
      newTrie.add('send')
      newTrie.add('sense')
    
      expect(newTrie.isWord('')).toBe(false);
      expect(newTrie.isWord('doll')).toBe(true)
      expect(newTrie.isWord('dor')).toBe(false)
      expect(newTrie.isWord('dorf')).toBe(false)
    });
  });
})
