# 事件循环机制

JavaScript 单线程，所以同一时间只能做一件事。但有一些操作，比如 Ajax 请求会阻塞后面的代码执行，所以浏览器给我们提供一些 webapi，可以对应的创建一些线程。

[![acC8l6.png](https://s1.ax1x.com/2020/08/06/acC8l6.png)](https://imgchr.com/i/acC8l6)

所有代码会被方法到 task 这个执行栈中，当遇到一些带有 callback 的 webapi ，比如 setTimeout、I/O 等该函数会被弹出到 webapi 中进行执行 ，等待其执行完毕，将 callback 放入 task queue。

而事件循环机制的任务就是，查看栈和任务队列，当栈空，就把任务队列队头的任务压入栈中，之后这个任务就会被执行。重绘也是，重绘是在任务队列中的，如果栈不空，那么一直无法进行重绘，UI无法很好的呈现

来想一下下面代码的执行过程

```javascript
let btn = document.getElementById('btn');
console.log('start');
btn.addEventListener('click',function(){
    console.log('click')
})
setTimeout(function(){
    console.log('Timeout')
},5000)
console.log('Done')
```



观看了 JSConf 视频总结