self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
      caches.open(caches).then(cache => {
        cache.addAll()
      })
    )
  })

self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  })