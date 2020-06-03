const path = require('path');

module.exports = {
  mode: 'production',
  entry: './lib/templates/index.js',
  target: 'web',
  output: {
    path: path.resolve('dist'),
    filename: 'index.js',
    libraryTarget: 'var',
    library: 'SvgGenerator'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
};
