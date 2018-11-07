fetch('/some/url', {                           
    method: 'POST',
    headers: {
      'auth': '1234'                           
    },
    body: JSON.stringify({                     
      name: 'dean',
      login: 'dean123',
    })
  })
  .then(function (data) {                      
    console.log('Request success: ', data);
  })
  .catch(function (error) {                    
    console.log('Request failure: ', error);
  });
