class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.searchInput = new SearchInput({
      $target,
      onSearch: keyword => {
        api.fetchCats(keyword).then(({ data }) => {
          this.renderOutputs(data);
        });
      },

      onRandom: keyword => {
        api.fetchRandom(keyword).then(({ data }) => {
          this.renderOutputs(data);
        });
      }

    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: image => {
        api.getInfo(image.id).then(({ data }) => {
          this.imageInfo.setState({
            visible: true,
            image: {...image, ...data},
          });
        })
      }
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null
      }
    });
  }


  renderOutputs(data) {
    this.data = [];
    this.removeLoad();
    this.setState(data)
    if(!data[0]){
      this.addEmpty();
    }
  }

  removeLoad() {
    const load = document.getElementById("loading");
    if(load) {
      load.remove();
    }
  }

  addEmpty() {
    const node = document.createElement("div");
    node.setAttribute("id", "empty");
    const textnode = document.createTextNode("empty");
    node.appendChild(textnode);
    const app = document.getElementById("App").appendChild(node);
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}