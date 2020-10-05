// self.__precacheManifest = [].concat(self.__precacheManifest || []);
// workbox.precaching.suppressWarnings();
// workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
const CACHE_VERSION  = 'v1.3' //Change this value every time before you build

// self.addEventListener("message", (event) => {
//     if (event.data && event.data.type === "SKIP_WAITING") {
//         self.skipWaiting();
//     }
// });


self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})


self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(CACHE_VERSION).then(function(cache) {
            return cache.addAll([
                './',
                './index.html',
                // './css/app.3a7f115c.css',
                // './js/app.67c00c21.js',
                './manifest.json',
                // './img/icons/favicon-32x32.png',
                './js/chunk-vendors.27423cc5.js',
                './media/audio.6227e272.mp3',
            ]);
        })
    );
});




// self.addEventListener('activate', function (event) {
//     event.waitUntil(
//         caches.keys().then(function (cacheNames) {
//             return Promise.all(
//                 cacheNames.map(function (cacheName) {
//                     if (cacheName !== CACHE_VERSION) {
//                         return caches.delete(cacheName);
//                     }
//                 })
//             );
//         })
//     );
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
const QUEUE_NAME = "bgSyncQueue";
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

    workbox.routing.registerRoute(
        /.*\.mp4/,
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
