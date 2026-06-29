const CACHE_NAME = 'manjuweb-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/aurafit.png',
  '/dashboard.png',
  '/ecommerce.png',
  '/analytics.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
