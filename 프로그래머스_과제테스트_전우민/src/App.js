import ThemeMode from './ThemeMode.js';
import Banner from './Banner.js';
import Search from './Search.js';
import SearchInput from './SearchInput.js';
import RandomButton from './RandomButton.js';
import RecentSearchList from './RecentSearchList.js';
import SearchResult from './SearchResult.js';
import ImageInfo from './ImageInfo.js';
import Message from './Message.js';
import api from './api.js';

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.themeMode = new ThemeMode({ $target });

    this.banner = new Banner({ $target });

    this.search = new Search({ $target });

    this.searchInput = new SearchInput({
      $target: this.search.getElement(),
      onSearch: async (keyword) => {
        this.loadingMessage.setState(true);
        this.noResultMessage.setState(false);
        this.recentSearchList.addKeyword(keyword);
        localStorage.setItem('lastKeyword', keyword);

        const { data } = await api.fetchCats(keyword);

        if (data.length === 0) {
          this.noResultMessage.setState(true);
        }

        this.setState(data);
      }
    });

    this.randomButton = new RandomButton({
      $target: this.search.getElement(),
      onClick: async () => {
        this.loadingMessage.setState(true);
        this.noResultMessage.setState(false);
        
        const { data } = await api.fetchRandomCats();

        if (data.length === 0) {
          this.noResultMessage.setState(true);
        }
        
        this.setState(data);
      }
    });

    this.recentSearchList = new RecentSearchList({
      $target,
      onClick: async (keyword) => {
        this.loadingMessage.setState(true);
        this.noResultMessage.setState(false);
        this.searchInput.changeValue(keyword);

        const { data } = await api.fetchCats(keyword);

        if (data.length === 0) {
          this.noResultMessage.setState(true);
        }

        this.setState(data)
      }
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async (image) => {
        this.loadingMessage.setState(true);
        
        const { data } = await api.fetchCatInformation(image.id);
        
        this.loadingMessage.setState(false);

        this.imageInfo.setState({
          visible: true,
          image: { ...image, ...data }
        });
      }
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null
      }
    });

    this.loadingMessage = new Message({
      $target,
      message: '데이터를 불러오는 중입니다...'
    });

    this.noResultMessage = new Message({
      $target,
      message: '검색 결과가 없습니다'
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
    this.loadingMessage.setState(false);
  }
}

export default App;
