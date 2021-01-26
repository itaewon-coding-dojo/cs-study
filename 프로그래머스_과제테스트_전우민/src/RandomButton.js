class RandomButton {
  constructor({ $target, onClick }) {    
    this.$randomButton = document.createElement('button');
    this.$randomButton.className = 'RandomButton';
    this.$randomButton.innerText = 'Random';

    $target.append(this.$randomButton);

    this.$randomButton.addEventListener('click', () => {
      onClick();
    });
  }
}

export default RandomButton;
