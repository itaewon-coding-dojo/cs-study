export default class RecentKeywords{
  constructor({ $target, onSearch, loading, setInput }) {
    this.$recentKeywords = document.createElement('div');
    this.$recentKeywords.className = 'RecentKeywords';
    this.keywords = JSON.parse(localStorage.getItem('keywords'));

    $target.appendChild(this.$recentKeywords);
    this.render();

    this.$recentKeywords.addEventListener('click', (e) => {
      const keyword = e.target.dataset.keyword; 
      if (keyword) {
        loading.startFetching();
        setInput(keyword)
        onSearch(keyword);
      }
    })
  }

  setState(keyword) {
    if (!this.keywords) {
      localStorage.setItem('keywords', JSON.stringify([keyword]));
      this.keywords = [keyword];
      this.render();
      return;
    }

    if (this.keywords.length >= 5) {
      this.keywords.pop();
    }
    this.keywords.unshift(keyword);

    localStorage.setItem('keywords', JSON.stringify(this.keywords)); 
    this.render();
  }

  render() {
    if (this.keywords) {
      this.$recentKeywords.innerHTML = this.keywords.map((keyword) => {
        return `<button data-keyword=${keyword}>${keyword}</button>`
      }).join(' ');
    }

  }
}