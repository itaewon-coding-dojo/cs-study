export default class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data, searchDetail }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    this.searchDetail = searchDetail;

    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
    this.closeContentWithClick(this.$imageInfo);
    this.closeContentWithEscapse(this.$imageInfo);
  }

  async setState(nextData) {
    this.data = await this.searchDetail(nextData.image.id)
    this.data.visible = true;
    this.render();
  }

  closeContentWithClick(content) {
    const targetClassNames = ['ImageInfo', 'close'];

    content.addEventListener('click', (e) => {
      const clickedClass = e.target.className;

      if (targetClassNames.includes(clickedClass)) {
        content.style.display = 'none';
      }
    })
  }

  closeContentWithEscapse(content) {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        content.style.display = 'none';
      }
    })
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </div>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;
      this.$imageInfo.style.display = "block";
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}
