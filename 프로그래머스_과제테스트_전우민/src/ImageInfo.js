class ImageInfo {
  constructor({ $target, data }) {
    this.$imageInfo = document.createElement("div");
    this.$imageInfo.className = "ImageInfo";
    
    $target.appendChild(this.$imageInfo);

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

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.image;

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
      
      const contentWrapper = document.querySelector('.content-wrapper');
      const closeButton = document.querySelector('.close');

      const modalCloseEvent = () => {
        this.toggleFadeInOut(false);
        this.$imageInfo.removeEventListener('click', modalOutsideClickEvent);
        window.removeEventListener('keydown', modalCloseKeyboardEvent);
        setTimeout(() => {
          this.$imageInfo.style.display = "none";          
        }, 1000);
      }

      const modalCloseKeyboardEvent = ({ keyCode }) => {
        const ESC_KEYCODE = 27;
        if (keyCode === ESC_KEYCODE) {
          modalCloseEvent();      
        }
      }
      
      const modalOutsideClickEvent = (e) => {
        if (!e.target.contains(contentWrapper)) {
          return;
        }
        modalCloseEvent();
      }

      closeButton.addEventListener('click', modalCloseEvent);
      window.addEventListener('keydown', modalCloseKeyboardEvent);
      this.$imageInfo.addEventListener('click', modalOutsideClickEvent);
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}

export default ImageInfo;
