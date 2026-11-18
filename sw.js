/* Ferrum service worker: приложение открывается без интернета.
   При изменении файлов увеличьте VERSION, чтобы обновить кэш у пользователей. */
const VERSION = "ferrum-v1";
const SHELL = [
  "./", "index.html", "style.css", "app.js", "manifest.json",
  "assets/ferra-hello.jpg", "assets/ferra-low.jpg", "assets/ferra-mid.jpg", "assets/ferra-good.jpg",
  "assets/ferra-portrait.jpg", "assets/ferra-wave-body.jpg", "assets/ferra-wave-arm.png",
  "assets/icon-192.png", "assets/icon-512.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = new URL(e.request.url);
  // шрифты Google: из кэша, а в фоне обновляем
  if (url.host.includes("fonts.googleapis.com") || url.host.includes("fonts.gstatic.com")) {
    e.respondWith(caches.open(VERSION).then(async c => {
      const hit = await c.match(e.request);
      const net = fetch(e.request).then(r => { c.put(e.request, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
    return;
  }
  // свои файлы: сначала сеть (свежая версия), без сети — кэш
  if (url.origin === location.origin) {
    e.respondWith(fetch(e.request)
      .then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); return r; })
      .catch(() => caches.match(e.request).then(r => r || caches.match("index.html"))));
  }
});
