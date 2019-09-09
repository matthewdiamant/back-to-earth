const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
const ClosureCompilerPlugin = require("webpack-closure-compiler");
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
    // new ClosureCompilerPlugin({
    //   compiler: {
    //     language_in: "ECMASCRIPT6",
    //     language_out: "ECMASCRIPT5",
    //     compilation_level: "ADVANCED"
    //   },
    //   concurrency: 3,
    //   jsCompiler: true
    // })
  ]
};
