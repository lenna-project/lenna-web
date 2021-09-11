const path = require("path");
const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container;
const CopyPlugin = require("copy-webpack-plugin");

const deps = require("../package.json").dependencies;

module.exports = {
  mode: "production",
  optimization: {
    minimize: true,
  },
  target: "web",
  entry: {
    "lenna-web": path.join(__dirname, "..", "src/main.ts"),
    index: path.join(__dirname, "..", "src/index.ts"),
  },
  output: {
    publicPath: "auto",
  },
  plugins: [
    new DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new ModuleFederationPlugin({
      name: "lenna-web",
      library: { type: "amd", name: "lenna-web" },
      shared: {
        vue: {
          requiredVersion: deps.vue,
          shareKey: "vue",
          shareScope: "default",
          //singleton: true,
          //eager: true
        },
        "vue-router": deps["vue-router"],
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "..", "./index.html"),
    }),
    new HtmlWebpackPlugin({
      title: "lenna-web-about",
      template: path.resolve(__dirname, "..", "./index.html"),
      filename: "./about/index.html",
    }),
    new CopyPlugin({
      patterns: ["public"],
    }),
  ],
  devtool: "source-map",
  devServer: {
    proxy: {
      "*": path.join(__dirname),
    },
    compress: true,
    port: 3001,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
};
