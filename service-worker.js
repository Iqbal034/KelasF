self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('kelasf-cache').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/register.html',
        '/reset.html',
        '/profile.html',
        '/style.css',
        '/app.js',
        '/firebase-config.js'
      ]);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});