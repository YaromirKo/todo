// self.__precacheManifest = [].concat(self.__precacheManifest || []);
// workbox.precaching.suppressWarnings();
// workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// let urlsToCache = [
//     '/',
//     '/index.html',
//     '/css/app.90baa6be.css',
//     '/**/*.js',
//     '/**/*.css',
//     '/js/app.3c6ba691.js',
//     '/js/chunk-vendors.27423cc5.js',
//     '/media/audio.6227e272.mp3'
// ];


importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

let urlsToCache = '/index.html'

const CACHE_VERSION  = 'v1.1' //Change this value every time before you build

self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});



self.addEventListener('install', async (event) => {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then((cache) => cache.add(urlsToCache))
    );
});


if (workbox.navigationPreload.isSupported()) {
    workbox.navigationPreload.enable();
}

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE_VERSION) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith((async () => {
            try {
                const preloadResp = await event.preloadResponse;

                if (preloadResp) {
                    return preloadResp;
                }

                const networkResp = await fetch(event.request);
                return networkResp;
            } catch (error) {

                const cache = await caches.open(CACHE_VERSION);
                const cachedResp = await cache.match(urlsToCache);
                return cachedResp;
            }
        })());
    }
});



self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})


if (workbox) {
    console.log(`Workbox is loaded`);

    workbox.routing.registerRoute(
        new RegExp('/*'),
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: CACHE
        })
    );

    workbox.loadModule('workbox-cacheable-response');
    workbox.loadModule('workbox-range-requests');

    workbox.routing.registerRoute(
        /.*\.mp3/,
        new workbox.strategies.CacheFirst({
            cacheName: CACHE,
            plugins: [
                new workbox.cacheableResponse.CacheableResponsePlugin({statuses: [200]}),
                new workbox.rangeRequests.RangeRequestsPlugin(),
            ],
        }),
    );

}
else {
    console.log(`Workbox didn't load`);
}
