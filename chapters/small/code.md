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

## 手写 bind函数

## 利用apply函数实现bind函数

## 创建10个a标签，点击的时候弹出对应的序号

## new的过程



