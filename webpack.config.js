const path = require("path");

module.exports = {
  entry: "./src/index.js",
  bail: false,
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  }
};
