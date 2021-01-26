class Search {
    constructor({ $target }) {    
      this.$search = document.createElement('div');
      this.$search.style.display = 'flex';
  
      $target.append(this.$search);
    }

    getElement() {
      return this.$search;
    }
  }
  
  export default Search;
  