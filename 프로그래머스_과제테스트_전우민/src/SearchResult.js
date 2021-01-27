class SearchResult {
  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("div");
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
    const INITIAL_SHOWING_COUNT = 12;

    this.$searchResult.innerHTML = `
      <div class="SearchResult">
        ${this.data.map((cat, index) => `
          <div class="item">
            <img
              src="${index < INITIAL_SHOWING_COUNT ? cat.url : ''}"
              data-src=${cat.url}
              alt=${cat.name}
              data-index=${index}
              title=${cat.name}
            />
          </div>
        `).join("")}
      </div>
    `;
    
    const resultItems = this.$searchResult.querySelector('.SearchResult');
    resultItems.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') {
        const index = e.target.dataset.index;
        this.onClick(this.data[index]);
      }
    });
  }
}

export default SearchResult;
