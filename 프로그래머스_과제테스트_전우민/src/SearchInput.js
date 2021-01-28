class SearchInput {
  constructor({ $target, onSearch }) {
    this.$searchInput = document.createElement("input");
    this.$searchInput.placeholder = "고양이를 검색해보세요.";
    this.$searchInput.className = "SearchInput";
    this.$searchInput.setAttribute('autofocus', 'true');

    $target.appendChild(this.$searchInput);

    this.$searchInput.addEventListener("keyup", ({ keyCode, target }) => {
      const ENTER_KEYCODE = 13;
      
      if (keyCode === ENTER_KEYCODE) {
        onSearch(target.value);
      }
    });
  }

  getElement() {
    return this.$searchInput;
  }

  changeValue(keyword) {
    this.$searchInput.value = keyword;
  }
}

export default SearchInput;
