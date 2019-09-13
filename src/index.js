/*
  TODO:
    * Improve enemy spawning logic
    * Balancing
    * Add other worlds / compasses
    * Music
  
  Refactor opportunities:
  * Create object with x/y/dx/dy
  * Create vector library utils
  * Move to objects over classes
*/

import Drawer from "./Drawer.js";
import GameContainer from "./GameContainer.js";
import Keyboard from "./Keyboard.js";
import Sound from "./Sound.js";
import Music from "./Music.js";
import CollisionDetector from "./CollisionDetector.js";

import Background from "./Background.js";
import Compasses from "./Compasses.js";
import EarthScreen from "./EarthScreen.js";
import Earth from "./Earth.js";
import Encounters from "./Encounters.js";
import Enemies from "./Enemies.js";
import GameOverScreen from "./GameOverScreen.js";
import HUD from "./HUD.js";
import Ship from "./Ship.js";
import Asteroids from "./Asteroids.js";

window.onload = () => {
  let gameContainer = new GameContainer();

  let drawer = new Drawer(gameContainer.canvas);
  let keyboard = new Keyboard();
  let sound = new Sound();
  let collisionDetector = new CollisionDetector();

  gameContainer.initialize();

  let fps = 60,
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
    if (ship.landed) {
      earthScreen.tick(keyboard, ship, asteroids, enemies, encounters, compasses);
    } else {
      hud.tick(ship);
      compasses.tick(ship);
      encounters.tick(ship, enemies);
      enemies.tick(sound, ship);
      ship.tick(
        keyboard,
        sound,
        drawer,
        asteroids.asteroids.concat(enemies.enemies)
      );
      asteroids.tick();
    }
  };

  let collisionDetection = () => {
    ship.projectiles.forEach(projectile => {
      asteroids.asteroids.forEach(asteroid => {
        if (collisionDetector.handle(projectile, asteroid)) {
          sound.projectileHit();
        }
      });
      enemies.enemies.forEach(enemy => {
        if (collisionDetector.handle(projectile, enemy)) {
          sound.projectileHit();
        }
      });
    });
    enemies.enemies.forEach(enemy => {
      enemy.projectiles.forEach(projectile => {
        if (collisionDetector.handle(projectile, ship)) {
          sound.projectileHit();
        }
        asteroids.asteroids.forEach(asteroid => {
          if (collisionDetector.handle(projectile, asteroid)) {
            sound.projectileHit();
          }
        });
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
      if (ship.death) gameOverScreen.draw(drawer);
      lastTime = currentTime - (delta % interval);
    }
  };

  let drawObjects = () => [
    background,
    earth,
    asteroids,
    enemies,
    compasses,
    ship,
    hud
  ];

  let background = new Background({
    cw: gameContainer.canvas.width,
    ch: gameContainer.canvas.height
  });
  let compasses = new Compasses();
  let encounters = new Encounters();
  let hud = new HUD();
  let earthScreen = new EarthScreen();
  let earth = new Earth();
  let enemies = new Enemies();
  let gameOverScreen = new GameOverScreen();
  let music = new Music();
  let ship = new Ship();
  let asteroids = new Asteroids();

  document.querySelector("main").className += " loaded";
  gameLoop();
};
