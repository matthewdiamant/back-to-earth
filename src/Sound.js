class Oscillator {
  constructor({ frequency, type, volume }) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    let context = new AudioContext();
    this.oscillator = context.createOscillator();

    this.oscillator.frequency.value = frequency;
    this.oscillator.type = type;

    let gainNode = context.createGain();
    this.oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    gainNode.gain.value = volume;
  }

  on() {
    this.oscillator.start(0);
  }

  off() {
    this.oscillator.stop(0);
  }

  burst() {
    this.oscillator.start(0);
    this.oscillator.stop(0.1);
  }
}

export default class Sound {
  constructor() {
    this.state = {
      engine: false
    };
  }
  create() {
    let oscillator = new Oscillator();
  }

  engineOn() {
    if (this.state.engine) return;
    this.state.engine = true;
    this.engine =
      this.engine ||
      new Oscillator({ frequency: 50, type: "triangle", volume: 0.2 });
    this.engine.on();
  }

  engineOff() {
    if (!this.state.engine) return;
    this.state.engine = false;
    this.engine.off();
    this.engine = null;
  }

  playerShot() {
    let playerShotSound = new Oscillator({
      frequency: Math.floor(50 * Math.random() + 300),
      type: "sine",
      volume: 0.05
    });
    playerShotSound.burst();
  }
}
