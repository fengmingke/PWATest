this.onpush = function(event) {
    console.log(event.data);
    // From here we can write the data to IndexedDB, send it to any open
    // windows, display a notification, etc.
}
navigator.serviceWorker.register('serviceworker.js').then(
function(serviceWorkerRegistration) {
    serviceWorkerRegistration.pushManager.subscribe().then(
    function(pushSubscription) {
        console.log(pushSubscription.subscriptionId);
        console.log(pushSubscription.endpoint);
        // The push subscription details needed by the application
        // server are now available, and can be sent to it using,
        // for example, an XMLHttpRequest.
    }, function(error) {
        // During development it often helps to log errors to the
        // console. In a production environment it might make sense to
        // also report information about errors back to the
        // application server.
        console.log(error);
    }
    );
});

this.onpush = function(event) {
    console.log(event.data);
    // 这里可以向 IndexDB 写入数据，向任何打开的窗口发送数据以及显示通知等
}
navigator.serviceWorker.register('serviceworker.js').then(
    function(serviceWorkerRegistration) {
        var options = {
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey
        };
        serviceWorkerRegistration.pushManager.subscribe(options).then(
            function(pushSubscription) {
                console.log(pushSubscription.endpoint);
                // 应用服务器所需的推送订阅详情现在可用，并且可以通过如 XMLHttpRequest 的方式发送
            }, function(error) {
                // 开发过程中将错误打印到控制台通常很有帮助。同样，生产环境下将错误信息发送至应用服务器后台也一样。
                console.log(error);
        });
    }
);


// 将base64的applicationServerKey转换成UInt8Array
function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);
    for (var i = 0, max = rawData.length; i < max; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
function subscribe(serviceWorkerReg) {
    serviceWorkerReg.pushManager.subscribe({ // 2. 订阅
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array('<applicationServerKey>')
    })
    .then(function (subscription) {
        // 3. 发送推送订阅对象到服务器，具体实现中发送请求到后端api
        sendEndpointInSubscription(subscription);
    })
    .catch(function () {
        if (Notification.permission === 'denied') {
            // 用户拒绝了订阅请求
        }
    });
}
if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register('./service-worker.js')  // 1. 注册Service Worker
        .then(function(reg) {});
    navigator.serviceWorker.ready.then(function(reg) {subscribe(reg)});
}


webPush.sendNotification(subscriber[2], 200, obj.key, JSON.stringify({
    action: 'chatMsg',
    name: obj.name,
    msg: obj.msg
}));
self.addEventListener('push', function(event) {
    var obj = event.data.json();
    if(obj.action === 'subscribe' || obj.action === 'unsubscribe') {
      fireNotification(obj, event);
      port.postMessage(obj);
    } else if(obj.action === 'init' || obj.action === 'chatMsg') {
      port.postMessage(obj);
    }
});

// We need the service worker registration to check for a subscription
navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {
    // Do we already have a push message subscription?
    serviceWorkerRegistration.pushManager.getSubscription()
      .then(function(subscription) {
        // Enable any UI which subscribes / unsubscribes from
        // push messages.
        var pushButton = document.querySelector('.js-push-button');
        pushButton.disabled = false;

        if (!subscription) {
          // We aren’t subscribed to push, so set UI
          // to allow the user to enable push
          return;
        }

        var endpoint = subscription.endpoint;
        var expirationTime = subscription.expirationTime;
        var options = subscription.options; //userVisibleOnly,applicationServerKey
        var key = subscription.getKey('p256dh');
        var auth = subscription.getKey('auth');
        var mySubscription = subscription.toJSON();

        // Keep your server in sync with the latest subscriptionId
        sendSubscriptionToServer(subscription);
        showCurlCommand(subscription);

        // Set your UI to show they have subscribed for
        // push messages
        pushButton.textContent = 'Disable Push Messages';
        isPushEnabled = true;
      })
      .catch(function(err) {
        window.Demo.debug.log('Error during getSubscription()', err);
      });
  });

  navigator.serviceWorker.ready.then(function(reg) {
    reg.pushManager.getSubscription().then(function(subscription) {
      subscription.unsubscribe().then(function(successful) {
        // You've successfully unsubscribed
      }).catch(function(e) {
        // Unsubscription failed
      })
    })        
  });

  //node
var webpush = require('web-push');
var vapidKeys = webpush.generateVAPIDKeys(); // 1.生成公私钥
webpush.setVapidDetails( // 2.设置公私钥
    'mailto:sender@example.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);
// 3.从数据库中拿出之前保存的pushSubscription，具体实现省略
// 4.向推送服务发起调用请求
webpush.sendNotification(pushSubscription, '推送消息内容')
    .catch(function (err) {
        if (err.statusCode === 410) {
            // 从数据库中删除推送订阅对象
        }
    });