toolbox.router.get("/emoji/v2/svg/:icon", function(event) {            
    return caches.open('twemoji').then(function(response) {               
      return response.match(event.request).then(function(response) {     
        return response || fetch(event.request)                   
      })
      }).catch(function() {
        return fetch(event.request)                            
      })
  }, {
    origin: /abs.*\.twimg\.com$/                                    
  })
  