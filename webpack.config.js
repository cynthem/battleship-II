const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Battleship',
      template: path.join(__dirname, './src/custom.html')
    }),
    new MiniCssExtractPlugin(),
    new CssMinimizerPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  module: {
    rules: [
      /*{
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },*/
      {
        test: /.s?css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
      /*{
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      }*/
    ]
  },
  optimization: {
    minimizer: [
        `...`,
        new CssMinimizerPlugin()
    ]
  },
  resolve: {
    alias: {
      jquery: 'jquery/src/jquery'
    }
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};