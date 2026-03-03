const CACHE_NAME = 'geoalert-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css',
  'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js',
  '/icon-192.png',
  '/icon-512.png'
];

// 1. Instalación: Guardar archivos esenciales en el caché
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache abierto y archivos guardados');
      return cache.addAll(ASSETS);
    })
  );
});

// 2. Activación: Limpiar cachés antiguos si actualizamos la versión
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// 3. Intercepción de peticiones: Servir desde el caché si no hay red
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
