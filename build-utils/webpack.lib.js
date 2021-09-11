const path = require("path");
const { DefinePlugin } = require("webpack");

module.exports = {
  mode: "production",
  optimization: {
    minimize: true,
  },
  target: "es2020",
  entry: {
    "lenna-web": path.join(__dirname, "..", "src/index.ts"),
  },
  output: {
    path: path.resolve(__dirname, "..", "dist"),
    filename: "lenna-web.js",
    library: "lennaWeb",
    chunkFilename: "[id].js",
    chunkFormat: "commonjs",
  },
  externals: {
    vue: "vue",
    "vue-router": "vue-router",
    "vue-toastification": "vue-toastification",
    "vue-upload-component": "vue-upload-component",
    "vue-easy-lightbox": "vue-easy-lightbox",
  },
  resolve: {
    fallback: { stream: false },
  },
  plugins: [
    new DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
  ],
  devtool: "source-map",
};
