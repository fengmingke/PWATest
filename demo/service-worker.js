var cacheName = 'helloWorld';              
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)                 
    .then(cache => cache.addAll([          
      '/js/script.js',
      '/images/hello.png'
    ]))
  );
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw-test/sw.js', {scope: 'sw-test'}).then(function(registration) {
      // registration worked
      console.log('Registration succeeded.');
      button.onclick = function() {
        registration.update();
      }
    }).catch(function(error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });
  };

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw-test/sw.js', {scope: 'sw-test'}).then(function(registration) {
      // registration worked
      console.log('Registration succeeded.');
      registration.unregister().then(function(boolean) {
        // if boolean = true, unregister is successful
      });
    }).catch(function(error) {
      // registration failed
      console.log('Registration failed with ' + error);
    });
  };

self.addEventListener('fetch', function (event) {
    event.respondWith(
      caches.match(event.request)                  
      .then(function (response) {
        if (response) {                            
          return response;                         
        }
        return fetch(event.request);              
      })
    );
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js', {
        scope: './'
    }).then(function (registration) {
        var serviceWorker;
        if (registration.installing) {
            serviceWorker = registration.installing;
            document.querySelector('#kind').textContent = 'installing';
        } else if (registration.waiting) {
            serviceWorker = registration.waiting;
            document.querySelector('#kind').textContent = 'waiting';
        } else if (registration.active) {
            serviceWorker = registration.active;
            document.querySelector('#kind').textContent = 'active';
        }
        if (serviceWorker) {
            // logState(serviceWorker.state);
            serviceWorker.addEventListener('statechange', function (e) {
                // logState(e.target.state);
            });
        }
    }).catch (function (error) {
        // Something went wrong during registration. The service-worker.js file
        // might be unavailable or contain a syntax error.
    });
} else {
    // The current browser doesn't support service workers.
}
  
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js', {scope: '/'})
            .then(function (registration) {
                // 注册成功
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(function (err) {
                // 注册失败:(
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

this.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open('my-test-cache-v1').then(function (cache) {
            return cache.addAll([
                '/',
                '/index.html',
                '/main.css',
                '/main.js',
                '/image.jpg'
            ]);
        })
    );
});

this.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (response) {
            // 来来来，代理可以搞一些代理的事情
            // 如果 Service Worker 有自己的返回，就直接返回，减少一次 http 请求
            if (response) {
                return response;
            }

            // 如果 service worker 没有返回，那就得直接请求真实远程服务
            var request = event.request.clone(); // 把原始请求拷过来
            return fetch(request).then(function (httpRes) {
                // http请求的返回已被抓到，可以处置了。
                // 请求失败了，直接返回失败的结果就好了。。
                if (!httpRes || httpRes.status !== 200) {
                    return httpRes;
                }

                // 请求成功的话，将请求缓存起来。
                var responseClone = httpRes.clone();
                caches.open('my-test-cache-v1').then(function (cache) {
                    cache.put(event.request, responseClone);
                });
                return httpRes;
            });
        })
    );
});

var CACHE_VERSION = 1;
var CURRENT_CACHES = {
  prefetch: 'prefetch-cache-v' + CACHE_VERSION
};

self.addEventListener('install', function(event) {
  var urlsToPrefetch = [
    './static/pre_fetched.txt',
    './static/pre_fetched.html',
    'https://www.chromium.org/_/rsrc/1302286216006/config/customLogo.gif'
  ];

  console.log('Handling install event. Resources to pre-fetch:', urlsToPrefetch);

  event.waitUntil(
    caches.open(CURRENT_CACHES['prefetch']).then(function(cache) {
      cache.addAll(urlsToPrefetch.map(function(urlToPrefetch) {
        return new Request(urlToPrefetch, {mode: 'no-cors'});
      })).then(function() {
        console.log('All resources have been fetched and cached.');
      });
    }).catch(function(error) {
      console.error('Pre-fetching failed:', error);
    })
  );
});

var CACHE_VERSION = 1;
// Shorthand identifier mapped to specific versioned cache.
var CURRENT_CACHES = {
  font: 'font-cache-v' + CACHE_VERSION
};

