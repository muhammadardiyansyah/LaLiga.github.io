/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
if (workbox) {
  console.log('Your Workbox is loaded!');

  workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/team.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/service-worker.js', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/style.css', revision: '1' },
    { url: '/images/laliga.png', revision: '1' },
    { url: '/images/laliga1.png', revision: '1' },
    { url: '/images/me.png', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/button.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/sw-register.js', revision: '1' },
    { url: '/pages/about.html', revision: '1' },
    { url: '/pages/home.html', revision: '1' },
    { url: '/pages/saved.html', revision: '1' },
  ],

  {
    ignoreUrlParametersMatching: [/.*/],
  });

  workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate(),
  );

  workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
      cacheName: 'images',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 200,
          maxAgeSeconds: 14 * 24 * 60 * 60,
        }),
      ],
    }),
  );

  workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'google-fonts-stylesheets',
    }),
  );

  workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 14 * 24 * 60 * 60,
          maxEntries: 30,
        }),
      ],
    }),
  );
} else {
  console.log('Your Workbox did not load');
}

self.addEventListener('push', (event) => {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  const options = {
    body,
    icon: 'images/laliga1.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options),
  );
});
