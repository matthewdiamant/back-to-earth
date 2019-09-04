import Drawer from "./Drawer.js";
import GameContainer from "./GameContainer.js";
import Keyboard from "./Keyboard.js";
import Sound from "./Sound.js";

import Background from "./Background.js";
import Earth from "./Earth.js";
import Ship from "./Ship.js";
import Asteroids from "./Asteroids.js";

const gameContainer = new GameContainer();

const drawer = new Drawer(gameContainer.canvas);
const keyboard = new Keyboard();
const sound = new Sound();

gameContainer.initialize();

let canvas = {
    cw: gameContainer.canvas.width,
    ch: gameContainer.canvas.height
  },
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
    drawObjects().map(object => object.draw(drawer));
    lastTime = currentTime - (delta % interval);
  }
};

let gameLoop = () => {
  tick();
  draw();
};

let tick = () => {
  ship.tick(keyboard, sound, drawer);
  asteroids.tick();
};

let drawObjects = () => [background, earth, asteroids, ship];

const background = new Background(canvas);
const earth = new Earth();
const ship = new Ship();
const asteroids = new Asteroids();

gameLoop();
