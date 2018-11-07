//通常你应在你的应用首次初始化的时候请求显示通知的权限：
//注：Chrome 不允许你在 load 事件处理中调用 
window.addEventListener('load', function () {
  Notification.requestPermission(function (status) {
    // 这将使我们能在 Chrome/Safari 中使用 Notification.permission
    if (Notification.permission !== status) {
      Notification.permission = status;
    }
  });
});

window.addEventListener('load', () => {
  if (!('serviceWorker' in navigator)) {
      // Service Worker isn't supported on this browser, disable or hide UI.
      return;
  }

  if (!('PushManager' in window)) {
      // Push isn't supported on this browser, disable or hide UI.
      return;
  }

  let promiseChain = new Promise((resolve, reject) => {
      const permissionPromise = Notification.requestPermission(result => {
          resolve(result);
      });

      if (permissionPromise) {
          permissionPromise.then(resolve);
      }
  })
  .then(result => {
      if (result === 'granted') {
          execute();
      }
      else {
          console.log('no permission');
      }
  });
});
function registerServiceWorker() {
  return navigator.serviceWorker.register('service-worker.js')
  .then(registration => {
      console.log('Service worker successfully registered.');
      return registration;
  })
  .catch(err => {
      console.error('Unable to register service worker.', err);
  });
}
function execute() {
  registerServiceWorker().then(registration => {
      registration.showNotification('Hello World!');
  });
}

window.addEventListener('load', function () {
  // 首先，让我们检查我们是否有权限发出通知
  // 如果没有，我们就请求获得权限
  if (window.Notification && Notification.permission !== "granted") {
    Notification.requestPermission(function (status) {
      if (Notification.permission !== status) {
        Notification.permission = status;
      }
    });
  }

  var button = document.getElementsByTagName('button')[0];
  button.addEventListener('click', function () {
    // 如果用户同意就创建一个通知
    if (window.Notification && Notification.permission === "granted") {
      var n = new Notification("Hi!");
    }

    // 如果用户没有选择是否显示通知
    // 注：因为在 Chrome 中我们无法确定 permission 属性是否有值，因此
    // 检查该属性的值是否是 "default" 是不安全的。
    else if (window.Notification && Notification.permission !== "denied") {
      Notification.requestPermission(function (status) {
        if (Notification.permission !== status) {
          Notification.permission = status;
        }

        // 如果用户同意了
        if (status === "granted") {
          var n = new Notification("Hi!");
        }

        // 否则，我们可以让步的使用常规模态的 alert
        else {
          alert("Hi!");
        }
      });
    }

    // 如果用户拒绝接受通知
    else {
      // 我们可以让步的使用常规模态的 alert
      alert("Hi!");
    }
  });
});

function askPermission() {
    return new Promise(function (resolve, reject) {
        var permissionResult = Notification.requestPermission(function (result) {
            // 旧版本
            resolve(result);
        });
        if (permissionResult) {
            // 新版本
            permissionResult.then(resolve, reject);
        }
    })
    .then(function (permissionResult) {
        //granted（被授予）， denied（被拒绝） 或者 default（默认）
        if (permissionResult !== 'granted') {
            // 用户未授权
        }
    });
}

Notification.requestPermission().then(function(result) {
    if (result === 'denied') {
      console.log('Permission wasn\'t granted. Allow a retry.');
      return;
    }
    if (result === 'default') {
      console.log('The permission request was dismissed.');
      return;
    }
    // Do something with the granted permission.
  });

  <button onclick="notifyMe()">Notify me!</button>
  function notifyMe() {
    // 先检查浏览器是否支持
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
    // 检查用户是否同意接受通知
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
      var notification = new Notification("Hi there!");
    }
    // 否则我们需要向用户获取权限
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        console.log(permission); // 仅当值为 "granted" 时显示通知
        // 如果用户同意，就可以向他们发送通知
        if (permission === "granted") {
          var n = new Notification("title", {body: "notification body"}); // 显示通知
          var notification = new Notification("Hi there!");
        }
      });
    }
    // 最后，如果执行到这里，说明用户已经拒绝对相关通知进行授权
    // 出于尊重，我们不应该再打扰他们了
  }


