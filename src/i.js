import GameContainer from "./GameContainer.js";
import Keyboard from "./Keyboard.js";

import Background from "./Background.js";
import Ship from "./Ship.js";

const gameContainer = new GameContainer();
const keyboard = new Keyboard();

gameContainer.initialize();

let canvas = {
    cw: gameContainer.canvas.width,
    ch: gameContainer.canvas.height
  },
  cx = null,
  fps = 60,
  interval = 1000 / fps,
  lastTime = new Date().getTime(),
  currentTime = 0,
  delta = 0;

let draw = () => {
  window.requestAnimationFrame(gameLoop);

  currentTime = new Date().getTime();
  delta = currentTime - lastTime;

  if (delta > interval) {
    cx.clearRect(0, 0, canvas.cw, canvas.ch);
    drawObjects(cx);
    lastTime = currentTime - (delta % interval);
  }
};

let gameLoop = () => {
  tick();
  draw();
};

let tick = () => {
  ship.tick(keyboard);
};

let drawObjects = cx => {
  background.draw(cx, canvas);
  ship.draw(cx);
};

cx = gameContainer.canvas.getContext("2d");

const background = new Background(canvas);
const ship = new Ship();

gameLoop();
