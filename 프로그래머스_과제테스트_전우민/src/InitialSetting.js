import api from './api.js';
import { throttle } from './utils/utils.js';

class InitialSetting {
  constructor({ app }) {    
    this.app = app;

    this.loadInitialData();
    this.initLazyLoading();
  }

  async loadInitialData() {
    const lastKeyword = localStorage.getItem('lastKeyword');

    if (!lastKeyword) {
      return;
    }

    const { data } = await api.fetchCats(lastKeyword);

    this.app.setState(data);
  }

  initLazyLoading() {
    const lazyLoadingEvent = (e) => {
      const lazyImages = document.querySelectorAll('img');
    
      lazyImages.forEach(image => {
        const currentWindowYPosStart = window.pageYOffset;
        const currentWindowYPosEnd = currentWindowYPosStart + window.innerHeight;
    
        if (image.offsetTop <= currentWindowYPosEnd) {
          image.src = image.dataset.src;
        }
      });
    };
    
    window.addEventListener('scroll', throttle(lazyLoadingEvent, 200));
  }
}

export default InitialSetting;
  