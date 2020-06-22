module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/styles/main.scss";
        `
      }
    }
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        minSize: 10000,
        maxSize: 200000
      }
    }
  }
}