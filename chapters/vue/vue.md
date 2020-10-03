每个Vue应用都是通过Vue函数创建一个新的Vue实例开始

```vue
var vm = new Vue({
	//选项
})
```

当一个Vue实例被创建时，它将data对象中的所有的property加入到Vue的响应系统中。当这些property的值发生改变时，视图将会“响应”，即匹配更新为新的值。

Object.freeze() 会阻止修改现有的property，意味着不能响应

除了数据property，Vue实例还暴露了一些有用的实例property与方法。他们都有前缀$，以便与用户定义的property区分开

比如 $data，$el，$watch

生命周期钩子

created 实例被创建之后

Vue.js使用了基于HTML的模板语法，允许开发者声明式的将DOM绑定至顶层Vue实例的数据。所有Vue.js的模板都是合法的HTML，所以能被遵循规范的浏览器和HTML解析器解析

在底层的实现上，Vue将模板编译成虚拟DOM渲染函数。结合响应系统，Vue能够智能地计算出最少需要重新渲染多少组件，并把DOM操作次数减到最少。

v-once指令，能执行一次性地插值，当数据改变时，插值处的内容不会更新。

v-html指令，会输出真正的HTML

双大括号语法叫"Mustache"语法

Mustache语法不能作用在HTML attribute上，遇到这种情况应该使用v-bind指令

`<div v-bind:id="dynamicId"></div>`

属性

Vue提供了一种更通用的方式来观察和响应Vue实例上的数据变动：侦听属性。当你有一些数据需要随着其他数据变动而变动时，会很容易滥用watch---。通常更好的做法是使用计算属性而不是命令式的watch回调。

计算属性默认只有getter，可以在需要时提供一个setter

```vue
computed:{
	fullName:{
		get:function(){
			return this.firstName + ' ' + this.lastName
		},
		set:function(newValue){
			var names = newValue.split(' ');
			this.firstName = names[0];
			this.lastName = names[names.length-1]
		}
	}
}
vm.fullName = 'John Doe'
```

当运行 `vm.fullName = 'John Doe'`,setter会被调用

虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么Vue通过watch选项提供了一个更通用的方法来响应数据的变化，当需要在数据变化时执行异步或开销较大的操作时，这个方式最有用



Class与Style绑定

操作元素的class列表和内联样式是数据绑定的一个常见需求。因为他们都是attribute，所以我们可以用v-bind处理他们：只需要通过表达式计算出字符串结果即可。表达式结果的类型除了字符串之外，还可以是对象或数组。

我们可以传给v-bind:class一个对象，动态的切换class:

`<div v-bind:class="{active:isActive}"></div>`

上面的语法表示active这个class存在与否将取决于数据property isActive的真值

可以在对象中传入更多字段来动态切换多个class，此外,v-bind:class指令也可以与普通的class attribute共存。

```html
<div class = "static" v-bind:class="{active:isActive,'text-danger':hasError}">
    
</div>
```

绑定的数据对象不必内联定义在模板里

```html
<div v-bind:class = 'classObject'>
    
</div>
```

```javascript
data:{
    classObject:{
        active:true,
        'text-danger':false
    }
}
```

也可以在这里绑定一个返回对象的计算属性

```html
<div v-bind:class = 'classObject'>
    
</div>
```

```javascript
data:{
    isActive:true,
    error:null
},
computed:{
	classObject:function(){
		return {
			active:this.isActive && !this.error,
            'text-danger':this.error && this.erro.type === "fatal"
        }
    }
}
```

数组语法

```html
<div v-bind:class="[activeCLass,errorClass]">
</div>
```

```javascript
data:{
    activeClass:'active',
    errorClass:'text-danger'
}
```

如果想根据条件切换列表中的class,可以用三元表达式

```html
<div v-bind:class = "[isActive ? activeClass : '',errorClass]">
    
</div>
```

在数组语法中也可以使用对象语法

```html
<div v-bind:class="[{active:isActive},errorClass]">
    
</div>
```



对象语法

v-bind:style的对象语法十分直观，CSS property名可以用驼峰式或短横线分割来命名

