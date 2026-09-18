const CACHE_NAME = "70ler-kafe-pwa-v5";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./70ler-pwa-icon-192-new.png",
  "./70ler-pwa-icon-512-new.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Harici servisler, özellikle Supabase, cache'lenmez.
  if (url.origin !== self.location.origin) return;

  // HTML'de ağ öncelikli: güncel sürüm alınır; ağ yoksa cache kullanılır.
  if (url.pathname.endsWith("/index.html") || url.pathname === "/") {
    event.respondWith(
      fetch(event.request, { cache: "no-store" })
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME)
            .then(cache => cache.put("./index.html", copy))
            .catch(() => {});
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Sadece PWA'nın statik dosyaları için basit fallback.
  if (
    url.pathname.endsWith("/manifest.json") ||
    url.pathname.endsWith("/pwa-icon-192.png") ||
    url.pathname.endsWith("/pwa-icon-512.png") ||
    url.pathname.endsWith("/service-worker.js")
  ) {
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  }
});
