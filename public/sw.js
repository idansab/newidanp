const CACHE = "mah-sheyesh-pah-v2";
const ASSETS = [
  "/",
  "/index.html",
  "/css/main.css",
  "/js/data.js",
  "/js/app.js",
  "/js/navigation.js",
  "/js/search.js",
  "/js/place.js",
  "/js/favorites.js",
  "/js/surprise.js",
  "/js/settings.js",
  "/js/toast.js",
  "/manifest.json",
  "/assets/icons/icon-192.svg"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
