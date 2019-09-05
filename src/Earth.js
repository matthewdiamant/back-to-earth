export default class Earth {
  draw(drawer) {
    drawer.draw(() => {
      drawer.arc({
        arc: [0, 0, 50, 0, 2 * Math.PI],
        fillColor: "#fff",
        shadowBlur: 10,
        shadowColor: "#fff"
      });
    });
  }
}
