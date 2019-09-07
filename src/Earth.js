export default class Earth {
  draw(drawer) {
    drawer.draw(() => {
      drawer.text({
        text: "🌎",
        x: -65,
        y: 35,
        size: "100px",
        color: "blue",
        filter: "contrast(75%) brightness(60%) saturate(40%) hue-rotate(-10deg)"
      });
    });
  }
}
