self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('tellalife-store')
    .then(cache => cache.addAll([
      '/index.html',
    ]))
  )
})

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
    .then(response => response || fetch(event.request))
  )
})