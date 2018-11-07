var cacheName = 'latestNews-v1';
// 在安装过程中缓存我们已知的资源
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
    .then(cache => cache.addAll([                            
      './js/main.js',
      './js/article.js',
      './images/newspaper.svg',
      './css/site.css',
      './data/latest.json',
      './data/data-1.json',
      './article.html',
      './index.html'
    ]))
  );
});
// 缓存任何获取的新资源
self.addEventListener('fetch', event => {                   
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true })     
    .then(function (response) {
      if (response) {
        return response;                                    
      }
      var requestToCache = event.request.clone();
      return fetch(requestToCache).then(                    
        function (response) {
          if (!response || response.status !== 200) {
            return response;
          }
          var responseToCache = response.clone();
          caches.open(cacheName)
            .then(function (cache) {
              cache.put(requestToCache, responseToCache);   
            });
          return response;
        });
    })
  );
});