const path = require('path');
const webpack = require('webpack');
const merge = require( 'webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPlugin = require( 'html-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const glob = require('glob');

const parts = require( './webpack.parts');


const PATHS = {
  app: path.resolve('src/main.js'),
  html: path.resolve('src/index.html'),
  dist: path.resolve('dist'),
};

const commonConfig = merge([
  {
    entry: {
      app: ['babel-polyfill', PATHS.app],
    },
    output: {
      path: PATHS.dist,
      //publicPath: '/dist/',
      filename: '[name].js',
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: PATHS.html
      }),
      /*new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default'],
      })*/

    ],
  },
  parts.clean(PATHS.dist),
  parts.loadVue(),
  parts.loadJS(),
  parts.loadFonts(),
  parts.loadImages(),

]);

const prodConfig = merge([
  {
    entry: {
      vendor: ['vue','bootstrap-vue','vue-router','vuex','axios'],
      async: ['vue-chartjs','socket.io-client','vue-socket.io']
    },
    performance: {
      hints: false, // 'error' or false are valid too
      maxEntrypointSize: 100000, // in bytes
      maxAssetSize: 450000, // in bytes
    },
    output: {
      chunkFilename: '[name].[chunkhash].js',
      filename: '[name].[chunkhash].js',
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: [
                  {loader:'css-loader'},
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
            fallback: 'style-loader',
          }),
        },
        {
          test: /\.(scss)$/,
          use: ExtractTextPlugin.extract({
            use: [  { loader: 'css-loader'}, 'sass-loader' ],
            fallback: 'style-loader',
          }),
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production'),
          'DEBUG': false,
        }
      }),

      new webpack.optimize.UglifyJsPlugin({
        compress: {
          screw_ie8: true,
          warnings: false
        }
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new ExtractTextPlugin({
        filename: '[name].[chunkhash].css',
        disable: false,
        allChunks: true
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        //minChunks: Infinity,
        //children: true,
        /*minChunks: ({ resource }) => (
          resource !== undefined &&
          resource.indexOf('node_modules') !== -1
        ),*/
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'async',
        //minChunks: Infinity,
        async: true,
        //children: true,
        /*minChunks: ({ resource }) => (
          resource !== undefined &&
          resource.indexOf('node_modules') !== -1
        ),*/
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        minChunks: Infinity
      }),
      new webpack.NoEmitOnErrorsPlugin(),

      new webpack.optimize.MinChunkSizePlugin({
        minChunkSize: 10000 // Minimum number of characters
      }),
      //new PurifyCSSPlugin({
        //styleExtensions: ['.css','.scss'],
        //moduleExtensions: ['.js', '.vue'],
        //minimize: true,
        //purifyOptions:{whitelist: ['*cc*','*globals-bar*', '*navbar*','*nav*', '*collapse*']}, // keep cryptocoins font
        //paths: glob.sync(path.join(__dirname, 'src/**/*.vue')),

      //})
    ]
  },
]);

const devConfig = merge([
  {
    devServer: {
      historyApiFallback: true,
      noInfo: true,
      overlay: true
    },
  },
  parts.loadCSS(),
  parts.loadSASS(),
  parts.generateSourceMaps({ type: 'cheap-module-eval-source-map'}),
]);


module.exports = () => {
  const config = (process.env.NODE_ENV === 'production') ? prodConfig : devConfig;
  return merge([commonConfig,config]);
};
