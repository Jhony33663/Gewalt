module.exports = {
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: '127.0.0.1', port: '8001' },
    ],
    loader: 'custom',
    loaderFile: './image-loader.js',
  },
};
