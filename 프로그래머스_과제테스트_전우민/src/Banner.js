import api from './api.js';

class Banner {
  constructor({ $target }) {
    this.$banner = document.createElement('div');
    this.$banner.className = 'Banner';
    
    this.ITEM_WIDTH = 200;
    this.ITEM_SHOWING_COUNT = 5;
    this.ITEM_TOTAL_COUNT = 50;

    this.data = Array(this.ITEM_SHOWING_COUNT).fill({});
    this.translate = 0;

    $target.append(this.$banner);

    this.render();
    this.loadRandomImages();
  }

  loadRandomImages() {
    api.fetchRandomCats().then(({ data }) => {
      this.data = data;
      this.render();
    });
  }

  render() {
    this.$banner.innerHTML = `
      <button type="button"><</button>
      <div class="slide-box" style="width: ${this.ITEM_WIDTH * this.ITEM_SHOWING_COUNT}px">
        <ul class="slide-list" style="width: ${this.ITEM_WIDTH * this.ITEM_TOTAL_COUNT}px">
          ${this.data.map(image => `
            <li class="slide-content" style="width: ${this.ITEM_WIDTH}px">
              <img src=${image.url} data-src=${image.url} />
            </li>
          `).join('')}
        </ul>
      </div>
      <button type="button">></button>
    `;

    const [prevButton, nextButton] = this.$banner.querySelectorAll('button');
    
    const slideList = this.$banner.querySelector('.slide-list');

    prevButton.addEventListener('click', () => {
      this.translate -= this.ITEM_WIDTH;
      slideList.style.transform = `translateX(${this.translate}px)`;
    });
    nextButton.addEventListener('click', () => {
      this.translate += this.ITEM_WIDTH;
      slideList.style.transform = `translateX(${this.translate}px)`;
    });
  }
}

export default Banner;
