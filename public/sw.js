const CACHE_NAME = "youtube-pwa-v1"
const urlsToCache = ["/", "/manifest.json"]

self.addEventListener("install", (event) => {
  console.log("[SW] Installing service worker")
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[SW] Caching app shell")
        return cache.addAll(urlsToCache)
      })
      .catch((error) => {
        console.log("[SW] Cache installation failed:", error)
      }),
  )
  // Force the waiting service worker to become the active service worker
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  console.log("[SW] Activating service worker")
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[SW] Deleting old cache:", cacheName)
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
  // Ensure the service worker takes control immediately
  self.clients.claim()
})

self.addEventListener("fetch", (event) => {
  // Only handle GET requests
  if (event.request.method !== "GET") {
    return
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version if available
      if (response) {
        return response
      }

      // Otherwise fetch from network
      return fetch(event.request).catch((error) => {
        console.log("[SW] Fetch failed:", error)
        // Return a fallback response if needed
        return new Response("Offline", { status: 503 })
      })
    }),
  )
})