```html
<div v-bind:style="{color:activeColor,fontSize:fontSize+'px'}">
    
</div>
```

```javascript
data:{
	activeColor:'red',
	fontSize:30
}
```

直接绑定在一个样式对象上通常更好

```html
<div v-bind:style="styleObject">
    
</div>
```

```javascript
data:{
    styleObject:{
		color:'red',
        fontSize:30
    }
}
```

v-bind:style的数组语法可以将多个样式对象应用到同一元素上

```html
<div v-bind:style="[baseStyles,overridingStyles]">
    
</div>
```

自动添加前缀

当v-bind:style使用需要添加浏览器引擎前缀的CSS property，如transform，Vue.js会自动侦测并添加相应的前缀

多重值

可以为style绑定中的property提供一个包含多个值的数组，常用于提供多个带前缀的值

```html
<div :style="{display:['-webkit-box','-ms-flexbox','flex']}">
    
</div>
```



条件渲染

v-if 指令用于条件性渲染一块内容。这块内容只会在指令的表达式返回truthy值的时候被渲染

```html
<h1 v-if="awesome">
    Vue is awsome!
</h1>
```

也可以用v-else添加一个"else块"

```html
<h1 v-if="awesome">
    	Vue is awesome!
</h1>
<h1 v-else>
    oh no
</h1>
```

在template元素上使用v-if条件渲染分组

因为v-if是一个指令，所以必须将它添加到一个元素上。但是如果想切换多个元素呢？此时可以把一个template元素当作不可见的包裹元素，并在上面使用v-if。最终的渲染结果将不包含template元素

```html
<template v-if="ok">
	<h1>
        Title
    </h1>
    <p>
        Paragraph 1
    </p>
</template>
```



可以使用v-else指令来表示v-if的"else"块

```html
<div v-if="Math.random() > 0.5">
    Now you see me
</div>
<div v-else>
    Now you don't
</div>
```

v-else元素必须紧跟在带v-if或v-else-if的元素的后面，否则不会被识别



v-else-if

v-else-if顾名思义，充当'v-if'的‘else-if'块，可以连续使用

```html
<div v-if="type === 'A'">
    A
</div>
<div v-else-if="type === B">
    B
</div>
<div v-else>
   	C
</div>
```

用key管理可复用的元素

Vue 会尽可能高效地渲染元素，通常会复用已有元素而不是从头开始渲染。这么做除了使Vue变得非常快之外，还有其他一些好处

允许用户在不同的登陆方式之间切换

```html
<template v-if="loginType === 'username'">
	<label>Username</label>
    <input placeholder="Enter your username">
</template>
<template v-else>
	<label>Email</label>
    <input placeholder = "Enter your email address">
</template>
```

那么在上面的代码中切换loginType将不会清除用户已经输入的内容，因为两个模板使用了相同的元素，input不会被替换掉，仅仅替换它的placeholder。这样也不总是符合实际需求，所以Vue提供了一种方式来表达”这两个元素是完全独立的，不要复用它们“，只需要添加一个具有唯一值的key attribute 即可

现在每次切换时，输入框都将被重新渲染。注意，label元素仍然会被高效地复用，因为他们没有添加key attribute



v-show

另一个用于根据条件展示元素的选项是v-show指令。用法大致一样

```html
<h1 v-show="ok">
    Hello
</h1>
```

v-show不支持template元素，也不支持v-else

v-if  VS v-show

v-if 是真正的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。v-if也是惰性的：如果在初始渲染时条件为假，则什么也不做---直到条件第一次变为真时，才会开始渲染条件

相比之下，v-show就简单的多---不管初始条件是什么，元素总是被渲染，并且只是简单地基于CSS进行切换

一般来说，v-if 有更高的切换开销，而v-show有更高的初始渲染开销。

因此，如果需要非常频繁的切换，则使用v-show较好，如果在运行时条件很少改变，则使用v-if较好

不推荐v-if与v-for一起使用，如果一起使用，v-for具有比v-if更高的优先级



### 列表渲染

