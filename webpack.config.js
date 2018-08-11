const path = require('path')

module.exports = {
  mode: process.env.NODE_ENV,
  target: 'node',
  entry: path.resolve(__dirname, 'src/index'),
  externals: {
    Express: 'express',
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loaders: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
}
