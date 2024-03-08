module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true, // 是否跨域
        ws: true, // 代理websockets
        secure: false, // 是否是https
        pathRewrite: {
          '^/api': '/react-schedule',
        },
      },
    },
  },
}
