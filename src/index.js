/*
  TODO:
    * Finish earth screen
    * Add resources
    * Add HUD
    * Add ship upgrades
    * * beam laser
    * * shapes
    * * more levels (stats)
    * * apply stats
    * Add enemies
    * * Basic enemy
    * * Bigger / badder enemies
    * * Squads of enemies
    * * Enemy aggro distance
    * purple laser should be a line instead of a rect
    * Improve compass
    * Refactor opportunities
    * * Create object with x/y/dx/dy
    * * Create vector library utils
    * * Move to objects over classes
    * Add other worlds / compasses
    * Music? 
*/

import Drawer from "./Drawer.js";
import GameContainer from "./GameContainer.js";
import Keyboard from "./Keyboard.js";
import Sound from "./Sound.js";
import CollisionDetector from "./CollisionDetector.js";

import Background from "./Background.js";
import EarthScreen from "./EarthScreen.js";
import Earth from "./Earth.js";
import Ship from "./Ship.js";
import Asteroids from "./Asteroids.js";

window.onload = () => {
  document.querySelector("main").className += " loaded";

  const gameContainer = new GameContainer();

  const drawer = new Drawer(gameContainer.canvas);
  const keyboard = new Keyboard();
  const sound = new Sound();
  const collisionDetector = new CollisionDetector();

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

  let gameLoop = () => {
    tick();
    collisionDetection();
    draw();
  };

  let tick = () => {
    // ship.landed = true;
    if (ship.landed) {
      earthScreen.tick(keyboard, ship);
    } else {
      ship.tick(keyboard, sound, drawer, asteroids.asteroids);
      asteroids.tick();
    }
  };

  let collisionDetection = () => {
    ship.projectiles.forEach(projectile => {
      asteroids.asteroids.forEach(asteroid => {
        if (collisionDetector.handle(projectile, asteroid, sound)) {
          sound.projectileHit();
        }
      });
    });
  };

  let draw = () => {
    window.requestAnimationFrame(gameLoop);

    currentTime = new Date().getTime();
    delta = currentTime - lastTime;

    if (delta > interval) {
      drawer.clearBackground();
      drawObjects().map(object => object.draw(drawer));
      if (ship.landed) earthScreen.draw(drawer, ship);
      lastTime = currentTime - (delta % interval);
    }
  };

  let drawObjects = () => [background, earth, asteroids, ship];

  const background = new Background(canvas);
  const earthScreen = new EarthScreen();
  const earth = new Earth();
  const ship = new Ship();
  const asteroids = new Asteroids();

  gameLoop();
};
