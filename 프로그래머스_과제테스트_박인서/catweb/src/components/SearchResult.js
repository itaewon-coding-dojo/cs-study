export default class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick, loading }) {
    this.$searchResult = document.createElement("div");
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;
    this.loading = loading;
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
    this.loadImage();
    this.loading.finishFetching();
  }

  loadImage() {
    let isLoading = false;

    const lazyHandler = () => {
      const lazyImages = document.querySelectorAll('.lazy');
      const WAIT_TIME = 100;

      if (!isLoading) {
        isLoading = true;
        setTimeout(() => {
          const windowHeight = window.innerHeight;
          const scrollTop = window.scrollY;

          lazyImages.forEach((img) => {
            if (img.offsetTop < windowHeight + scrollTop) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
            }
          })
          isLoading = false;
        }, WAIT_TIME);
      }

      if (lazyImages.length === 0) {
        document.removeEventListener('scroll', lazyHandler);
        window.removeEventListener('resize', lazyHandler);
        window.removeEventListener('orientationchange', lazyHandler);
      }
    }

    document.addEventListener('scroll', lazyHandler);
    window.addEventListener('resize', lazyHandler);
    window.addEventListener('orientationchange', lazyHandler);
  }

  render() {
    const INIT_IMAGE_CNT = 12;

    if (this.data.length === 0) {
      this.$searchResult.innerHTML = `<section>검색결과를 찾지 못했습니다</section>`
      return;
    }

    this.$searchResult.innerHTML = this.data.map((cat, index) =>
      `<div class="item">
        ${index < INIT_IMAGE_CNT ?
        `<img src=${cat.url} alt=${cat.name} data-index=${index} />` :
        `<img class="lazy" src='' data-src=${cat.url} data-index=${index} alt=${cat.name} />`}
      </div>`).join("");

    this.$searchResult.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      this.onClick(this.data[index]);
    })
  }
}
