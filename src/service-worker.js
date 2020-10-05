// self.__precacheManifest = [].concat(self.__precacheManifest || []);
// workbox.precaching.suppressWarnings();
// workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

let urlsToCache = [
    '/',
    '/index.html',
    '/js/chunk-vendors.27423cc5.js',
    '/media/audio.6227e272.mp3'
];


importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');


const CACHE_VERSION  = 'v1.2' //Change this value every time before you build

self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});



self.addEventListener('install', async (event) => {
    event.waitUntil(
        caches.open(CACHE_VERSION)
            .then((cache) => cache.addAll(urlsToCache))
    );
});




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


self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                    // Cache hit - return response
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                }
            )
    );
});



self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

// if (workbox.navigationPreload.isSupported()) {
//     workbox.navigationPreload.enable();
// }

if (workbox) {
    console.log(`Workbox is loaded`);

    workbox.routing.registerRoute(
        new RegExp('/*'),
        new workbox.strategies.StaleWhileRevalidate({
            cacheName: CACHE_VERSION
        })
    );

    workbox.loadModule('workbox-cacheable-response');
    workbox.loadModule('workbox-range-requests');

    workbox.routing.registerRoute(
        /.*\.mp3/,
        new workbox.strategies.CacheFirst({
            cacheName: CACHE_VERSION,
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
