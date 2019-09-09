/*
  MVP:
    * Add enemies
    * * Bigger / badder enemies
    * * Squads of enemies
    * * Enemy aggro distance
    * Add ship upgrades
    * * beam laser
    * * shapes
    * * more levels (stats)
    * Improve compass
    
  FUTURE:
    * Add other worlds / compasses
    * Music
    * Refactor opportunities
    * * Create object with x/y/dx/dy
    * * Create vector library utils
    * * SVG graphics over "line"
    * * Move to objects over classes
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
import Enemies from "./Enemies.js";
import GameOverScreen from "./GameOverScreen.js";
import HUD from "./HUD.js";
import Ship from "./Ship.js";
import Asteroids from "./Asteroids.js";

window.onload = () => {
  const gameContainer = new GameContainer();

  const drawer = new Drawer(gameContainer.canvas);
  const keyboard = new Keyboard();
  const sound = new Sound();
  const collisionDetector = new CollisionDetector();

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
    // ship.landed = true;
    if (ship.landed) {
      earthScreen.tick(keyboard, ship, asteroids, enemies);
    } else {
      hud.tick(ship);
      compasses.tick(ship);
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
    ship,
    compasses,
    hud
  ];

  const background = new Background({
    cw: gameContainer.canvas.width,
    ch: gameContainer.canvas.height
  });
  const compasses = new Compasses();
  const hud = new HUD();
  const earthScreen = new EarthScreen();
  const earth = new Earth();
  const enemies = new Enemies();
  const gameOverScreen = new GameOverScreen();
  const music = new Music();
  const ship = new Ship();
  const asteroids = new Asteroids();

  document.querySelector("main").className += " loaded";
  gameLoop();
};
