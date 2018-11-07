var request;
if (window.XMLHttpRequest) {
  request = new XMLHttpRequest();
} else if (window.ActiveXObject) {
  try {
    request = new ActiveXObject('Msxml2.XMLHTTP');
  } catch (e) {
    try {
      request = new ActiveXObject('Microsoft.XMLHTTP');
    } catch (e) {}
  }
}
request.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    doSomething(this.responseText);
  }
};
// 打开，发送
request.open('GET', '/some/url', true);
request.send();