self.addEventListener('activate', function(event) {
  var expectedCacheNames = Object.keys(CURRENT_CACHES).map(function(key) {
    return CURRENT_CACHES[key];
  });

  // Active worker won't be treated as activated until promise resolves successfully.
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (expectedCacheNames.indexOf(cacheName) == -1) {
            console.log('Deleting out of date cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  console.log('Handling fetch event for', event.request.url);
  event.respondWith(
    // Opens Cache objects that start with 'font'.
    caches.open(CURRENT_CACHES['font']).then(function(cache) {
      return cache.match(event.request).then(function(response) {
        if (response) {
          console.log(' Found response in cache:', response);
          return response;
        } 
      }).catch(function(error) {
        // Handles exceptions that arise from match() or fetch().
        console.error('  Error in fetch handler:', error);
        throw error;
      });
    })
  );
});

this.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('v1').then(function(cache) {
        return cache.addAll([
          '/sw-test/',
          '/sw-test/index.html',
          '/sw-test/style.css',
          '/sw-test/app.js',
          '/sw-test/image-list.js',
          '/sw-test/star-wars-logo.jpg',
          '/sw-test/gallery/bountyHunters.jpg',
          '/sw-test/gallery/myLittleVader.jpg',
          '/sw-test/gallery/snowTroopers.jpg'
        ]);
      })
    );
  });
  
  this.addEventListener('fetch', function(event) {
    var response;
    event.respondWith(
        caches.match(event.request).catch(function() {
            return fetch(event.request);
        }).then(function(r) {
            response = r;
            caches.open('v1').then(function(cache) {
                cache.put(event.request, response);
            });
            return response.clone();
        }).catch(function() {
            return caches.match('/sw-test/gallery/myLittleVader.jpg');
        })
    );
  });

// 安装阶段跳过等待，直接进入 active
self.addEventListener('install', function (event) {
    event.waitUntil(self.skipWaiting());
});
self.addEventListener('install', function () {
    self.skipWaiting();
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        Promise.all([
            // 更新客户端
            self.clients.claim(),
            // 清理旧版本
            caches.keys().then(function (cacheList) {
                return Promise.all(
                    cacheList.map(function (cacheName) {
                        if (cacheName !== 'my-test-cache-v1') {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        ])
    );
});

var version = '1.0.1';
navigator.serviceWorker.register('/sw.js').then(function (reg) {
    if (localStorage.getItem('sw_version') !== version) {
        reg.update().then(function () {
            localStorage.setItem('sw_version', version)
        });
    }
});

self.addEventListener('push', function(event) {
    console.log('Received a push message', event);
    var title = 'Yay a message.';
    var body = 'We have received a push message.';
    var icon = '/images/icon-192x192.png';
    var tag = 'simple-push-demo-notification-tag';
  
    event.waitUntil(
      self.registration.showNotification(title, {
        body: body,
        icon: icon,
        tag: tag
      })
    );
  });

  self.addEventListener('push', function (event) {
    if (event.data) {
        var promiseChain = Promise.resolve(event.data.json())
                .then(data => self.registration.showNotification(data.title, {}));
        event.waitUntil(promiseChain);
    }
});

  self.addEventListener('push', function(event) {
    if (!(self.Notification && self.Notification.permission === 'granted')) {
      return;
    }
  
    var data = {};
    if (event.data) {
      data = event.data.json();
    }
    var title = data.title || "Something Has Happened";
    var message = data.message || "Here's something you might want to check out.";
    var icon = "images/new-notification.png";
  
    var notification = new Notification(title, {
      body: message,
      tag: 'simple-push-demo-notification',
      icon: icon
    });
  
    notification.addEventListener('click', function() {
      if (clients.openWindow) {
        clients.openWindow('https://example.blog.com/2015/03/04/something-new.html');
      }
    });
  });

  self.addEventListener('push', function(event) {
    var obj = event.data.json();
    port.postMessage(obj);
  });

  self.addEventListener('pushsubscriptionchange', function() {
    // do something, usually resubscribe to push and
    // send the new subscription details back to the
    // server via XHR or Fetch
  });
