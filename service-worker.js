const CACHE_NAME = 'ais-portfolio-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/css/styles.css',
  '/js/script.js',
  '/images/avatar.png',
  '/images/currency_convetor.png',
  '/images/linkedinprofile.jpg',
  '/images/media.png',
  '/images/chatnova_ai.png',
  '/images/piano.png',
  '/images/backgroundremoval.png',
  // Add more static assets as needed
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
}); 