// Bump this whenever the deployed bundle changes shape so old clients refresh.
const CACHE_NAME = 'plant-or-pull-v9'

// Files that make up the app shell. These are precached on install so the
// game still loads (and can run) when the device is offline. Hashed JS/CSS
// chunks and plant images are added to the cache opportunistically on first
// fetch (see the fetch handler below).
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
  './favicon.ico',
  './sfbbo_logo.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(APP_SHELL).catch(() => {}))
      .then(() => self.skipWaiting()),
  )
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
// while still allowing the game to be played offline once cached. For
// navigation requests we additionally fall back to the cached app shell
// when both the network and the exact cache entry miss.
self.addEventListener('fetch', (event) => {
  const request = event.request
  if (request.method !== 'GET') return

  const requestUrl = new URL(request.url)
  if (requestUrl.origin !== self.location.origin) return

  const isNavigation = request.mode === 'navigate'

  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.ok && networkResponse.type !== 'opaque') {
          const responseClone = networkResponse.clone()
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(request, responseClone))
            .catch(() => {})
        }
        return networkResponse
      })
      .catch(async () => {
        const cached = await caches.match(request)
        if (cached) return cached
        if (isNavigation) {
          const shell =
            (await caches.match('./index.html')) ||
            (await caches.match('./')) ||
            (await caches.match(self.registration.scope))
          if (shell) return shell
        }
        return Response.error()
      }),
  )
})
