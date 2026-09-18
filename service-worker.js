const CACHE_NAME = "70ler-kafe-pwa-v3";
const STATIC_ASSETS = [
  "./manifest.json",
  "./pwa-icon-192.png",
  "./pwa-icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;

  const url = new URL(event.request.url);

  // Supabase ve diğer harici servisler Service Worker cache'ine girmez.
  if (url.origin !== self.location.origin) return;

  // HTML/navigasyon istekleri HER ZAMAN ağdan alınır.
  // Böylece web sitesindeki güncellemeler PWA'da eski HTML olarak kalmaz.
  if (event.request.mode === "navigate" || url.pathname.endsWith("/index.html") || url.pathname.endsWith("/personel.html") || url.pathname === "/") {
    event.respondWith(
      fetch(event.request, { cache: "no-store" }).catch(
        () =>
          new Response(
            "<!doctype html><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><title>70'ler Kafe</title><body style='font-family:Arial,sans-serif;padding:30px;text-align:center'><h2>Bağlantı yok</h2><p>70'ler Kafe sistemini kullanmak için internet bağlantınızı kontrol edin.</p></body>",
            { headers: { "Content-Type": "text/html; charset=utf-8" } }
          )
      )
    );
    return;
  }

  // Yalnızca küçük, değişimi nadir PWA varlıkları cache'lenir.
  if (
    url.pathname.endsWith("/manifest.json") ||
    url.pathname.endsWith("/pwa-icon-192.png") ||
    url.pathname.endsWith("/pwa-icon-512.png")
  ) {
    event.respondWith(
      caches.match(event.request).then(cached => cached || fetch(event.request))
    );
  }
});
