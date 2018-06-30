
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

const webpackConfigBase = {
  entry: {
    client: resolve('../src/client.js'),
  },
  output: {
    path: resolve('../dist'),
    filename: '[name].[hash:4].js',
    chunkFilename: 'chunks/[name].[hash:4].js',
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@src': path.join(__dirname, '../src'),
      '@actions': path.join(__dirname, '../src/redux/actions'),
      '@reducers': path.join(__dirname, '../src/redux/reducers'),
      '@apis': path.join(__dirname, '../src/apis'),
      '@components': path.join(__dirname, '../src/components'),
      '@configs': path.join(__dirname, '../src/configs'),
      '@config': path.join(__dirname, '../src/configs/config.js'),
      '@ajax': path.join(__dirname, '../src/configs/ajax.js'),
      '@reg': path.join(__dirname, '../src/configs/regular.config.js'),
      '@images': path.join(__dirname, '../src/images'),
      '@middleware': path.join(__dirname, '../src/middleware'),
      '@pages': path.join(__dirname, '../src/pages'),
      '@styles': path.join(__dirname, '../src/styles'),
      '@tableList': path.join(__dirname, '../src/components/tableList/tableList.js'),
    },
  },
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { "presets": ["react", "es2017"] }
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style',
          use: [
            { loader: 'css', options: { sourceMap: true } },
            { loader: 'less', options: { sourceMap: true } }
          ]
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        options: {
          limit: 8192,
          name: 'img/[name].[hash:4].[ext]'
        }
      },
      {
        test: /\.(woff|eot|ttf|svg|gif)$/,
        loader: 'url',
        options: {
          limit: 8192,
          name: 'font/[name].[hash:4].[ext]'
        }
      },
    ],
  },
  plugins: [
    // 提取css
    new ExtractTextPlugin('style.[hash:4].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common', // 入口文件名
      filename: 'common.[hash:4].js', // 打包后的文件名
      minChunks: function (module, count) {
        return module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(resolve('../node_modules')) === 0
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: 'async-common',
      minChunks: 3,
    }),
  ]
}

module.exports = webpackConfigBase

