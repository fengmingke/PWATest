"use strict";

this.addEventListener('fetch', function (event) {

  if(event.request.headers.get('save-data')){
    // 我们想要节省数据，所以限制了图标和字体
    if (event.request.url.includes('fonts.googleapis.com')) {
        // 不返回任何内容
        event.respondWith(new Response('', {status: 417, statusText: 'Ignore fonts to save data.' }));
    }
  }
});
