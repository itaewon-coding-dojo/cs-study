class RecentSearchList {
  constructor({ $target, onClick }) {    
    this.$recentSearchList = document.createElement('div');
    this.$recentSearchList.className = 'RecentSearchList';

    this.MAX_ITEM_COUNT = 5;
    this.keywords = [];

    $target.append(this.$recentSearchList);

    this.$recentSearchList.addEventListener('click', (e) => {
      if (e.target.localName === 'button') {
        onClick(e.target.innerText);
      }
    });
  }

  addKeyword(keyword) {
    if (this.keywords.length === this.MAX_ITEM_COUNT) {
      this.keywords.shift(); 
    }

    this.keywords.push(keyword);
    this.render();
  }

  render() {
    this.$recentSearchList.innerHTML = `
      ${this.keywords.map(keyword => `<button type="button">${keyword}</button>`).join('')}
    `;
  }
}

export default RecentSearchList;
  