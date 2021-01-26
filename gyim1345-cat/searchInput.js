const TEMPLATE = '<input type="text">';


class SearchInput {
  constructor({ $target, onSearch, onRandom }) {
    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";

    $searchInput.className = "SearchInput";
    $target.appendChild($searchInput);

    const btn = document.createElement("BUTTON");
    btn.innerHTML = "CLICK ME";
    $target.appendChild(btn);

    btn.addEventListener("click", e => {
      const empty = document.getElementById("empty");
      if(empty) {
        empty.remove();
      }
      this.addLoadText();

      onRandom();
    })

    $searchInput.addEventListener("click", e=> {
      e.target.value = '';
    });

    $searchInput.addEventListener("keydown", e => {
      if (e.keyCode === 13) {
        const empty = document.getElementById("empty");
        if(empty) {
          empty.remove();
        }
        this.addLoadText();
        onSearch(e.target.value);
      }
    });

    console.log("SearchInput created.", this);
  }

  addLoadText() {
    const node = document.createElement("div");
    node.setAttribute("id", "loading");
    const textnode = document.createTextNode("Loading");
    node.appendChild(textnode);
    const app = document.getElementById("App").appendChild(node);
  }

  render() {}
}