module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      { test: /\.css$$/i, use: ['style-loader', 'css-loader'] },
      {
        test: /\.s[ac]ss$$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
};
