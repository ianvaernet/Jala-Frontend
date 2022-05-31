const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: { app: './src/index.js' },
  output: {
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|webp)$/i,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
  ],
  resolve: {
    alias: {
      '@styles': path.resolve(__dirname, '../src/styles'),
    },
  },
};
