/* eslint-disable no-restricted-globals */

import { clientsClaim } from "workbox-core";
import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute, createHandlerBoundToURL } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst, StaleWhileRevalidate } from "workbox-strategies";
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

clientsClaim();

self.skipWaiting();

precacheAndRoute(self.__WB_MANIFEST);

const fileExtensionRegexp = new RegExp("/[^/?]+\\.[^/]+$");
registerRoute(({ request, url }) => {
  if (request.mode !== "navigate") {
    return false;
  }
  if (url.pathname.startsWith("/_")) {
    return false;
  }
  if (url.pathname.match(fileExtensionRegexp)) {
    return false;
  }
  return true;
}, createHandlerBoundToURL(process.env.PUBLIC_URL + "/index.html"));

registerRoute(
  ({ url }) =>
    url.origin === self.location.origin &&
    (url.pathname.endsWith(".js") ||
      url.pathname.endsWith(".css") ||
      url.pathname.endsWith(".tsx") ||
      url.pathname.endsWith(".png") ||
      url.pathname.endsWith(".jpg") ||
      url.pathname.endsWith(".gif") ||
      url.pathname.endsWith(".html")),
  new StaleWhileRevalidate({
    cacheName: "cache",
    plugins: [new ExpirationPlugin({ maxEntries: 50 })],
  })
);

registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new StaleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
  })
);

registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new StaleWhileRevalidate({
      cacheName: 'google-fonts-webfonts',
      plugins: [
          new CacheableResponsePlugin({
              statuses: [0, 200],
          }),
          new ExpirationPlugin({
              maxAgeSeconds: 60 * 60 * 24 * 365,
              maxEntries: 30,
          }),
      ],
  }),
);

registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
      cacheName: 'images_cache',
      plugins: [
          new CacheableResponsePlugin({
              statuses: [0, 200],
          }),
          new ExpirationPlugin({
              maxEntries: 60,
              maxAgeSeconds: 30 * 24 * 60 * 60,
          }),
      ],
  })
);

// registerRoute(
//   ({ request }) => request.destination === 'script' ||
//       request.destination === 'style',
//   new StaleWhileRevalidate({
//       cacheName: 'static-resource',
//   })
// );

self.addEventListener('install', (event) => {
  console.log('Service Worker installed.');
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activated.');
});

self.addEventListener('message', (event) => {
  // ตรวจสอบเงื่อนไขที่คุณต้องการตรวจสอบใน Service Worker และส่งข้อมูลกลับไปยังหน้าเว็บ
  if ('service-worker-condition-passed') {
    event.source.postMessage('Congrats! Service Worker condition passed.', '*');
  } else {
    event.source.postMessage('Service Worker condition failed.', '*');
  }
});


// self.addEventListener("message", (event) => {
//   if (event.data && event.data.type === "SKIP_WAITING") {
//     self.skipWaiting();
//   }
// });

// self.addEventListener("install", (event) => {
//   // The promise that skipWaiting() returns can be safely ignored.
//   self.skipWaiting();

//   // Perform any other actions required for your
//   // service worker to install, potentially inside
//   // of event.waitUntil();
// });

// self.addEventListener("activate", (event) => {
//   // eslint-disable-next-line no-undef
//   clients.claim();
// });

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.open("my-cache").then((cache) => {
//       return cache.match(event.request).then((response) => {
//         const fetchPromise = fetch(event.request).then((networkResponse) => {
//           cache.put(event.request, networkResponse.clone());
//           return networkResponse;
//         });
//         return response || fetchPromise;
//       });
//     })
//   );
// });

