//Promise<Response> fetch(input[, init]);

/*参数
?input
定义要获取的资源。这可能是：
一个 USVString 字符串，包含要获取资源的 URL。一些浏览器会接受 blob: 和 data: 作为 schemes.
一个 Request 对象。
init 可选
一个配置项对象，包括所有对请求的设置。可选的参数有：
method: 请求使用的方法，如 GET、POST。
headers: 请求的头信息，形式为 Headers 的对象或包含 ByteString 值的对象字面量。
body: 请求的 body 信息：可能是一个 Blob、BufferSource、FormData、URLSearchParams 或者 USVString 对象。注意 GET 或 HEAD 方法的请求不能包含 body 信息。
mode: 请求的模式，如 cors、 no-cors 或者 same-origin。
credentials: 请求的 credentials，如 omit、same-origin 或者 include。为了在当前域名内自动发送 cookie ， 必须提供这个选项， 从 Chrome 50 开始， 这个属性也可以接受 FederatedCredential 实例或是一个 PasswordCredential 实例。
cache:  请求的 cache 模式: default 、 no-store 、 reload 、 no-cache 、 force-cache 或者 only-if-cached 。
redirect: 可用的 redirect 模式: follow (自动重定向), error (如果产生重定向将自动终止并且抛出一个错误), 或者 manual (手动处理重定向). 在Chrome中，Chrome 47之前的默认值是 follow，从 Chrome 47开始是 manual。
referrer: 一个 USVString 可以是 no-referrer、client或一个 URL。默认是 client。
referrerPolicy: Specifies the value of the referer HTTP header. May be one of no-referrer、 no-referrer-when-downgrade、 origin、 origin-when-cross-origin、 unsafe-url 。
integrity: 包括请求的  subresource integrity 值 （ 例如： sha256-BpfBw7ivV8q2jLiT13fxDYAe2tJllusRSZ273h2nFSE=）。
*/

var myImage = document.querySelector('img');
var myHeaders = new Headers();
myHeaders.append('Content-Type', 'image/jpeg');
var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' };
var myRequest = new Request('flowers.jpg');
fetch(myRequest,myInit).then(function(response) {
  return response.blob();
}).then(function(response) {
  var objectURL = URL.createObjectURL(response);
  myImage.src = objectURL;
});

var myImage = document.querySelector('.my-image');
fetch('flowers.jpg').then(function(response) {
  return response.blob();
}).then(function(response) {
  var objectURL = URL.createObjectURL(response);
  myImage.src = objectURL;
});

var myInit = { method: 'GET',
               headers: {
                   'Content-Type': 'image/jpeg'
               },
               mode: 'cors',
               cache: 'default' };
var myRequest = new Request('flowers.jpg', myInit);

let myHeaders = new Headers();
myHeaders.append('Content-Type', 'text/xml');
myHeaders.append('Content-Type', 'image/jpeg');
myHeaders.get('Content-Type'); // Returns 'image/jpeg'
myHeaders.has('Content-Type'); // Returns true
myHeaders.has('Accept-Encoding'); // Returns false

myHeaders.append('Accept-Encoding', 'deflate');
myHeaders.append('Accept-Encoding', 'gzip');
myHeaders.get('Accept-Encoding'); // Returns 'deflate' only, as it was the first value added
myHeaders.getAll('Accept-Encoding'); // Returns [ "deflate", "gzip" ]

myHeaders.delete('Content-Type');
myHeaders.get('Content-Type'); // Returns null, as it has been deleted

// Create a test Headers object
var myHeaders = new Headers();
myHeaders.append('Content-Type', 'text/xml');
myHeaders.append('Vary', 'Accept-Language');
// Display the key/value pairs
for (var pair of myHeaders.entries()) {
    // content-type: text/xml
    // vary: Accept-Language
   console.log(pair[0]+ ': '+ pair[1]);
}

// Create a test Headers object
var myHeaders = new Headers();
myHeaders.append('Content-Type', 'text/xml');
myHeaders.append('Vary', 'Accept-Language');
// Display the keys
for(var key of myHeaders.keys()) {
    // content-type
    // vary
   console.log(key); 
}

// Create a test Headers object
var myHeaders = new Headers();
myHeaders.append('Content-Type', 'text/xml');
myHeaders.append('Vary', 'Accept-Language');
// Display the values
for (var value of myHeaders.values()) {
    // text/xml
    // Accept-Language
   console.log(value); 
}

var myHeaders = new Headers(); // Currently empty
myHeaders.append('Content-Type', 'image/jpeg');
myHeaders.set('Content-Type', 'text/html');
myHeaders.set('Accept-Encoding', 'deflate');
myHeaders.set('Accept-Encoding', 'gzip');
myHeaders.get('Accept-Encoding'); // Returns 'gzip'