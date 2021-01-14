class Node {
  constructor() {
    this.next = {};
    this.mark = false;
  }
}

class Trie {
  constructor() {
    this.root = new Node(null);
  }

  search(word) {
    const characters = word.split('');

    return this.searchCharacter(this.root, characters);
  }

  searchCharacter(parentNode, characters) {
    const targetCharacter = characters.shift();

    if (!targetCharacter && parentNode.mark) {
      return true;
    }

    const existingCharacter = parentNode.next[targetCharacter];
    
    if (!existingCharacter) {
      return false;
    }

    return this.searchCharacter(existingCharacter, characters);
  }

  addWord(word) {
    const characters = word.split('');

    this.addCharacter(this.root, characters);
  }

  addCharacter(parentNode, characters) {
    const targetCharacter = characters.shift();

    if (!targetCharacter) {
      parentNode.mark = true;
      return;
    }

    const existingCharacter = parentNode.next[targetCharacter];

    if (existingCharacter) {
      this.addCharacter(existingCharacter, characters);
      return;
    }

    const newNode = new Node();
    parentNode.next[targetCharacter] = newNode;
    this.addCharacter(newNode, characters);
  }

  render() {
    console.log(JSON.stringify(this.root, null, '   '));
  }
}

test('Trie', () => {
  const trie = new Trie();

  trie.addWord('car');
  trie.addWord('cas');
  trie.addWord('case');
  trie.addWord('cut');

  expect(trie.search('car')).toBe(true);
  expect(trie.search('cas')).toBe(true);
  expect(trie.search('case')).toBe(true);
  expect(trie.search('cut')).toBe(true);

  expect(trie.search('ca')).toBe(false);
  expect(trie.search('caa')).toBe(false);

  trie.render();
});
