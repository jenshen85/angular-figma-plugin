// const path = require('path');
// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");

module.exports = {
  // output: {
  //   path: path.resolve(__dirname, './dist/plugin-ui')
  // },
  resolve: {
    extensions: ['.json'],
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: './src/index.html',
    //   filename: 'ui.html',
    //   inlineSource: '.(js|css)$',
    //   inject: 'body'
    // }),
    // new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin)
  ]
};
