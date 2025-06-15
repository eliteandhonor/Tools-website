/* eslint-env serviceworker */
/* global importScripts, workbox */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');
self.skipWaiting();
workbox.core.clientsClaim();
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST||[]);
workbox.routing.registerRoute(({request})=>request.destination==='style',new workbox.strategies.StaleWhileRevalidate({cacheName:'css'}));
workbox.routing.registerRoute(({request})=>request.destination==='script',new workbox.strategies.StaleWhileRevalidate({cacheName:'js'}));
workbox.routing.registerRoute(({request})=>request.destination==='image'&&request.url.length<=1048576,new workbox.strategies.CacheFirst({cacheName:'img',plugins:[new workbox.expiration.ExpirationPlugin({maxEntries:60,maxAgeSeconds:2592000})]}));
workbox.routing.registerRoute(
  ({url}) => new RegExp('fonts/(?:googleapis|gstatic)/').test(url.host),
  new workbox.strategies.StaleWhileRevalidate({cacheName:'fonts'})
);
workbox.routing.registerRoute(({url})=>/cdn\.jsdelivr\.net|unpkg\.com/.test(url.host),new workbox.strategies.StaleWhileRevalidate({cacheName:'cdn',plugins:[new workbox.broadcastUpdate.BroadcastUpdatePlugin()]}));
