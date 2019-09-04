class Oscillator {
  constructor() {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    let context = new AudioContext();
    this.oscillator = context.createOscillator();

    this.gainNode = context.createGain();
    this.oscillator.connect(this.gainNode);
    this.gainNode.connect(context.destination);
    this.gainNode.gain.value = 0;

    this.oscillator.start(0);
  }

  on({ frequency, type, volume }) {
    this.oscillator.type = type;
    this.gainNode.gain.value = volume;
    this.oscillator.frequency.value = frequency;
  }

  off() {
    this.gainNode.gain.value = 0;
  }

  kill() {
    this.oscillator.stop(0);
  }

  play({ volume, frequency, duration, type }) {
    this.oscillator.type = type;
    this.oscillator.frequency.value = frequency;
    this.gainNode.gain.value = volume;
    setTimeout(() => (this.gainNode.gain.value = 0), duration);
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
    this.engine = this.engine || new Oscillator();
    this.engine.on({ frequency: 50, type: "triangle", volume: 0.2 });
  }

  engineOff() {
    if (!this.state.engine) return;
    this.state.engine = false;
    this.engine.off();
    this.engine = null;
  }

  playerShot() {
    this.playerShotSound = this.playerShotSound || new Oscillator();
    this.playerShotSound.play({
      frequency: Math.floor(50 * Math.random() + 300),
      type: "sine",
      volume: 0.05,
      duration: 100
    });
  }
}
