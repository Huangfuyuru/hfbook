# 通信方式

## Ajax

* Ajax 技术能够向服务器请求额外的数据而无须卸载页面。

* Ajax 技术的核心是 XMLHttpRequest 对象



## Coment

Ajax 是从页面向服务器请求数据的技术，而Coment是服务器向页面推送数据的技术，Coment是对Ajax的进一步扩展。实现方式两种，长轮询和流

1. 长轮询：页面发起一个到服务器的请求，然后服务器一直保持连接打开，直到有数据可发送。发送完数据后，浏览器关闭连接，随即又发起一个到服务器的新请求。

2. 流：HTTP流来实现。浏览器向服务器发送一个请求，而服务器保持链接打开，然后周期性地向浏览器发送数据。

#### SSE   服务器发送事件

是一种实现 Coment 交互的浏览器API，即支持长轮询，也支持HTTP流

## websocket

WebSocket 在一个单独地持久连接上提供全双工、双向通信。在JS中创建了WebSocket后，会有一个HTTP请求发送到服务器来发起连接，在取得服务器响应后，建立地连接会使用WebSocket协议，只有支持这种协议地专门服务器才能正常工作。

websocket协议不受同源策略的影响，只要服务器端支持，无需配置就支持跨域。

1. 创建 WebSocket ,先实例一个WebSocket对象并传入要连接的URL

   `var socket = new WebSocket("ws://www.example.com/server.php")`

2. 实例化了 WebSocket 对象后，浏览器会马上尝试创建连接。有一个表示当前状态的 readyState 属性

   0: 正在建立连接

   1：已经建立连接

   2：正在关闭连接

   3：已经关闭连接

3. WebSocket 打开之后，就可以通过连接发送和接收数据。使用send() 方法并传入任意字符串

   `socket.send('Hello world')`

4. 当服务器向客户端发来消息时，WebSocket对象就会触发 message 事件。返回数据保存在 event.data 属性中

   ```javascript
   socket.onmessage = function(event){
   	var data = event.data
   }
   ```

   