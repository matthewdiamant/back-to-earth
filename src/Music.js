// https://sb.bitsnbites.eu/?data=U0JveAwC7dcxCsJQEITheRsFixRildJ7iOQQOUGatGnENg8bGxGbEKucJeDBdHlEEDsLu_-DYWHK7aaxoExrsynKpstGGstRiS2lrVSsgmu9OOqg9_1V_pWHp_y4rQAAAAAAyT76UIo-nXZ1N--zp--zKjstFKTz7ZrKob_3A98CAAAAgL95AQ

import Worker from "./sound-box.worker.js";

function startMusic() {
  var myWorker = new Worker();

  myWorker.onmessage = function(e) {
    let wave = e.data;
    let audio = document.createElement("audio");
    audio.src = URL.createObjectURL(new Blob([wave], { type: "audio/wav" }));
    audio.volume = 0.5;
    audio.loop = true;
    let playPromise = audio.play();
    (function tryAgain(playPromise) {
      playPromise
        .then(_ => {})
        .catch(error => {
          setTimeout(() => {
            let playPromise = audio.play();
            tryAgain(playPromise);
          }, 1000);
        });
    })(playPromise);
  };
}

export default class Music {
  constructor() {
    startMusic();
  }
}
