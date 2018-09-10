const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const ExtractPlugin = require('extract-text-webpack-plugin');
const VueServerPlugin=require('vue-server-renderer/server-plugin')

let config

config = merge(baseConfig, {
  // webpack的配置项,打包出来的程序是在node端运行的
  target:'node',
  entry: path.join(__dirname, '../client/server-entry.js'),
  // devtool: '#cheap-module-eval-source-map',
  // 可以提供一个代码调试的功能 只能是指引到文件出错在哪一行
  devtool: 'source-map',
  output:{
    //node 文件打包出来的入口  moudle.exports这样的文件形式
    libraryTarget:'commonjs2',
    filename:"server-entry.js",
    path:path.join(__dirname,'../server-build')
  },
  /*不要打包vue 的文件,*/
  externals:object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      {
        test: /\.styl/,
        use: ExtractPlugin.extract({
          fallback: 'vue-style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              }
            },
            'stylus-loader'
          ]
        })
      }
    ]
  },
  plugins: [
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV||'development'),
      'process.env.VUE_ENV':'"server"'
    }),
    // 这个包 不会吐js 代码 只会吐json代码
    new VueServerPlugin() // 生产文件 'vue-ssr-server-bundle.json'
  ]
})

module.exports = config
