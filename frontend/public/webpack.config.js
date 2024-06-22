const { InjectManifest } = require("workbox-webpack-plugin");
const path = require("path");

module.exports = {
  // other webpack config options
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  plugins: [
    new InjectManifest({
      swSrc: "./src/service-worker.js",
      swDest: "service-worker.js",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
