# 代码集

## 函数柯里化

实现 add(1)(2)(3)

```javascript
function curry(fn,arg) {
    let len = fn.length;
    let args = arg || [];
    return function(){
        let _args = Array.prototype.slice.call(arguments);
        [].push.apply(_args,args);
        if(_args.length < len) {
            return curry.call(this,fn,_args)
        }
        return fn.apply(this,_args)
    }
}
function add(a,b,c) {
    return a+b+c
}
let addCurry = curry(add);
console.log(addCurry(1)(2)(3))
```



## 数组去重

方法一：set 与 结构赋值去重

```javascript
function unique(arr) {
    return [...new Set(arr)]
}
```

方法二：set 与 Array.from() 方法结合去重

注：Array.from()  类数组转化成数组

```javascript
function unique(arr) {
	return Array.from(new Set(arr))
}
```

方法三：双重循环

```javascript
function unique(arr) {
	for(let i=0; i<arr.length; i++) {
        for(let j=i+1; j<arr.length; j++) {
            if(arr[i] === arr[j]) {
                arr.splice(j,1);
                j--;
            }
        }
    }
    return arr;
}
```

方法四：filter 去重

```javascript
function unique(arr) {
    return arr.filter((item,index)=>{
        return arr.indexOf(item) === index
    })
}
```



## 深拷贝

方法一

```javascript
function deepClone(arr={}){
	if(typeof arr !== 'object' || arr == null) {
		return arr
	}
	let obj;
	if(arr instanceof Array) {
		obj = []
	}else{
		obj = {}
	}
    for(let i in arr) {
        if(arr.hasOwnProperty(i)){
            obj[i] = deepClone(arr[i])
        }
    }
    return obj
}
```

方法二

但是当 obj 存在函数时不能使用

```javascript
JSON.parse(JSON.stringify(obj))
```



## 防抖

一定时间段内没有触发事件，事件处理函数才会执行。如果在设定的时间段内触发事件，就重新开始延时。比如搜索发请求

```javascript
function debounce(fn,time) {
	let timer = null;
    return function(){
        if(timer != null){
            clearTimeout(timer)
        }
        timer = setTimeout(fn,time)
    }
}
```



## 节流

当持续触发事件时，一定的时间段内只调用一次事件处理函数。

```javascript
function throttle(func,delay) {
	var prev = Date.now();
    return function() {
        var context = this;
        var args = arguments;
        var now = Date.now();
        if(now-prev >= delay){
            func.apply(context,args)
            prev = Date.now()
        }
    }
}
```



可以使用节流优化图片懒加载

## 手写 bind函数

## 利用apply函数实现bind函数

```javascript
Function.prototype._bind = function(target){
    let _this = this;
    let args = Array.prototype.slice.call(arguments,1)
    return function(){
        return _this.apply(target,args)
    }
}
let obj = {
    name:'xx'
}
function test(args){
    console.log('我的名字',this.name);
    console.log('接收的参数',args)
}
console.log(test._bind(obj,'I am args')())
```



## 创建10个a标签，点击的时候弹出对应的序号

## new的过程



## 拉平数组

```javascript
function reduceArr(list){
    let result = [];
    for(let i=0;i<list.length;i++){
        if(Array.isArray(list[i])){
            result = result.concat(reduceArr(list[i]))
        }else{
            result.push(list[i])
        }
    }
    return result
}
console.log(reduceArr(lists))
```

