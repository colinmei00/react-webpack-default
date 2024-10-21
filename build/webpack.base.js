// webpack.base.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProd = process.env.NODE_ENV === "production"; // 是否为生产模式

console.log("NODE_ENV===>", process.env.NODE_ENV);
console.log("BASE_ENV===>", process.env.BASE_ENV);

module.exports = {
  entry: path.join(__dirname, "../src/index.tsx"), // 入口文件
  output: {
    filename: "static/js/[name].[chunkhash:8].js",
    path: path.join(__dirname, "../dist"), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: "/", // 打包后文件的公共前缀路径
  },
  module: {
    rules: [
      {
        /**
         * 只对项目src文件的ts,tsx进行loader解析
         */
        include: [path.resolve(__dirname, "../src")],
        test: /.(ts|tsx)$/,
        /**
         * thread-loader：建议大型项目使用，因为开启该功能需要耗费600ms；
         * babel-loader：可在babel.config.js自定义配置规则；
         */
        use: ["thread-loader", "babel-loader"],
      },
      {
        test: /\.css$/,
        /**
         * 只会解析src文件夹内的css，如果需要引入外部的import "driver.js/dist/driver.css"，需要配置在include里如：
         * [path.resolve(__dirname, '../src')，path.resolve('../node_modules/driver.js/dist/driver.css')]
         */
        include: [path.resolve(__dirname, "../src")],
        use: [
          isProd ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: isProd
                  ? "custom__[hash:base64]"
                  : "[path][name]__[local]",
              },
              importLoaders: 1,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.less$/,
        include: [path.resolve(__dirname, "../src")],
        use: [
          isProd ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader", // 主要是解析css文件中的@import和url语句，处理css-modules，并将结果作为一个js模块返回
            options: {
              //  modules默认值undefined: 为所有匹配 /\.module\.\w+$/i.test(filename) 与 /\.icss\.\w+$/i.test(filename) 正则表达式的文件启用 CSS 模块
              //  详情参考 https://webpack.docschina.org/loaders/css-loader/
              modules: {
                auto: true,
                /**
                 * 开发环境需要看类名快速定位文件与位置
                 * 生产环境不希望暴露源码，所以使用hash值，
                 * 加custom__前缀防止被purgecssplugin删除，如果不用其插件可以不加前缀
                 */
                localIdentName: isProd
                  ? "custom__[hash:base64]"
                  : "[path][name]__[local]",
              }, // undefined / true / false / string / object
              importLoaders: 2, // 执行顺序: 需要先被 less-loader postcss-loader (所以这里设置为 2)
            },
          },
          "postcss-loader",
          {
            loader: "less-loader",
            options: {
              sourceMap: !isProd,
              /**
               * 给所有less文件注入var和func，复用变量和函数
               */
              additionalData:
                `@import "${path.resolve(
                  __dirname,
                  "../src/assets/style/var.less"
                )}";\n` +
                `@import "${path.resolve(
                  __dirname,
                  "../src/assets/style/func.less"
                )}";\n`,
            },
          },
        ],
      },
      {
        test: /.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/images/[name].[contenthash:8][ext]", // 文件输出目录和命名
        },
      },
      {
        test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/fonts/[name].[contenthash:8][ext]", // 文件输出目录和命名
        },
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/media/[name].[contenthash:8][ext]", // 文件输出目录和命名
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".tsx", ".ts"],
    alias: {
      "@": path.join(__dirname, "../src"),
    },
    modules: [path.resolve(__dirname, "../node_modules")], // 缩小模块搜索范围，查找第三方模块只在本项目的node_modules中查找
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"), // 模板取定义root节点的模板
      inject: true, // 自动注入静态资源
    }),
    new webpack.DefinePlugin({
      "process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV),
    }),
  ],
  cache: {
    type: "filesystem", // 使用文件缓存
  },
  externals: {
    react: "React", // 将 React 视为外部依赖
    "react-dom": "ReactDOM", // 将 ReactDOM 视为外部依赖
  },
};
