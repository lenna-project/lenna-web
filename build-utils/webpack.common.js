const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  cache: false,
  devtool: "inline-source-map",
  optimization: {
    minimize: false,
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      "@": path.join(__dirname, "..", "src/"),
      // this isn't technically needed, since the default `vue` entry for bundlers
      // is a simple `export * from '@vue/runtime-dom`. However having this
      // extra re-export somehow causes webpack to always invalidate the module
      // on the first HMR update and causes the page to reload.
      vue: "@vue/runtime-dom",
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          loaders: {
            scss: [
              "vue-style-loader",
              "css-loader",
              {
                loader: "sass-loader",
                options: {
                  includePaths: [path.resolve(__dirname, "src/styles")],
                },
              },
            ],
          },
        },
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: [
          process.env.NODE_ENV !== "production"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  experiments: {
    asyncWebAssembly: true
  }
};
