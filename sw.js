const CACHE_NAME = 'deploy-center-v1';
const ASSETS = ['/', '/deploy-center/', '/deploy-center/index.html', '/deploy-center/style.css', '/deploy-center/script.js', '/deploy-center/apps.json'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS))));
self.addEventListener('fetch', e => e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
