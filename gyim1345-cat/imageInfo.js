class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data, getInfo }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);
    const overlay = document.createElement("section");
    this.data = data;

    this.render();
  }
  
  closeModal(event) {
    event.stopPropagation();

    event.target.parentNode.parentNode.parentNode.classList.add("fader");
    event.target.parentNode.parentNode.parentNode.classList.add("fadedOut");

    setTimeout(() => {
      event.target.parentNode.parentNode.parentNode.style.display = 'none'
      event.target.parentNode.parentNode.parentNode.classList.remove("fadedOut");
    }, (500));
  }

  close(event) {
    event.stopPropagation();

    event.target.classList.add("fader");
    event.target.classList.add("fadedOut");

    setTimeout(() => {
      event.target.style.display = 'none'
      event.target.classList.remove("fadedOut");

    }, (500));
  }

  closea(event) {
    event.stopPropagation();
  }

  addEvent() {
    const close = this.$imageInfo.getElementsByClassName('close')[0];
    const ImageInfo = document.getElementsByClassName('ImageInfo')[0];
    const contentWrapper = document.getElementsByClassName('content-wrapper')[0];

    close.addEventListener("click", this.closeModal);
    ImageInfo.addEventListener("click", this.close);
    contentWrapper.addEventListener("click", this.closea);

    setTimeout(() => {
      this.$imageInfo.classList.remove("fadein");
      this.$imageInfo.classList.remove("fader");
    }, (500));
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
    this.addEvent();
  }


  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.image;
      this.$imageInfo.innerHTML = `
      <div class="content-wrapper">
          <div class="title">
          <span>${name}</span>
          <div class="close"">x</div>
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
        this.$imageInfo.classList.add("fadein");

  }
}