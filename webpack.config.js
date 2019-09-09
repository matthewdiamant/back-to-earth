const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  bail: false,
  mode: "production",
  output: {
    path: path.resolve(__dirname, "docs")
  },
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: {
          loader: "worker-loader",
          options: { inline: true, fallback: false }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      },
      template: "./index.html",
      inlineSource: ".js$"
    }),
    new HtmlWebpackInlineSourcePlugin()
  ]
};
