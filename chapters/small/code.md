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

函数节流指阻止一个函数在短时间内被连续调用。只有当上一次函数执行后达到指定的时间间隔后，才能被再次调用

原理：使用定时器做时间节流。当触发一个事件时，先用setTimeout让这个事件延迟一小段时间后再执行，如果该事件在这个时间间隔中被再次触发，就clearTime上一个定时器，在setTimeout一个新的定时器重复以上的步骤。

```javascript
function throttle(func,delay){
    let timer;
    return function(...args){
        if(timer){
            clearTimeout(timer)
        }
        timer = setTimeout(()=>{
            func.apply(this,args)
        },delay)
    }
}
```



可以使用节流优化图片懒加载

## 手写 bind函数

## 利用apply函数实现bind函数

```javascript
Function.prototype._bind = function(target){
    let _this = this;
    let args = Array.prototype.slice.call(arguments,1);
    //let args = Array.from(arguments)
    //args.shift();
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



## 找出一个数组中出现次数最多的元素

```javascript
let arr = [];
for(var i=0;i<1000;i++){
    arr[i] = parseInt(Math.random()*1000)
}
function findMore(arr){
    let num = null; //存储出现次数最多的元素
    let max = 1; //存储次数
    arr.reduce((p,k)=>{
        p[k]?p[k]++:p[k]=1;
        if(p[k]>max){
            max = p[k];
            num = k
        }
        return p;
    },{})
    return num
}
console.log(findMore(arr))
```

实现一个函数clone，可以对JavaScript中的5种主要的数据类型（包括Number、String、Object、Array、Boolean）进行值复制

```javascript
Object.prototype.clone = function(){
    var o = this.instanceof === 'Array'?[]:{};
    for(var e in this){
        o[e] = typeof this[e] === 'object' ? this[e].clone() : this[e]
    }
    return o
}
```

## 获取以s或p开头的标签

使用递归

```javascript
function dfs(node){
    if(node.nodeType === 1){
		let nodeName = node.nodeName.slice(0,1);
        if(nodeName === 'S' || nodeName === 'P'){
			console.log(node)
        }
        let children = node.childNodes;
        for(let i=0,len=children.length;i<len;i++){
			dfs(children[i])
        }
    }
}
dfs(document.body)
```

## 判断 [] 和 null 

1. instanceof

   ```javascript
   console.log([] instanceof Object);//true
   console.log(null instanceof Object);//false
   ```

2. !!

   ```javascript
   !!null ;//false
   !![] ;//true
   ```

3. Object.prototype.toString.call()

   ```javascript
   Object.prototype.toString.call(null) ;// [Object Null]
   Object.prototype.toString.call([])   ;// [Object Array]
   ```


## 超出省略

```css
.overflow{
    width:200px;
    overflow:hidden;
    white-space:nowrap;
    text-overflow:ellipsis
}
```

