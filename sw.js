/* eslint-env serviceworker */
/* global importScripts, workbox */
try{
  importScripts('/vendor/workbox/workbox-sw.js');
}catch(e){
  importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');
}
self.skipWaiting();
workbox.core.clientsClaim();
const e=["/assets/age-calculator-cake.png","/assets/base64-encoder-keyboard.png","/assets/basic-calculator-emoji.png","/assets/bmi-calculator-scale.png","/assets/bmr-calculator-fire.png","/assets/body-fat-calculator-bicep.png","/assets/circle-area-calculator-circle.png","/assets/compound-interest-chart.png","/assets/countdown-timer-hourglass.png","/assets/csv-to-json-bookmark.png","/assets/currency-converter-money.png","/assets/date-diff-calendar.png","/assets/dice-die.png","/assets/discount-label.png","/assets/fraction-calculator-briefcase.png","/assets/fuel-cost-calculator-pump.png","/assets/graphing-calculator-chart.png","/assets/index-wrench-512.png","/assets/index-wrench.png","/assets/json-formatter-braces.png","/assets/loan-bank.png","/assets/markdown-editor-pencil.png","/assets/palette.png","/assets/percentage-calculator-bars.png","/assets/pomodoro-timer-tomato.png","/assets/scientific-calculator-triangle.png","/assets/simple-interest-calculator-moneybag.png","/assets/stopwatch.png","/assets/temperature-converter-thermometer.png","/assets/time-zone-converter-clock.png","/assets/tip-calculator-money.png","/assets/triangle-area-calculator-triangle.png","/assets/unit-converter-cycle.png","/assets/uuid-generator-id.png"];workbox.precaching.precacheAndRoute((self.__WB_MANIFEST||[]).concat(e.map(u=>({url:u,revision:null}))));
workbox.routing.registerRoute(({request})=>request.destination==='style',new workbox.strategies.StaleWhileRevalidate({cacheName:'css'}));
workbox.routing.registerRoute(({request})=>request.destination==='script',new workbox.strategies.StaleWhileRevalidate({cacheName:'js'}));
workbox.routing.registerRoute(({request})=>request.destination==='image'&&request.url.length<=1048576,new workbox.strategies.CacheFirst({cacheName:'img',plugins:[new workbox.expiration.ExpirationPlugin({maxEntries:60,maxAgeSeconds:2592000})]}));
workbox.routing.registerRoute(
  ({url}) => new RegExp('fonts/(?:googleapis|gstatic)/').test(url.host),
  new workbox.strategies.StaleWhileRevalidate({cacheName:'fonts'})
);
workbox.routing.registerRoute(({url})=>/cdn\.jsdelivr\.net|unpkg\.com/.test(url.host),new workbox.strategies.StaleWhileRevalidate({cacheName:'cdn',plugins:[new workbox.broadcastUpdate.BroadcastUpdatePlugin()]}));