用v-for把一个数组对应为一组元素

我们可以用v-for指令基于一个数组来渲染一个列表，v-for指令需要使用item in items 形式的特殊语法，其中items 是源数据数组，而item则是被迭代的数组元素的别名

```html
<ul>
    <li v-for="item in items" :key="item.message">
        {{item.message}}
    </li>
</ul>
```

在v-for块中，我们可以访问所有父作用域的property，v-for还支持一个可选的第二个参数，即当前项的索引

```html
<ul>
    <li v-for="(item,index) in items">
        {{parentMessage}} - {{index}} - {{item.message}}
    </li>
</ul>
```

以可以用of替代in 作为分隔符

```html
<div v-for="item of items"></div>
```



在 v-for里使用对象

可以用v-for来遍历一个对象的property

```html
<ul>
    <li v-for=“value in object">
        {{value}}
    </li>
</ul>
```

也可以提供第二个参数为property名称

```html
<div v-for="(value,name) in object">
    {{name}}:{{value}}
</div>
```



当Vue正在更新使用v-for渲染的元素列表时，它默认使用“就地更新”的策略，如果数据项的顺序被改变，Vue将不会移动DOM元素来匹配数据项的顺序，而是就地更新每个元素，并且确保他们在每个索引位置正确渲染。这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时DOM（例如：表单输入值）的列表渲染输出。为了给Vue一个提示，以便他能跟踪每个节点的身份，从而重用和重新排序现有元素，我们可以为每项提供一个唯一 key attribute

建议尽可能在使用v-for时提供key attribute，除非遍历输出的DOM内容非常简单，或者是可以依赖默认行为以获取性能上的提升

因为它是Vue识别节点的一个通用机制,key并不仅与v-for特别关联。

数组更新检测

变更方法

Vue将被侦听的数组的变更方法进行了包裹，所以他们也将会触发视图更新。这些被包裹过的方法包括：

* push()
* pop()
* shift()
* unshift()
* splice()
* sort()
* reverse()

替换数组

变更方法，会变更调用了这些方法的原始数组。相比之下，也有非变更方法。例如filter()、concat()和slice()，他们不会变更原始数组，而总是返回一个新数组。当使用非变更方法时，可以用新数组替换旧数组。

```javascript
example1.items = example1.items.filter(function(item){
    return item.message.match(/Foo/)
})
```

你可能认为这将导致Vue丢弃现有DOM并重新渲染整个列表，幸运的是，事实并非如此，Vue为了使得DOM元素得到最大范围的重用而实现了一些智能的启发式方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作

显示过滤/排序后的结果

有时，我们想要显示一个数组经过过滤或排序后的版本，而不实际变更或重置原始数据，在这种情况下，可以创建一个计算属性，来返回过滤或排序后的数组。

```html
<li v-for="n in eventNumbers">{{n}}</li>
```

```javascript
data:{
    numbers:[1,2,3,4,5]
},
computed:{
	eventNumbers:function(){
        return this.numbers.filter(function(number){
			return number%2 === 0
        })
    }
}
```

在计算属性不适用的情况下(例如，在嵌套v-for循环中)可以使用一个方法

```html
<ul v-for="set in sets">
    <li v-for="n in even(set)">{{n}}</li>
</ul>
```

```javascript
data:{
    sets:[[1,2,3,3,4],[6,7,8,9,10]]
},
methods:{
    even:function(numbers){
        return numbers.filter(function(number){
            return number % 2 === 0
        })
    }
}
```

v-for也可以接受整数，在这种情况下，它会把模板重复对应次数

```html
<div>
    <span v-for="n in 10">{{n}}</span>
</div>
```

在template上使用v-for

类似于v-if ，可以利用带有v-for的template来循环一段包含多个元素的内容

```html
<ul>
    <template v-for="item in items">
        <li>{{item.msg}}</li>
        <li class="divider" role="presentation"></li>
    </template>
</ul>
```

v-for和v-if一同使用

当我们处于同一节点，v-for的优先级比v-if更高，这意味着v-if将分别重复运行于每个v-for循环中。当你只想为部分项渲染节点时，这种优先级的机制会十分有用

