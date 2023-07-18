const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
  // ... การตั้งค่าอื่น ๆ ของ webpack ...

  plugins: [
    // ... ไพลัสอื่น ๆ ของ webpack plugins ...

    new GenerateSW({
      // ตั้งค่าการสร้างแคช
      swDest: 'service-worker.js',
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
};
