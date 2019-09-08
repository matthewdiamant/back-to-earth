let nearStars = [];
let farStars = [];

function mod(n, m) {
  return ((n % m) + m) % m;
}

export default class Background {
  constructor({ cw, ch }) {
    for (let i = 0; i < 100; i++)
      nearStars.push([Math.random() * cw, Math.random() * ch, Math.random()]);
    for (let i = 0; i < 100; i++)
      farStars.push([Math.random() * cw, Math.random() * ch, Math.random()]);
  }
  draw(drawer) {
    drawer.draw(() => {
      drawer.drawBackground("#111");
      nearStars.map(star =>
        drawer.rect({
          rect: [
            mod(
              star[0] - drawer.camera.x / (3 + 3 * star[2]),
              drawer.canvas.width
            ),
            mod(
              star[1] - drawer.camera.y / (3 + 3 * star[2]),
              drawer.canvas.height
            ),
            1,
            1
          ],
          fillColor: "#fff",
          adjusted: false
        })
      );
      farStars.map(star =>
        drawer.rect({
          rect: [
            mod(
              star[0] - drawer.camera.x / (7 + 3 * star[2]),
              drawer.canvas.width
            ),
            mod(
              star[1] - drawer.camera.y / (7 + 3 * star[2]),
              drawer.canvas.height
            ),
            1,
            1
          ],
          fillColor: "rgba(255, 255, 255, 0.3)",
          adjusted: false
        })
      );
      drawer.text({
        text: "back to earth",
        x: -145,
        y: -95,
        size: "36px",
        font: "serif",
        letterSpacing: true
      });
      drawer.text({
        text: "Arrow keys to move. SPACE to shoot.",
        x: -145,
        y: 105
      });
      drawer.text({
        text: "ENTER to land back on earth.",
        x: -115,
        y: 130
      });
      drawer.text({
        text: "Shoot things. Collect ore. Upgrade weapons.",
        x: -178,
        y: 155
      });
    });
  }
}
