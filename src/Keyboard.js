class Keyboard {
  constructor() {
    document.addEventListener("keyup", event => this.onKeyup(event));
    document.addEventListener("keydown", event => this.onKeydown(event));

    this._pressed = {};

    this.SPACE = 32;
    this.LEFT = 37;
    this.UP = 38;
    this.RIGHT = 39;
    this.DOWN = 40;
  }

  isDown(keyCode) {
    return this._pressed[keyCode];
  }

  onKeydown(event) {
    this._pressed[event.keyCode] = true;
  }

  onKeyup(event) {
    delete this._pressed[event.keyCode];
  }
}

export default Keyboard;
