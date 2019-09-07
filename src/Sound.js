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

  playSound(url) {
    const soundUrl = jsfxr(eval(url));

    let player = new Audio();
    player.src = soundUrl;
    player.play();
  }

  mainLaser() {
    this.playSound(
      "[2,,0.1749,,0.3063,0.713,0.2,-0.2645,,,,,,0.0543,0.1546,,,,1,,,,,0.5]"
    );
  }

  secondaryLaser() {
    this.playSound(
      "[2,,0.1426,,0.2251,0.7799,0.2555,-0.2285,,,,,,0.7631,-0.4501,,,,1,,,0.0846,,0.5]"
    );
  }

  missile() {
    this.playSound("[3,,0.0937,0.571,0.3803,0.7495,,,,,,,,,,,,,1,,,,,0.5]");
  }

  projectileHit() {
    this.playSound("[3,,0.0867,,0.2283,0.2711,,-0.6853,,,,,,,,,,,1,,,,,0.5]");
  }

  enemyLaser() {
    this.playSound(
      "[0,,0.2934,0.1381,0.2143,0.6919,0.3422,-0.2379,,,,,,0.4281,-0.6711,,,,1,,,0.194,,0.5]"
    );
  }
}
