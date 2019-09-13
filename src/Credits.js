export default class Credits {
  draw(drawer) {
    let text = t =>
      drawer.text({
        text: t[2],
        x: t[0],
        y: t[1],
        adjusted: false,
        fillColor: t[3] || "#fff"
      });
    drawer.draw(() => {
      drawer.rect({
        rect: [0, 0, 640, 480],
        fillColor: "rgba(0, 0, 0, 0.6)",
        adjusted: false
      });
      drawer.rect({
        rect: [150, 90, 340, 300],
        fillColor: "#fff",
        adjusted: false
      });
      drawer.rect({
        rect: [151, 91, 338, 298],
        fillColor: "#000",
        shadowBlur: 2,
        shadowColor: "#fff",
        adjusted: false
      });
    });
    drawer.draw(() => {
      drawer.text({
        text: "Thanks for playing",
        x: 200,
        y: 150,
        size: "20px",
        font: "serif",
        letterSpacing: true,
        adjusted: false
      });
      text([270, 200, "- Credits -", "#9f9"]);
      text([217, 230, "Matt Diamant: Everything", "#fff"]);
    });
  }
}