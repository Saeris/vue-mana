const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
  lintOnSave: false,
  baseUrl: undefined,
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,

  css: {
    extract: false
  },

  pwa: {
    name: `Vue Mana`,
    themeColor: `#506250`
  },

  configureWebpack: config => {
    if (!config.output.libraryTarget) {
      return {
        plugins: [new FaviconsWebpackPlugin('./public/favicon.svg')]
      }
    }
  }
}
