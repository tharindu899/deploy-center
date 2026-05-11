/* ============================================================
   DEPLOY CENTER — Service Worker (sw.js)
   Versioned cache + network-first for HTML, cache-first for assets
   ============================================================ */

const CACHE_VER = 'deploy-center-v3';
const STATIC_ASSETS = [
  '/deploy-center/',
  '/deploy-center/index.html',
  '/deploy-center/style.css',
  '/deploy-center/script.js',
  '/deploy-center/apps.json',
  '/deploy-center/manifest.json',
  '/deploy-center/assets/logo.svg',
  '/deploy-center/assets/banner.svg',
  '/deploy-center/assets/thumbnails/budget-manager.svg',
  '/deploy-center/assets/thumbnails/movie-ui.svg',
  '/deploy-center/assets/thumbnails/unlock-manager.svg',
  '/deploy-center/assets/thumbnails/another-app.svg',
  '/deploy-center/apps/budget-manager/index.html',
  '/deploy-center/apps/movie-ui/index.html',
  '/deploy-center/apps/unlock-manager/index.html',
  '/deploy-center/apps/another-app/index.html',
];

/* ── Install: pre-cache ── */
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_VER).then(cache =>
      cache.addAll(STATIC_ASSETS).catch(err => console.warn('[SW] Pre-cache partial fail:', err))
    )
  );
});

/* ── Activate: clean old caches ── */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_VER).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

/* ── Fetch Strategy ── */
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  /* Skip non-GET, chrome-extension, or external API calls */
  if (event.request.method !== 'GET') return;
  if (url.origin === 'https://api.github.com') return;
  if (!url.origin.includes(self.location.origin) && !url.hostname.endsWith('picsum.photos')) return;

  /* HTML: network-first, cache fallback */
  if (event.request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(event.request)
        .then(res => { caches.open(CACHE_VER).then(c => c.put(event.request, res.clone())); return res; })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  /* Assets: cache-first, network fallback */
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(res => {
        caches.open(CACHE_VER).then(c => c.put(event.request, res.clone()));
        return res;
      });
    })
  );
});
