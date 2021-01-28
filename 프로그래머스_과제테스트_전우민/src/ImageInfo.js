class ImageInfo {
  constructor({ $target, data }) {
    this.$imageInfo = document.createElement("div");
    this.$imageInfo.className = "ImageInfo";
    
    $target.append(this.$imageInfo);

    this.data = data;

    this.render();
  }

  toggleFadeInOut(isFadeIn) {
    const opacity = isFadeIn ? 1 : 0;
    
    this.$imageInfo.style.opacity = opacity;
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
    setTimeout(() => this.toggleFadeInOut(true), 100);
  }

  openModal() {
    this.$imageInfo.style.display = "block";
  }

  closeModal() {
    this.$imageInfo.style.display = "none";
  }

  render() {
    if (!this.data.visible) {
      this.closeModal();
      return;
    }

    const { name, url, temperament, origin } = this.data.image;

    this.$imageInfo.innerHTML = `
      <div class="content-wrapper">
        <div class="title">
          <span>${name}</span>
          <button class="close">x</button>
        </div>
        <img src="${url}" alt="${name}"/>        
        <div class="description">
          <p>성격: ${temperament}</p>
          <p>태생: ${origin}</p>
        </div>
      </div>`;

    this.openModal();
    
    const contentWrapper = document.querySelector('.content-wrapper');
    const closeButton = document.querySelector('.close');

    const modalCloseEvent = () => {
      this.toggleFadeInOut(false);
      setTimeout(() => this.closeModal(), 1000);

      this.$imageInfo.removeEventListener('click', modalOutsideClickEvent);
      window.removeEventListener('keydown', modalCloseKeyboardEvent);
    }

    const modalCloseKeyboardEvent = ({ keyCode }) => {
      const ESC_KEYCODE = 27;
      if (keyCode === ESC_KEYCODE) {
        modalCloseEvent();      
      }
    }
    
    const modalOutsideClickEvent = ({ target }) => {
      if (!target.contains(contentWrapper)) {
        return;
      }
      modalCloseEvent();
    }

    closeButton.addEventListener('click', modalCloseEvent);
    window.addEventListener('keydown', modalCloseKeyboardEvent);
    this.$imageInfo.addEventListener('click', modalOutsideClickEvent);
  }
}

export default ImageInfo;
