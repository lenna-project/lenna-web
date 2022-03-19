const path = require("path");
const { DefinePlugin, ProvidePlugin } = require("webpack");

module.exports = {
  mode: "production",
  optimization: {
    minimize: false,
  },
  target: "es2020",
  entry: {
    "lenna-web": path.join(__dirname, "..", "src/index.ts"),
  },
  output: {
    path: path.resolve(__dirname, "..", "dist"),
    filename: "lenna-web.js",
    library: "lennaWeb",
    chunkFormat: "module",
    libraryTarget: "umd"
  },
  externals: {
    vue: "vue",
    "vue-router": "vue-router"
  },
  resolve: {
    fallback: { stream: false },
  },
  module: {
    rules: [
    ],
  },
  plugins: [
    new ProvidePlugin({
      vue: "vue",
      "vue-router": "vue-router"
    })
  ],
  devtool: "source-map",
};
