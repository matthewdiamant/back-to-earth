class Oscillator {
  constructor({ frequency, type, volume }) {
    // Temporary workaround until AudioContext is standardized
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
}