//附加语法糖：关于克隆对象的速度研究。
//https://dassur.ma/things/deep-copy/ 
//博客作者认为目前（参考）最快的object克隆、复制方式。
function structuralClone(obj) {
  return new Notification('', {data: obj, silent: true}).data;
}

function spawnNotification(theBody,theIcon,theTitle) {
    var options = {
        body: theBody,
        icon: theIcon
    }
    var n = new Notification(theTitle,options);
    setTimeout(n.close.bind(n), 4000);
  }

  notification.onclick = function(event) {
    event.preventDefault(); // prevent the browser from focusing the Notification's tab
    window.open('http://www.mozilla.org', '_blank');
  }

navigator.serviceWorker.register('sw.js');
function showNotification() {
  Notification.requestPermission(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification('Vibration Sample', {
          body: 'Buzz! Buzz!',
          icon: '../images/touch/chrome-touch-icon-192x192.png',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: 'vibration-sample'
        });
      });
    }
  });
}

navigator.serviceWorker.register('sw.js');
var options = { tag : 'user_alerts' };
navigator.serviceWorker.ready.then(function(registration) {
  registration.getNotifications(options).then(function(notifications) {
    // do something with your notifications
  }) 
});

registration.showNotification('Actions Notification', {
  actions: [
      {
          action: 'coffee-action',
          title: 'Coffee',
          icon: 'path/to/action-1.png'
      },
      {
          action: 'doughnut-action',
          title: 'Doughnut',
          icon: 'path/to/action-2.png'
      },
      {
          action: 'gramophone-action',
          title: 'gramophone',
          icon: 'path/to/action-3.png'
      },
      {
          action: 'atom-action',
          title: 'Atom',
          icon: 'path/to/action-4.png'
      }
  ]
});
self.addEventListener('notificationclick', event => {
  if (!event.action) {
      // 没有点击在按钮上
      console.log('Notification Click.');
      return;
  }

  switch (event.action) {
      case 'coffee-action':
          console.log('User \'s coffee.');
          break;
      case 'doughnut-action':
          console.log('User \'s doughnuts.');
          break;
      case 'gramophone-action':
          console.log('User \'s music.');
          break;
      case 'atom-action':
          console.log('User \'s science.');
          break;
      default:
          console.log(`Unknown action clicked: '${event.action}'`);
          break;
  }
});

registration.showNotification('Notification 1 of 3', {
  body: 'With \'tag\' of \'message-group-1\'',
  tag: 'message-group-1'
});
registration.showNotification('Notification 2 of 3', {
  body: 'With \'tag\' of \'message-group-2\'',
  tag: 'message-group-2'
});
registration.showNotification('Notification 3 of 3', {
  body: 'With \'tag\' of \'message-group-1\'',
  tag: 'message-group-1',
  renotify: true  //重新通知(renotify)
});
registration.showNotification('Silent Notification', {
  silent: true   //静默通知(silent) 同时使用了 silent 和 renotify 属性，silent 会有较高的优先级，即依然为静默通知。
});
//为了显式的让通知一直显示直到用户交互，我们可以设置 requireInteraction 属性。
registration.showNotification('Require Interaction Notification', {
  body: 'With "requireInteraction: \'true\'".',
  requireInteraction: true
});

self.addEventListener('notificationclose', event => {
  let dismissedNotification = event.notification;
  let promiseChain = notificationCloseAnalytics();
  event.waitUntil(promiseChain);
});

self.addEventListener('notificationclick', function(event) {
  console.log('On notification click: ', event.notification.tag);
  event.notification.close();
  // This looks to see if the current is already open and
  // focuses if it is
  event.waitUntil(clients.matchAll({
    type: "window"
  }).then(function(clientList) {
    for (var i = 0; i < clientList.length; i++) {
      var client = clientList[i];
      if (client.url == '/' && 'focus' in client)
        return client.focus();
    }
    if (clients.openWindow)
      return clients.openWindow('/');
  }));
});

self.registration.showNotification("New articles available", {
  actions: [{action: "get", title: "Get now."}]
});
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if (event.action === 'get') {
    synchronizeReader();
  } else {
    clients.openWindow("/reader");
  }
}, false);

