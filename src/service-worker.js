// self.__precacheManifest = [].concat(self.__precacheManifest || []);
// workbox.precaching.suppressWarnings();
// workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
const CACHE_VERSION  = 'v1.9.11.2020.6' //Change this value every time before you build

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting()
    }
})


self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})


self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(CACHE_VERSION).then(function(cache) {
            return cache.addAll([
                "./",
                "./index.html",
                "./css/app.14a6d29b.css",
                "./js/app.6e0b4853.js",
                "./js/chunk-vendors.e89c98a2.js",
                "./manifest.json"
            ]);
        })
    );
});



self.addEventListener("activate", function(event) {
    console.log("[Servicework] Activate");
    event.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== CACHE_VERSION) {
                    console.log("[ServiceWorker] Removing old cache shell", key);
                    return caches.delete(key);
                }
            }));
        })
    );
});

// self.addEventListener("activate", (event) => {
//     event.waitUntil(
//         caches.keys().then((cacheNames) => {
//             const promiseArr = cacheNames.map((item) => {
//                 if (item !== CACHE_VERSION) {
//                     return caches.delete(item);
//                 }
//             });
//             return Promise.all(promiseArr);
//         })
//     );
// });

// self.addEventListener("fetch", (event) => {
//     console.log("[ServiceWorker] Fetch");
//     event.respondWith(
//         caches.match(event.request).then(function(response) {
//             return response || fetch(event.request);
//         })
//     );
//
// });

self.addEventListener('fetch', function(event) {
    console.log(event.request.url);

    event.waitUntil(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});





// if (workbox.navigationPreload.isSupported()) {
//     workbox.navigationPreload.enable();
// }
console.log(`Workbox is loaded`);
if (workbox) {

    // const bgSyncPlugin = new workbox.backgroundSync.Plugin(QUEUE_NAME, {
    //     maxRetentionTime: 24 * 60 // Retry for max of 24 Hours (specified in minutes)
    // });
    // const networkOnlyStrategy = new workbox.strategies.NetworkOnly({
    //     plugins: [bgSyncPlugin],
    // });
    // workbox.routing.registerRoute(
    //     new RegExp('/*'),
    //     new workbox.strategies.StaleWhileRevalidate({
    //         cacheName: CACHE_VERSION,
    //         plugins: [
    //             bgSyncPlugin
    //         ]
    //     })
    // );
    workbox.routing.registerRoute(
        new RegExp('/*'),
        new workbox.strategies.CacheFirst({
            cacheName: CACHE_VERSION
        })
    );

    workbox.loadModule('workbox-cacheable-response');
    workbox.loadModule('workbox-range-requests');

    // workbox.routing.registerRoute(
    //     /.*\.mp3/,
    //     new workbox.strategies.CacheFirst({
    //         cacheName: CACHE_VERSION,
    //         plugins: [
    //             new workbox.cacheableResponse.CacheableResponsePlugin({statuses: [200]}),
    //             new workbox.rangeRequests.RangeRequestsPlugin(),
    //         ],
    //     }),
    // );

}
else {
    console.log(`Workbox didn't load`);
}
