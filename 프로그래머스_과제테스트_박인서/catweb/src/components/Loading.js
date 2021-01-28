export default class Loading {
  constructor({ $target, isFetching }) {
    this.$loading = document.createElement('section');
    this.$loading.className = 'Loading';
    this.isFetching = isFetching;
    
    $target.appendChild(this.$loading);

    this.isFetching && this.render();
  }

  startFetching() {
    this.isFetching = true;
    this.render();
    this.$loading.style.display = 'inline-block';
  }

  finishFetching() {
    this.isFetching = false;
    this.$loading.style.display = 'none';
  }

  render() {
    this.$loading.innerHTML = '검색결과를 불러오는 중 입니다...';
  }
}