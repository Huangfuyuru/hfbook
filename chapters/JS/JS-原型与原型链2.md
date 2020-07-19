# JS-原型与原型链2

1. 我们创建的每个函数都有一个prototype属性，这个属性是一个指针，指向一个对象，而这个对象的用途是**包含**可以由特定类型的**所有实例共享的属性和方法**。换句话说，不必在构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型对象中。

2. 所有原型对象prototype都会获得一个constructor(构造函数)属性,这个属性指向原型对象prototype**所在函数**。`Person.prototype.constructor = Person`

3. 当调用构造函数创建一个实例后，实例的内部包含一个`__proto__`属性，它指向构造函数的原型对象。

4. 原型的动态性，由于在原型中查找值的过程是一次搜索，因此我们对原型对象所做的任何修改都能够立即从实例上反映出来---即使是先创建了实例后再修改原型也是如此。

5. 通过原生对象的原型，不仅可以取得所有默认方法的引用，而且也可以定义新方法。可以添加方法，例如给基本包装器类型String添加要给名为startsWith()的方法

   ```javascript
   String.prototype.startsWith = function(text){
   	return this.indexOf(text) == 0
   }
   let txt = 'Hello world'
   alert(txt.startsWith('Hello')) //'true'
   ```

6. 组合使用构造函数模式和原型模式。构造函数模式用于定义实例属性，原型模式用于定义方法和共享的属性。每个实例都会有自己的一份实例属性的副本，但同时又共享着对方法的引用。

   ```javascript
   function Person(name,age){
       this.name = name;
       this.age = age
   }
   Person.prototype.sayName = function(){
       alert(this.name)
   }
   
   ```

7. 动态原型模式(都写在了一起)

   ```javascript
   function Person(name,age){
   	this.name = name;
   	this.age = age;
       //只有在sayName()方法不存在的情况下，才会将它添加到原型中。
       //这段代码只有在初次调用构造函数时才会执行，此后，原型已经完成初始化，不需要再做什     //么修改了
   	if(typeof this.sayName != 'function'){
   		Person.prototype.sayName = function(){
   			alert(this.name)
   		}
   	}
   }
   ```



原型链

利用原型让一个引用类型继承另一个引用类型的属性和方法。

构造函数、原型、实例三者的关系：

1. 每个构造函数都有一个原型对象。
2. 每个原型对象的constructor属性指向构造函数
3. 每个实例都有一个`__proto__`指针指向原型对象



让原型对象等于另一个类型的实例

原来存在于Father实例中的所有属性和方法，现在也存在于Son.prototype中，其实是重写了Son的原型

```javascript
function Father(){
    this.fatherName = 'zhangsan'
}
Father.prototype.sayFather = function(){
    return this.fatherName
}

function Son(){
    this.sonName = 'lisi'
}
Son.prototype = new Father();
Son.prototype.saySon = function(){
    return this.this.sonName
}
var son1 = new Son();
alert(son1.sayFather())
```

