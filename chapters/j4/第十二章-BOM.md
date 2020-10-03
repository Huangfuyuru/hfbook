# BOM

## window

BOM的核心是window对象，表示浏览器的实例。window对象在浏览器中有两种身份，ECMAScript中的Global对象和浏览器窗口的JavaScript接口。

窗口关系

top对象始终指向最上层，parent对象始终指向当前窗口的父窗口，self属性始终指向window

窗口位置

screenLeft,screenTop:表示窗口相对于屏幕左侧和顶部的位置

moveTo(),moveBy()：移动窗口

像素比

window.devicePixelRatio 表示物理像素与逻辑像素之间的缩放系数。比如手机屏幕的物理分辨率是1920x1080，但是因为其像素可能非常小，所以浏览器就需要将其分辨率降为较低的逻辑分辨率，必须640x320,这个物理像素与CSS像素之间的转换比例就是3,由window.devicePixelRatio提供。

窗口大小

innerWidth,innerHeight: 浏览器窗口中页面视口大小

outerwidth,outerHeight: 浏览器窗口自身大小

resizeTo(),resizeBy(): 调整窗口大小

视口位置

pageXoffset/scrollX，pageYoffset/scrollY: 度量文档相对于视口滚动距离的属性

scroll(),scrollTo(),scrollBy(): 滚动页面

导航与打开新窗口

window.open() 可以用于导航到指定的URL,也可以用于打开新窗口。接受四个参数：要加载的URL、目标窗口名、特性字符串和表示新窗口在浏览器历史记录中是否替代当前加载页面的布尔值。

如果“目标窗口名”已经存在，则会在该目标窗口打开URL

如果“目标窗口名”不存在，则会打开一个新的窗口“目标窗口名”

如果“目标窗口名“不存在，但是没有指定”特性字符串“，那么新打开的窗口会带所有默认参数

如果”目标窗口名“已经存在，也指定了”特性字符串“，那么新打开的窗口会忽略”特性字符串“

**特性字符串的位置**

系统对话框

alert() 

confirm()

promt()

**这些对话框都是同步的模态对话框，即在他们显示的时候，代码会停止执行，在他们消失后，代码才会恢复执行**

print() 显示打印对话框

find() 显示查找对话框

**这两种对话框都是异步的**

## location

location对象提供了当前窗口中加载文档的信息，以及通常的导航功能。它既是window的属性也是document的属性，window.location和document.location指向同一个对象。

'http://foouser:barpassword@www.wrox.com:80/WileyCDA/?q=javascript#contents'

| 属性              | 值                                                      | 说明                                          |
| ----------------- | ------------------------------------------------------- | --------------------------------------------- |
| location.hash     | "#contents"                                             | URL散列值，如果没有则为空字符                 |
| location.host     | "www.wrox.com:80"                                       | 服务器名及端口号                              |
| location.hostname | "www.wrox.com"                                          | 服务器名                                      |
| location.href     | "http://www.wrox.com:80/WileyCDA/?q=javascript#content" | 当前加载页面的完整的URL                       |
| location.pathname | "/WileyCDA/"                                            | URL中的路径和(或)文件名                       |
| location.port     | “80”                                                    | 请求的端口，如果URL中没有端口，则返回空字符串 |
| location.protocol | "http:"                                                 | 页面使用的协议                                |
| location.search   | "?q=javascript"                                         | URL的查询字符串                               |
| location.username | "foouser"                                               | 域前指定的用户名                              |
| location.password | "barpasswrod"                                           | 域前指定的密码                                |
| location.origin   | “http://www.wrox.com”                                   | URL的源地址                                   |



查询字符串

URLSearchParams 提供一组标准API方法，通过他们可以检查和修改查询字符串。

给URLSearchParams构造函数传入一个查询字符串，就可以创建一个实例。这个实例上暴露了get()、set()、delete()等方法。

操作地址

1. location.assign('url')方法修改浏览器地址
2. window.location('url')
3. location.href('url')
4. 前面的三种方法，可以使用回退。使用location.replace('url')改变地址后，回退功能被禁用
5. location.reload('url'),能重新加载当前显示的页面，调用reload()而不传参数，页面会以最有效的方式重新加载。如果页面自上次请求以来没有修改过，浏览器可能会从缓存中加载页面，如果想强制从服务器重新加载，可以给reload传一个true

除了hash以外，只要修改location的一个属性，就会导致页面重新加载新URL

## navigator

检测插件

检测浏览器是否安装了某个插件可以通过plugins数组来确定，这个数组中的每一项都包含如下属性：

​	name:插件名称

​	description:插件的文件名

​	filename:插件的文件名

​	length:由当前插件处理的MIME类型的数量

注册处理程序

registerProtocolHandler()方法可以把一个网站注册为处理某种特定类型信息应用程序，借助这个方法可以将Web应用程序注册为像桌面软件一样的默认应用程序。

传入三个参数：要处理的协议(如"mailto"或"ftp")、要处理该协议的URL，以及应用名称。	

```
navigator.registerProtocolHandler("mailto","http://www.somemailclient.com?cmd=%s","some mail client")
```

## screen

保存客户端信息

| 属性        | 说明                         |
| ----------- | ---------------------------- |
| availHeight | 屏幕像素高度减去系统组件高度 |
|             |                              |
|             |                              |
|             |                              |
|             |                              |
|             |                              |



## history

history对象表示当前窗口首次使用以来用户的导航历史记录。

导航

go() 方法可以在用户历史记录中沿任何方向导航，可以前进也可以后退。

back()

forward()

length属性，表示历史记录中有多个条目

历史状态管理

hashchange 会在页面URL的散列变化时被触发，**状态管理API可以让开发者改变浏览器URL而不会加载新页面**，可以使用history.pushState()方法，接收三个参数：一个state对象、一个新状态的标题和一个(可选的)相对URL。

pushState 和 replaceState() 需要在理解