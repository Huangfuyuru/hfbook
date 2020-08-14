#### xss攻击：

中文是跨站脚本攻击，指的是攻击者在网站恶意注入代码，通过恶意脚本对客户端网页进行篡改，当用户浏览网站时，对用户浏览器进行控制或者获取用户隐私的一种攻击方式。

对客户端网页注入的恶意脚本一般包括JavaScript

XSS攻击分为三类：非持久性、持久性、基于DOM

| 类型         | 存储区(恶意代码存放的位置) | 插入点(由谁取得恶意代码，并插入到网页上) |
| ------------ | -------------------------- | ---------------------------------------- |
| 持久型 XSS   | 后端数据库                 | HTML                                     |
| 非持久性 XSS | URL                        | HTML                                     |
| DOM 型 XSS   | 后端数据库/前端存储/URL    | 前端 JavaScript                          |



非持久性：简单地把用户输入的数据反馈给浏览器。

持久性：把用户输入的数据存储到服务器端，当浏览器请求数据时，脚本从服务器上传回并执行。

基于DOM：通过恶意脚本修改页面的DOM结构，发生在客户端的攻击

##### XSS攻击的防范：

1.用户的输入检查：对用户的任何输入都要进行检查、过滤和转义，一般时检查`< >`等特殊字符，如果存在进行过滤或编码。

2.服务器的输出检查：

3.HttpOnly防止劫取Cookie:

#### CSRF攻击

中文是跨站请求伪造，劫持受信任用户向服务器发送非预期请求的攻击方式。借助受害者的Cookie骗取服务器的信任，在受害者毫不知情的情况下以受害者的名义伪造请求发送给服务器。

##### cookie策略

cookie用途：会话管理状态，个性化设置，浏览器行为跟踪

cookie种类：会话期cookie

​						持久性cookie:可以指定特定的过期时间(Expires)或有效期(Max-Age)

##### csrf攻击防范

1. 验证码

   验证码会强制用户必须与应用进行交互，才能完成请求

2. SSL连接

   要求以SSL连接来访问

3. 添加token验证

   在http请求中以参数的形式随机生成一个token，并在服务器建立一个拦截器来验证token