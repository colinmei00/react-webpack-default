// webpack.prod.js
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin');
const globAll = require('glob-all');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(baseConfig, {
  mode: 'production', // 生产模式,会开启tree-shaking和压缩代码,以及其他优化
  plugins: [
    // 复制文件插件
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'), // 复制public下文件
          to: path.resolve(__dirname, '../dist'), // 复制到dist目录中
          filter: source => {
            return !source.includes('index.html'); // 忽略index.html
          },
        },
      ],
    }),
    /**
     * 将项目的css抽离成文件然后http请求引入
     * 适合于生产模式：因为不会频繁修改样式，可以利用缓存加速访问；
     * 不适合开发环境：样式改动频繁，用style-loader更佳有热替换功能(修改css不会导致浏览器自动刷新)；
     */
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css', // 抽离css的输出目录和名称
    }),
    /**
     * 清理无用css(类似tree-shaking)，如果打包后样式问题多，可以删除该优化插件，删除后其实影响不大；
     * TODO: (问题)开启css moudle后tsx引入并使用了less中的样式，打包还是会被删除；
     * 在webpack.base.js中给类名加了css__module__前缀，配合白名单使用防止被删除；
     */
    new PurgeCSSPlugin({
      /**
       * 检测src下所有tsx文件和public下index.html中使用的类名和id和标签名称
       * 只打包这些文件中用到的样式
       */
      paths: globAll.sync([
        `${path.join(__dirname, '../src')}/**/*.tsx`,
        path.join(__dirname, '../public/index.html'),
      ]),
      safelist: {
        /**
         * 配置白名单，可以忽略css__module__开头的类名；(防止tsx引入的less被删除)
         * 可用于配置组件库样式白名单，详情看掘金收藏:https://juejin.cn/post/7111922283681153038
         * 打包后样式丢失问题可以看https://www.cnblogs.com/llcdbk/p/16613092.html
         */
        standard: [/^adm-/],
        deep: [/css__module__/],
      },
    }),
    new CompressionPlugin({
      test: /.(js|css)$/, // 只生成css,js压缩文件
      filename: '[path][base].gz', // 文件命名
      algorithm: 'gzip', // 压缩格式,默认是gzip
      threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
      minRatio: 0.8, // 压缩率,默认值是 0.8
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0, // 提取代码体积大于0就提取出来
      cacheGroups: {
        vendors: {
          // 提取node_modules代码
          test: /[\\/]node_modules[\\/]/, // 只匹配node_modules里面的模块
          name: 'vendors', // 提取文件命名为vendors,js后缀和chunkhash会自动加
          minChunks: 1, // 只要使用一次就提取出来
          priority: -10, // 优先级, 先vendors引用包, 再找本地包,  因为default 权重小于vendors
          reuseExistingChunk: true,
        },
        commons: {
          // 提取页面公共代码
          name: 'commons', // 提取文件命名为commons
          minChunks: 2, // 只要使用两次就提取出来
          priority: -20, // 优先级
          reuseExistingChunk: true,
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        // 压缩js
        parallel: true, // 开启多线程压缩
        terserOptions: {
          compress: {
            pure_funcs: ['console.log'], // 删除console.log
          },
        },
      }),
      new CssMinimizerPlugin(), // 压缩css
    ],
  },
});
