class ThemeMode {
  themeMode = window.matchMedia('(prefer-color-scheme: dark)').matches ? 'dark' : 'light';

  constructor({ $target }) {
    this.$modeToggleButton = document.createElement('button');
    this.$modeToggleButton.innerText = 'Dark / Light';

    this.$modeToggleButton.addEventListener('click', this.toggleThemeMode);

    $target.append(this.$modeToggleButton);
  }

  toggleThemeMode() {
    this.themeMode = this.themeMode === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', this.themeMode);
  }
}

export default ThemeMode;
