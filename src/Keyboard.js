export default class Keyboard {
  _pressed = {};

  LEFT = 37;
  UP = 38;
  RIGHT = 39;
  DOWN = 40;

  constructor() {
    document.addEventListener("keyup", event => this.onKeyup(event));
    document.addEventListener("keydown", event => this.onKeydown(event));
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
