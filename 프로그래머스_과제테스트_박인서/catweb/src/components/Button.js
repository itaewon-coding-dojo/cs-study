export default class Button{
  constructor({ $target, onClick, text }) {
    this.$button = document.createElement('button');
    this.$button.className = 'Button';
    this.text = text;

    $target.appendChild(this.$button);

    this.$button.addEventListener('click', (e) => {
      onClick();
    })

    this.render();
  }

  render() {
    this.$button.innerHTML = this.text;
  }

}