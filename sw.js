const CACHE_NAME = 'house-of-pallavi-v1';
const ASSETS = ['./index.html'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});

self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : { title: "The House of Pallavi", body: 'Time for today\'s puzzles!' };
  e.waitUntil(self.registration.showNotification(data.title, {
    body: data.body,
    icon: './icon-192.png',
    badge: './icon-192.png'
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(clients.openWindow('./'));
});
