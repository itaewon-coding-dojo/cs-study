import ImageInfo from './components/ImageInfo.js';
import SearchInput from './components/SearchInput.js';
import SearchResult from './components/SearchResult.js';
import Button from './components/Button.js';
import Loading from './components/Loading.js';
import RecentKeywords from './components/RecentKeywords.js';

import { fetchCat, fetchCats, fetchRandomCats } from './apis/fetchCatAPI.js';
import { changeTheme, showImageInfo } from './utils/events.js';

export default class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;
    this.theme = localStorage.getItem('theme');

    document.documentElement.setAttribute('data-theme', this.theme);

    this.toggleThemeButton = new Button({
      $target,
      onClick: () => changeTheme(),
      text: '테마변경'
    });

    this.loading = new Loading({
      $target,
      isFetching: false,
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: async keyword => {
        const { data } = await fetchCats(keyword);
        this.setState(data);
        this.setRecentKeywords(keyword);
      },
      loading: this.loading,
    });

    this.recentKeywords = new RecentKeywords({
      $target,
      onSearch: async keyword => {
        const { data } = await fetchCats(keyword);
        this.setState(data);
        this.setRecentKeywords(keyword);
      },
      loading: this.loading,
      setInput: (keyword) => {
        this.setInput(keyword);
      }
    })

    this.randomButton = new Button({
      $target,
      onClick: async () => {
        const { data } = await fetchRandomCats();
        this.setState(data);
      },
      text: '랜덤고양이'
    })

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null
      },
      searchDetail: async (id) => {
        const { data } = await fetchCat(id);
        return data;
      }
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: showImageInfo(this.imageInfo),
      loading: this.loading,
    });
    
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }

  setRecentKeywords(keyword) {
    this.recentKeywords.setState(keyword);
  }

  setInput(keyword) {
    this.searchInput.setState(keyword);
  }
}