```html
<li v-for="todo in todos" v-if="!todo.isComplete">
    {{todo}}
</li>
```

上面的代码将只渲染未完成的todo

而如果你的目的是有条件地跳过循环的执行，那么可以将v-if置于外层元素(或)



事件处理

监听事件

可以用v-on指令监听DOM事件，并在触发时运行一些JavaScript代码

事件处理方法

然而很多事件处理逻辑会更为复杂，所以直接把JavaScript代码写在v-on指令中是不可行的。因此v-on还可以接收一个需要调用的方法名称

内联处理器中的方法

除了直接绑定到一个方法，也可以在内联JavaScript语句中调用方法

有时也需要在内联语句处理器中访问原始的DOM事件，可以用特殊变量$event把它传入方法

事件修饰符

在事件处理程序中调用event.preventDefault()或event.stopPropagation()是非常常见的需求。尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理DOM事件细节。为了解决这个问题，Vue.js为v-on提供了事件修饰符。之前提过，修饰符是由点开头的指令后缀来表示的

.stop

.prevent

.capture

.self

.once

.passive

```html
阻止单击事件继续传播
<a v-on:click.stop="doThis"></a>
提交事件不再重载页面
<form v-on:submit.prevent="onSubmit">
    
</form>
修饰符可以串联
<a v-on:click.stop.prevent="doThat"></a>
只有修饰符
<form v-on:submit.prevent>
    
</form>
添加事件监听器时使用事件捕获模式
即内部元素触发的事件先在此处理，然后才交由内部元素进行处理
<div v-on:click.capture="doThis">
    
</div>
只当在event.target是当前元素自身时触发处理函数
即事件不是从内部元素触发的
<div v-on:click.self="doThat">
    
</div>
点击事件将只会触发一次
<a v-on:click.once="doThis"></a>
不像其他只能对原生的DOM事件起作用的修饰符，.once修饰符还能被用到自定义的组件事件上

Vue还对应addEventListener中的passive选项提供了.passive修饰符
滚动事件的默认行为将会立即触发
而不会等待onScroll完成
这其中包含event.preventDefault()的情况
<div v-on:scroll.passive="onScroll">
    
</div>
这个.passive修饰符能提升移动端的性能
不要把.passive和.prevent一起使用，因为.prevent将会被忽略，同时浏览器可能会向你展示一个警告，
```

使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生，因此，用v-on:click.prevent.self会阻止所有的点击。而v-on:click.self.prevent只会阻止对元素自身的点击

按键修饰符

在监听键盘事件时，我们经常需要检查详细的按键。Vue允许为v-on在监听键盘事件时添加按键修饰符

```html
只有在'key'是'Enter'时调用'vm.submit()'
<input v-on:keyup.enter="submit">
```

也可以直接将KeyboardEvent.key暴露的任意有效按键名转换为kebab-case 来作为修饰符

```html
<input v-on:keyup.page-down="onPageDown">
```

在上述实例中，处理函数只会在$event.key等于PageDown时被调用

系统修饰键

可以用如下修饰符来实现仅在按下相应按键时才触发鼠标或键盘事件的监听器

.ctrl

.alt

.shift

.meta

.exact修饰符

.exact修饰符允许你控制由精确的系统修饰符组合触发的事件

```html
即使alt或shift被一同按下时也会触发
<button v-on:click.ctrl="onClick">
    a
</button>
有且只有Ctrl被按下的时候才触发
<button v-on:click.ctrl.exact="onCtrlClick">
    A
</button>
没有任何系统修饰符被按下的时候才触发
<button v-on:click.exact="onClick">
    A
</button>
```

鼠标按钮修饰符

.left

.right

.middle

为什么在HTML中监听事件？

你可能注意到这种事件监听的方式违背了关注点分离这个长期以来的优良传统。但不必担心，因为所有vue.js事件处理方法和表达式都严格绑定在当前视图的ViewModel上，它不会导致任何维护上的困难。实际上，使用v-on有几个好处

