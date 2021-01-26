class Message {
  constructor({ $target, message }) {    
    this.$message = document.createElement('div');
    this.$message.className = 'Message';
    this.$message.innerHTML = `<h2>${message}</h2>`;

    $target.append(this.$message);
  }

  setState(isOn) {
    if (isOn) {
      this.$message.style.display = 'block';
      return;
    }

    this.$message.style.display = 'none';
  }
}

export default Message;