registration.showNotification('Notification With Data', {
  body: 'This notification has data attached to it that is printed to the console when it\'s clicked.',
  data: {
      time: (new Date()).toString(),
      message: 'Hello World!'
  }
});
self.addEventListener('notificationclick', event => {
  const notificationData = event.notification.data;
  console.log('The data notification had the following parameters:');
  Object.keys(notificationData).forEach(key => {
      console.log(`  ${key}: ${notificationData[key]}`);
  });

  let examplePage = '/demos/notification-examples/example-page.html';
  let promiseChain = clients.openWindow(examplePage);
  event.waitUntil(promiseChain);

  let urlToOpen = new URL(examplePage, self.location.origin).href;
  let promiseChain = clients.matchAll({
      type: 'window',
      includeUncontrolled: true
  })
  .then(windowClients => {
      let matchingClient = null;
      for (let i = 0, max = windowClients.length; i < max; i++) {
          let windowClient = windowClients[i];
          if (windowClient.url === urlToOpen) {
              matchingClient = windowClient;
              break;
          }
      }
      return matchingClient
          ? matchingClient.focus()
          : clients.openWindow(urlToOpen);
  });
  event.waitUntil(promiseChain);

  const userName = 'X';
  let promiseChain = registration.getNotifications()
    .then(notifications => {
        let currentNotification;
        for(let i = 0, max = notifications.length; i < max; i++) {
            if (notifications[i].data && notifications[i].data.userName === userName) {
                currentNotification = notifications[i];
                break;
            }
        }
        return currentNotification;
    });
  promiseChain.then(currentNotification => {
    let notificationTitle;
    let options = {
        icon: userIcon
    };
    if (currentNotification) {
        // 找到之前X发送信息的通知，整合通知。
        let messageCount = currentNotification.data.newMessageCount + 1;
        options.body = `You have ${messageCount} new messages from ${userName}.`;
        options.data = {
            userName: userName,
            newMessageCount: messageCount
        };
        notificationTitle = `New Messages from ${userName}`;
        // 把之前的信息删除
        currentNotification.close();
    }else {
        // 没找到，则常规处理
        options.body = `"${userMessage}"`;
        options.data = {
            userName: userName,
            newMessageCount: 1
        };
        notificationTitle = `New Message from ${userName}`;
    }
    return registration.showNotification(notificationTitle, options);
  });

  let clickedNotification = event.notification;
  clickedNotification.close();

  // 执行某些异步操作，等待它完成
  let promiseChain = doSomething();
  event.waitUntil(promiseChain);
});
function isClientFocused() {
  return clients.matchAll({
      type: 'window',
      includeUncontrolled: true
  })
  .then(windowClients => {
      let clientIsFocused = false;
      for (let i = 0, max = windowClients.length; i < max; i++) {
          if (windowClients[i].focused) {
              clientIsFocused = true;
              break;
          }
      }
      return {clientIsFocused, windowClients};
  });
}
self.addEventListener('push', function(event) {
  const promiseChain = isClientFocused()
    .then({clientIsFocused, windowClients} => {
        // 如果处于激活状态，向页面发送数据
        if (clientIsFocused) {
          windowClients.forEach(windowClient => {
            windowClient.postMessage({
                message: 'Received a push message.',
                time: new Date().toString()
            });
          });
        }
        // 否则发送通知
        else {
          return self.registration.showNotification('No focused windows', {
              body: 'Had to show a notification instead of messaging each page.'
          });
        }
    });
  event.waitUntil(promiseChain);
});
//在每个页面中，我们可以通过监听 message 事件来获取这些数据。
navigator.serviceWorker.addEventListener('message', event => {
  console.log('Received a message from service worker: ', event.data);
});

self.addEventListener('notificationclick', event => {
  event.waitUntil(async function() {
    const allClients = await clients.matchAll({
      includeUncontrolled: true
    });
    let chatClient;
    // Let's see if we already have a chat window open:
    for (const client of allClients) {
      const url = new URL(client.url);

      if (url.pathname == '/chat/') {
        // Excellent, let's use it!
        client.focus();
        chatClient = client;
        break;
      }
    }
    // If we didn't find an existing chat window,
    // open a new one:
    if (!chatClient) {
      chatClient = await clients.openWindow('/chat/');
    }
    // Message the client:
    chatClient.postMessage("New chat messages!");
  }());
});