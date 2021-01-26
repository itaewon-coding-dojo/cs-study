class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("div");
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    this.$searchResult.innerHTML = this.data.map((cat, index) => `
      <div class="item">
        <img src=${cat.url} alt=${cat.name} data-index=${index} />
      </div>
    `).join("");

    this.$searchResult.addEventListener('click', (e) => {
      if (e.target.localName === 'img') {
        const index = e.target.dataset.index;
        this.onClick(this.data[index]);
      }
    });
  }
}

export default SearchResult;
