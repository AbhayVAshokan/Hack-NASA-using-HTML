const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const mode = process.env.NODE_ENV || "development";
const plugins = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin(),
  new HtmlWebpackPlugin({ template: "./src/index.html" }),
];

if (mode === "production") {
  plugins.push(new CssMinimizerPlugin());
}

module.exports = {
  mode: mode,
  entry: "./src/index.js",

  module: {
    rules: [
      {
        test: /\.css/i,
        exclude: /node_modules/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: "babel-loader" },
      },
    ],
  },

  plugins: plugins,

  devtool: "source-map",
  devServer: {
    static: "./dist",
    hot: true,
  },
};
