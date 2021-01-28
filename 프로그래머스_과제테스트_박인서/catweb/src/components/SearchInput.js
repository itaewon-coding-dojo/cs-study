export default class SearchInput {
  constructor({ $target, onSearch, loading }) {
    this.$searchInput = document.createElement("input");
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    this.$searchInput.className = "SearchInput";
    this.loading = loading;
    this.onSearch = onSearch;
    
    $target.appendChild(this.$searchInput);

    this.focusInput();
    this.deleteInput();
    this.search();
    this.searchRecentKeyword();
  }

  setState(keyword) {
    this.$searchInput.value = keyword;
  }

  focusInput() {
    setTimeout(()=> {
      this.$searchInput.focus();
    }, 0)
  }

  deleteInput() {
    this.$searchInput.addEventListener('click', (e) => {
      e.target.value = null;
    })
  }

  search() {
    this.$searchInput.addEventListener("keyup", e => {
      if (e.key === 'Enter') {
        this.loading.startFetching();
        this.onSearch(e.target.value);
      }
    });
  }

  searchRecentKeyword(){
    if (localStorage.getItem('keywords')) {
      const recentKeyword = JSON.parse(localStorage.getItem('keywords'))[0];
      this.$searchInput.value = recentKeyword;
      this.loading.startFetching();
      this.onSearch(recentKeyword);
    }
  }
}
