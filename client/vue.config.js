module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:7071',
        ws: true,
        changeOrigin: true,
      }
    }
  },
  transpileDependencies: [
    'vuetify',
  ],
};
