export const changeTheme = () => {
  const htmlElement = document.documentElement;

  if (htmlElement.dataset.theme === 'dark') {
    htmlElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
    return;
  }
  htmlElement.setAttribute('data-theme', 'dark');
  localStorage.setItem('theme', 'dark');
};

export const showImageInfo = (component) => (image) => component.setState({
  visible: true,
  image
});

