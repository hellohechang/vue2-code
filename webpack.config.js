const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  // 入口文件
  entry: './src/index.js',
  // 出口
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // 错误定位
  devtool: 'source-map',
  // 配置模块
  resolve: {
    modules: [path.resolve(__dirname, ''), path.resolve(__dirname, 'node_modules')]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html')
    })
  ],
  mode: 'development'
}