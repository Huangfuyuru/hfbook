# Promise 对象

## Promise 含义

Promise  是一个容器，里面保存着某个未来才会结束的事情的结果。

从语法上说，Promise是一个对象，从它可以获取异步操作的消息。

Promise 对象有下面两个特点

(1) 对象的状态不受外界影响。pending、fulfilled、rejected三种状态。只有异步操作的结果，可以决定当前是哪一种状态。

(2) 一旦状态改变，就不会在变。

## 基本用法

Promise对象是一个构造函数，用来生成Promise实例。

Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。

Promise实例生成以后，可以使用then方法分别指定resolved和rejected状态的回调函数。

then方法可以接受两个回调函数作为参数，第一个回调函数是Promise对象的 状态变为resolved时调用，第二个回调函数是Promise对象的状态变为rejected时调用，第二个函数可选。

## Promise.prototype.then()

Promise 实例具有then方法。也就是说，then方法是定义在原型对象Promise.prototype上的。它的作用是为Promise实例添加状态改变时的回调函数。

then方法返回的是一个新的Promise实例(不是原来那个Promise实例)。因此可以采用链式写法。then方法后面再调用另一个then方法。

## Promise.prototype.finally()

finally() 不管Promise对象最后状态如何，都会执行的操作 。

## Promise.all()

Promise.all() 方法用于将多个 Promise 实例，包装成一个新的 Promise 实例

`const p =  Promise.all([p1,p2,p3])`

Promise.all()方法接受一个数组作为参数，p1,p2,p3是Promise实例。如果不是，会先调用Promise.resolve方法，将参数转为Promise实例。

p的状态由p1,p2,p3决定

(1) 当p1,p2,p3状态都变为resolved，p的状态才会变成resolved，此时p1,p2,p3的返回值组成一个数组，传递给p的回调函数。注意，如果p1,p2,p3中有的状态变为reject但是使用catch进行捕捉并返回,p 拿到的状态是resloved

(2) 只要p1,p2,p3之中有一个被rejected，p的状态就变成rejected,此时第一个被rejected的实例的返回值，会传递给p的回调函数。

## Promise.race()

Promise.race() 方法也是将多个Promise实例，包装成一个新的Promise实例

`const p = Promise.race([p1,p2,p3])`

但是与all() 方法不同的是，只要p1,p2,p3之中有一个实例率先改变状态，p的状态就跟着改变。

### Promise.allSettled()

Promise.allSettled()方法接受一组Promise实例作为参数，包装成一个新Promise实例。只有等到所有这些参数实例都返回结果，不管是resolved还是rejected，包装实例才会有结果

## Promise.any()

Promise.any() 方法接受一组Promise实例作为参数，包装成一个新的Promise实例。只要参数实例中有一个是resolved状态，包装实例就会变成resolved状态。如果所有参数实例都变成了rejected状态，包装实例就会变成rejected状态。

## Promise.resolve()

将现有对象转为Promise对象

(1) 参数是一个Promise实例

(2) 参数是一个thenable对象

(3) 参数不是具有then方法的对象，或根本 就不是对象

(4) 不带有任何参数

## Promise.reject()



## 应用

#### 加载图片

```javascript
function loadImg(url){
    return new Promise((resolve,reject)=>{
        let image = new Image();
        image.src = url;
        image.onload = function(){
            resolve(image)
        }
        image.onerror = function(){
            reject(image)
        }
    })
}
loadImg('./a.jpg').then((res)=>{
    document.body.appendChild(res)
}).catch((res)=>{
    console.log('出错了',res)
})
```



```javascript
console.log('start');
setTimeout(()=>{
    console.log('time')
})
Promise.resolve().then(()=>{
    console.log('resolve')
})
console.log('end')
//start
//end
//resolve
//time
```

* 刚开始整个脚本作为一个宏任务来执行，对于同步代码直接压入执行栈进行执行，因此先打印出start和end。
* setTimout作为一个宏任务被放入宏任务队列(下一个)
* Promise.then作为一个微任务被放入微任务队列
* 本次宏任务执行完，检查微任务，发现Promise.then，执行它
* 接下来进入下一个宏任务，发现setTimeout，执行。