1. 扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法
2. 因为你无须在 JavaScript 里手动绑定事件，你的ViewModel 代码可以是非常纯粹的逻辑，和DOM完全解耦，更易于测试
3. 当一个 ViewModel 被销魂时，所有的事件处理器都会自动被删除。你无须担心如何清理他们



表单输入绑定

基础用法

你可以用v-model指令在表单input、textarea及select元素上创建双向数据绑定，他会根据控件类型自动选取正确的方法来更新元素。尽管有些神奇，但v-modal本质上不过是语法糖，它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。

v-modal会忽略所有表单元素的value、checked、selected attribute的初始值而总是将Vue实例的数据作为数据来源，应该通过JavaScript在组件的data选项中声明初始值。

v-modal在内部为不同的输入元素使用不同的property并抛出不同的事件：

* text和textarea元素使用value property 和 input事件
* checkbox和radio使用checked property 和 change事件
* select字段将value作为prop并将change作为事件

对于需要使用输入法的语言，会发现v-modal不会再输入法组合文字过程中得到更新。如果想处理这个过程，使用input事件

文本

```html
<input v-model="message" placeholder="edit me">
<p>
    Message is : {{message}}
</p>
```

多行文本

```html
<span>Multiline message is : </span>
<p style="white-space:pre-line">
    {{message}}
</p>
<textarea v-modal="message" placeholder="add multiple lines"></textarea>
```

复选框

单个复选框，绑定到布尔值

```html
<input type="checkbox" id="checkbox" v-modal="checked">
<label for="checkbox">{{checked}}</label>
```

值绑定

对于单选按钮，复选框及选择框的选项，v-model绑定的值通常是静态字符串(对于复选框也可以是布尔值)

```html
当选中时,picked为字符串'a'
<input type="radio" v-model="picked" value="a">
toggle为true为false
<input type="checkbox" v-model="toggle">
当选中第一个选项时，selected为字符串abc
<select v-model="selected">
    <option value="abc">ABC</option>
</select>
```

但是有时我们可能想把值绑定到Vue实例的一个动态property上，这是可以用v-bind实现，并且这个property的值可以不是字符串

```html
<input
       type="checkbox"
       v-model="toggle"
       true-value="yes"
       false-value="no"
>
```

这里的true-value和false-value attribute并不会影响输入控件的value attribute，因为浏览器再提交表单时并不会包含未被选中的复选框。如果要确保表单中这两个值中的一个能够被提交，即'yes'或'no',请换用单选按钮



修饰符

.lazy

在默认情况下，v-model在每次input事件触发后将输入框的值与数据进行同步（除了输入法组合文字）。你可以添加lazy修饰符，从而转为在change事件之后进行同步

```html
<input v-model.lazy="msg">
```

.number

如果想自动将用户的输入值转为数值类型，可以给v-model添加number修饰符

```html
<input v-model.number="age" type="number">
```

这通常很有用，因为即使在type="number"时,HTML输入元素的值也总会返回字符串。如果这个值无法被parseFloat()解析，则会返回原始的值。

.trim

如果要自动过滤用户输入的首尾空白字符，可以给v-model添加trim修饰符

```html
<input v-model.trim="msg">
```



组件基础

```html
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```

组件是可复用的Vue实例，且带有一个名字：在这个例子中是button-counter

我们可以在一个通过new Vue创建的Vue实例中，把这个组件作为自定义元素来使用

```html
<div id="components-demo">
    <button-counter></button-counter>
</div>
```

```javascript
new Vue({el:'#components-demo'})
```

因为组件是复用的Vue实例，所以它们与new Vue接受相同的选项，例如data、computed、watch、methods以及生命周期钩子等。

组件的复用

可以将组件进行任意次数的复用

```html
<div id="components-demo">
    <button-counter></button-counter>
    <button-counter></button-counter>
    <button-counter></button-counter>
</div>
```

注意点击按钮时，每个组件都会各自独立维护它的count，因为你没用一次组件，就会有一个它的新实例被创建



data 必须是一个函数

当我们定义这个button-counter组件时，你可能会发现它的data并不是像这样直接提供一个对象

