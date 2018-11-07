var channel = new MessageChannel();
var para = document.querySelector('p');
    
var ifr = document.querySelector('iframe');
var otherWindow = ifr.contentWindow;

ifr.addEventListener("load", iframeLoaded, false);
    
function iframeLoaded() {
  otherWindow.postMessage('Hello from the main page!', '*', [channel.port2]);
}

channel.port1.onmessage = handleMessage;
function handleMessage(e) {
  para.innerHTML = e.data;
}

function sendMessage(message) {
  return new Promise(function(resolve, reject) {
     var messageChannel = new MessageChannel();
     messageChannel.port1.onmessage = function(event) {
       if (event.data.error) {
         reject(event.data.error);
       } else {
         resolve(event.data);
       }
     };
    navigator.serviceWorker.controller.postMessage(message, [messageChannel.port2]);
  });
}