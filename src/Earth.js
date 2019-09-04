export default class Earth {
  draw(drawer) {
    drawer.draw(() => {
      drawer.fillArc({
        arc: [0, 0, 50, 0, 2 * Math.PI],
        color: "#fff",
        shadowBlur: 10,
        shadowColor: "#fff"
      });
    });
  }
}
