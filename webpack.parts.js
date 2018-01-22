const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

exports.clean = (path) => ({
  plugins: [
    new CleanWebpackPlugin([path]),
  ],
});

exports.loadCSS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,

        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => ([
                require('autoprefixer'),
                //require('precss'),
              ]),
            },
          },
        ],
      },
    ],
  },
});

exports.loadSASS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.scss$/,
        include,
        exclude,

        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
    ],
  },
});

exports.loadVue = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.vue$/,
        include,
        exclude,

        use: {loader: 'vue-loader'}
      },
    ],
  },
});

exports.loadFonts = ({ include, exclude,options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff',
        options,
        /*options: {
          name: '[name].[hash:8].[ext]'}*/
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream',
        options,
        /*options: {
          name: '[name].[hash:8].[ext]'}*/
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options,
        /*options: {
          name: '[name].[hash:8].[ext]'}*/
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml',
        options,
        /*options: {
          name: '[name].[hash:8].[ext]'}*/
      },
    ],
  },
});
exports.loadJS = ({ include, exclude } = {}) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
    ],
  },
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
    ],
  },
});

exports.generateSourceMaps = ({ type }) => ({
  devtool: type,
});

