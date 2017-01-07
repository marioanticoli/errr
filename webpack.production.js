const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const CLIENT_DIR = path.resolve(__dirname, 'client');
const SERVER_DIR = path.resolve(__dirname, 'server/generated');
const DIST_DIR = path.resolve(__dirname, 'dist');

const loaders = [{
  test: /\.js$/,
  include: CLIENT_DIR,
  loader: 'babel-loader',
  query: {
    presets: ['react', 'es2015'],
  },
},
{
  test: /\.less$/,
  loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader'),
},
{
  test: /\.css$/,
  loader: ExtractTextPlugin.extract('style-loader', 'css-loader'),
},
];

const aliases = {
  components: path.resolve(CLIENT_DIR, 'components'),
  reducers: path.resolve(CLIENT_DIR, 'reducers'),
  actions: path.resolve(CLIENT_DIR, 'actions'),
};

module.exports = [{
  name: 'client',
  target: 'web',
  context: CLIENT_DIR,
  entry: './index.js',
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
  },
  module: {
    loaders,
  },
  resolve: {
    alias: aliases,
  },
  plugins: [
    new ExtractTextPlugin('bundle.css', { allChunks: false }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
},
{
  name: 'server',
  target: 'node',
  context: CLIENT_DIR,
  entry: {
    app: 'components/app.js',
  },
  output: {
    path: SERVER_DIR,
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  externals: /^[a-z\-0-9]+$/,
  module: {
    loaders,
  },
  resolve: {
    alias: aliases,
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],
}];
