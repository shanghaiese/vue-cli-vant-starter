const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
const path = require("path");

module.exports = {
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [
        //这个是加上自己的路径，
        //注意：试过不能使用别名路径
        path.resolve(__dirname, "./src/assets/css/_main.less")
      ]
    }
  },
  css: {
    requireModuleExtension: false,
    sourceMap: true,
    loaderOptions: {
      css: {},
      less: {
        // 向全局less样式传入共享的全局变量
        data: `@import "@/assets/css/_main.less";`
      },
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: [
              "Android 4.1",
              "iOS 7.1",
              "Chrome > 31",
              "ff > 31",
              "ie >= 8"
            ]
          }),
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],
            minPixelValue: 1
          }),
        ]
      }
    }
  },
  devServer: {
    /* 自动打开浏览器 */
    open: true,
    // proxy: {
    //   '/api': {
    //     target: '<url>',
    //     ws: true,
    //     changeOrigin: true
    //   }
    // }
  }
}
