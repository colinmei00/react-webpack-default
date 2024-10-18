module.exports = {
  plugins: [
    "autoprefixer",
    require("postcss-px-to-viewport-8-plugin")({
      viewportWidth: 375, // 设计稿的宽度
      viewportHeight: 667, // 设计稿的高度（可选）
      unitPrecision: 3, // 转换后保留的小数位数
      replace: true,
      selectorBlackList: [".ignore", ".hairlines"], // 忽略的选择器
      minPixelValue: 1, // 小于或等于1px不转换
      exclude: /(\/|\\)(node_modules)(\/|\\)/, // 禁止更改第三方UI框架样式
    }),
  ],
};