```javascript
data : {
    count:0
}
```

取而代之的是，一个组件的data选项必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝

```javascript
data:function(){
    return {
        count:0
    }
}
```



组件的组织

通常一个应用会一棵嵌套的组件树的形式来组织

例如，你可能会有页头、侧边栏、内容区等组件，每个组件又包含了其他的像导航链接、博文之类的组件

为了能在模板中使用，这些组件必须先注册以便Vue能够识别。这里有两种组件的注册类型：全局注册和局部注册。至此，我们的组件都只是通过Vue.component全局注册的

```javascript
Vue.component('my-component-name',{
    
})
```

全局注册的组件可以用在其被注册之后的任何（通过 new Vue）新创建的Vue实例，也包括其组件树中的所有子组件的模板中

通过prop向子组件传递数据

早先时候，我们提到了创建一个博文组件的问题。问题是如果你不能向这个组件传递某一篇博文的标题或内容之类的我们想展示的数据的话，它是没有办法使用的。这也是prop的由来

prop是你可以在组件上注册的一些自定义的attribute。当一个值传递给一个prop attribute的时候，它就变成了那个组件实例的一个property。为了给博文组件传递一个标题，我们可以用一个props选项将其包含在该组件可接受的prop列表中

```javascript
Vue.component('blog-post',{
    props:['title'],
    template:'<h3>{{title}}</h3>'
})
```

一个组件默认可以拥有任意数量的prop，任何值都可以传递给任何prop。在上述模板中，你会发现我们能够在组件实例中访问这个值，就像访问data中的值一样。

一个prop被注册之后，你就可以像这样把数据作为一个自定义attribute传递进来

```html
<blog-post title="My journey with Vue"></blog-post>
```

然而在一个典型的应用里，你可能在data里有一个博文的数组

```javascript
new Vue({
    el:'#blog-post-demo',
    data:{
        posts:[
            {id:1,title:'My journey with Vue'},
            {id:2,title:'Blogging wite vue'},
            {id:3,title:'Why Vue is so fun'}
        ]
    }
})
```

```html
<blog-post v-for="post in posts" v-bind:key="post.id" v-bind:title="post.title">

</blog-post>
```

如上所示，你会发现我们可以使用v-bind来动态传递prop。这在你一开始不清楚要渲染的具体内容，比如从一个API获取博文列表的时候，是非常有的



单个根元素

当构建一个blog-post组件时，你的模板最终会包含的东西远不止一个标题

当组件变得越来越复杂的时候，我们的博文不只需要标题和内容，还需要发布日期、评论等等。为每个相关的信息定义一个prop会变得很麻烦

重构blog-post组件，让它接受一个单独的post prop:

```html
<blog-post
     v-for="post in posts"
     v-bind:key="post.id"
     v-bind:post="post"
           >

</blog-post>
```

```javascript
Vue.component('blog-post',{
    props:['post'],
    template:'
    	<div class="blog-post">
    		<h3>{{post.title}}</h3>
            <div v-html="post.content"></div>
    	</div>
    '
})
```



监听子组件事件

在我们开发blog-post组件时，他的一些功能可能要求我们和父级组件进行沟通。例如我们可能会引入一个辅助功能来放大博文的字号，同时让页面的其他部分保持默认的字号

在其父组件中，我们可以通过添加一个postFontSize数据property来支持这个功能

```javascript
new Vue({
    el:'#blog-posts-events-demo',
    data:{
        post:[],
        postFontSize:1
    }
})
```

使用事件抛出一个值

有的时候用一个事件来抛出一个特定的值是非常有用的，例如我们可能想然blog-post组件决定他的文本要放大多少，这时可以使用$emit的第二个参数来提供这个值

```html
<button v-on:click="$emit('enlarge-text',0.1)">
    Enlarge text
</button>
```

在组件上使用v-model

自定义事件也可以用于创建支持的v-model的自定义输入组件

```html
<input v-model="searchText">
//等价于
<input v-bind:value="searchText" v-on:input="searchText=$event.target.value">
```



