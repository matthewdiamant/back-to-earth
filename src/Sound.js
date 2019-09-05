import jsfxr from "jsfxr";

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
    const soundUrl = jsfxr(
      eval(
        "[2,,0.1749,,0.3063,0.713,0.2,-0.2645,,,,,,0.0543,0.1546,,,,1,,,,,0.5]"
      )
    );

    var player = new Audio();
    player.src = soundUrl;
    player.play();
  }
}
