module.exports = {
    globDirectory: 'build/', // ตำแหน่งไดเรกทอรีที่มีไฟล์ของแอพพลิเคชันหลังคอมไพล์
    globPatterns: [
      '**/*.{html,js,css,png}' // รูปแบบของไฟล์ที่ต้องการรวมเข้าไปในแคช
    ],
    swDest: 'build/sw.js', // ตำแหน่งของไฟล์ Service Worker ที่สร้างขึ้น
    clientsClaim: true,
    skipWaiting: true,
    runtimeCaching: [
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images',
          expiration: {
            maxEntries: 50
          }
        }
      },
      // เพิ่มการกำหนดค่าแคชตามความต้องการเพิ่มเติม
    ]
  };
  