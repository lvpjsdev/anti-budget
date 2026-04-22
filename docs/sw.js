const CACHE_NAME = 'anti-budget-cache-v1';
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
];

// Install: precache core files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

// Activate: delete old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch: cache-first for same-origin requests, network fallback for others
self.addEventListener('fetch', (event) => {
  const { request } = event;
  // Only handle GET requests for same-origin resources
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request).then((response) => {
        // Optionally cache new resources (e.g., JS/CSS/assets)
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return response;
      }).catch(() => {
        // Offline fallback: return a simple offline page if needed
        // For now, just fail
        return new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
      });
    })
  );
});
