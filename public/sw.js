// Bump this whenever the deployed bundle changes shape so old clients refresh.
const CACHE_NAME = 'plant-or-pull-v4'

self.addEventListener('install', (event) => {
  event.waitUntil(self.skipWaiting())
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
      )
      .then(() => self.clients.claim()),
  )
})

// Network-first with cache fallback so deploys are picked up immediately
// while still allowing the game to be played offline once cached.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  const requestUrl = new URL(event.request.url)
  if (requestUrl.origin !== self.location.origin) return

  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.ok && networkResponse.type !== 'opaque') {
          const responseClone = networkResponse.clone()
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, responseClone))
            .catch(() => {})
        }
        return networkResponse
      })
      .catch(() =>
        caches
          .match(event.request)
          .then((cached) => cached || caches.match(self.registration.scope)),
      ),
  )
})
