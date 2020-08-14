# 原型和原型链

#### 原型

我们创建的每个函数都有一个`prototype`属性，这个属性指向一个对象(我们所说的原型对象)。这个对象上的方法和属性可以被由当前构造函数生成的实例所共享。这个对象就会取得`constructor`属性，至于其他方法，则都是从`Object`继承而来的。

由该构造函数生成的实例，这个实例中的`__proto__`属性，指向一个对象，这个对象是构造函数的原型对象，也就是`Person.prototype`

`isPrototypeOf()`方法用于测试一个对象是否存在于另一个对象的原型链上。**可以方便地取得一个对象的原型**

`Person.prototype.isPrototypeOf(person1)`

`Object.getPrototypeOf()`返回`__proto__`的值

`Object.getPrototypeOf(person1) == Person.prototype`

`Object.getPrototypeOf(person1).name`

每当代码读取某个对象的某个属性时，会先从对象实例本身开始搜索，如果找到了具有给定名字的属性，则返回该属性的值；如果没有找到，则继续搜索指针指向的原型对象，在原型对象中查找具有给定名字的属性。

**hasOwnProperty()**方法可以检测一个属性是存在于实例中，还是存在于原型中。但是不能判断不管实例还是原型中是否存在这个属性。因为当实例中不存在这个属性时返回的是false,我们不知道原型中是否存在不存在

`person1.hasOwnProperty("name")`



原型与in操作符

1.单独使用 in 

判断该属性是否在对象中，无论该属性是在实例中还是在实例中。

同时使用hasOwnProperty() 方法和 in 操作符，可以确定该属性是在对象中，还是在原型中，还是不存在。

```javascript
function hasPrototypeProperty(object,name){
    return !object.hasOwnProperty(name) && (name in object)
}
```

当hasOwnProperty() 返回 false ，in 返回true ，就可以判断该属性存在原型中

2.for-in循环

返回的是所有能够通过对象访问的、可枚举属性，其中包括存在于实例中的属性，也包括存在于原型中的属性。

如果想取得对象上所有可枚举的实例属性，可以用`Object.keys()`方法。这个方法接受一个对象作为参数，返回一个包含所有可枚举属性的字符串数组。

如果想取得对象上所有实例属性，不管是否可枚举，可以使用`Object.getOwnPropertyNames()`



所有的原生引用类型(Object,Array,String等)都在其构造函数的原型上定义了方法。在`Array.prototype`中可以找到`sort()`方法,在`String.prototype`中可以找到`substring()`方法。

通过原生对象的原型，不仅可以取得所有默认方法的引用，而且也可以定义新方法。可以像修改自己定义对象的原型一样修改原生对象的原型，因此可以随时添加新方法。例如，给基本包装类型String添加了一个名为`startsWidth()`方法

```javascript
String.prototype.startsWidth = function(str){
    return this.indexOf(str) == 0
}
let msg = 'Hello world';
console.log(msg.startsWidth(‘Hello;))
```



继承主要依靠原型链实现

基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。

**原型链的构建是通过将一个类型的实例赋值给另一个构造函数的原型实现的，子类型就能够访问超类型的所有属性和方法**

构造函数、原型和实例的关系：

每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针。而实例都包含一个指向原型对象的指针。那么，我们假如让原型对象等于另一个类型的实例，此时的原型对象将包含一个指向另一个原型的指针。

在原型链实现的情况下，在配合原型搜索机制，搜索过程就可以沿着原型链继续向上

###### 默认的原型

所有引用类型都默认继承了object,而这个继承也是通过原型链实现的。所有函数的默认原型都是object的实例，因此默认原型都会包含一个内部指针，指向Object.prototype。这也是自定义类型都会继承toString() valueOf()等默认方法的根本原型。

###### 确定原型和实例的关系

1. instanceof 操作符 这样这个原型在这个实例的原型链中就会返回true

   `ins instanceof SubType`

2. isPrototypeOf() 只要是原型链中出现过的原型，都可以说是该原型链所派生的实例的原型

   `Object.prototype.isPrototypeOf(ins)`

   `SubType.prototype.isPrototypeOf(ins)`

##### 实现继承的方法

###### 组合继承

```javascript
function SuperType(name){
	this.name = name;
	this.colors = ['red','blue','green']
}
SuperType.prototype.sayName = function(){
	console.log(this.name)
}
function SubType(name,age){
	SuperType.call(this,name);//借用构造函数实现继承实际上不是继承了name和color属性，而是在SubType中设置了一个name和color
	this.age = age
}
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;
var ins = new SubType();
var ins2 = new SubType();
ins.colors.push('pink');
console.log(ins2.colors);//['red','blue','green']
console.log(ins.name)
```



###### 寄生组合继承

组合继承很常用，但是他的问题是无论在什么情况下，都会调用两次父类型构造函数。一次是在创建子类型原型时，一次是在子类型构造函数内部。也就是说子类型最终会包含父类型的全部实例属性。

寄生组合式继承通过借用构造函数来继承属性，通过原型链的混成形式来继承方法。基本思路：不必为了指定子类型的原型而调用父类型的构造函数，我们所需要的无非就是超类型原型的一个副本而已

```javascript
function inheritPrototype(subType,superType){
    var prototype = Object.create(superType.prototype);
    prototype.constructor = subType;
    subType.prototype = prototype
}
```

```javascript
function SuperType(name){
    this.name = name;
    this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function(){
	alert(this.name);
};
function SubType(name, age){
    SuperType.call(this, name);
    this.age = age;
}
inheritPrototype(SubType, SuperType);
SubType.prototype.sayAge = function(){
	alert(this.age);
};
```

