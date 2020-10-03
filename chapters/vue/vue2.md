# Vue.js

**计算属性 computed**

对于任何复制逻辑，都应当使用计算属性

计算属性是基于他们的响应式依赖进行缓存的。只有在相关响应式依赖发生改变时他们才会重新求值。这就意味着只要message还没有发生改变，多次访问reversedMessage计算属性会立即返回之前的计算结果，而不必再次执行函数。

Vue 提供了一种通用的方式来观察和响应Vue实例上的数据变动：侦听属性。

计算属性默认只用getter，不过可以在需要时提供一个setter

```javascript
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
```

现在在运行`vm.fullName='John Doe'`时，setter会被调用，vm.firstName和vm.lastName也会被相应地更新

**侦听器-watch**

虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。当需要在数据变化时执行异步或开销比较大的操作时，这个方式是最有用的。

**事件**

在内联语句处理器中访问原始的DOM事件，可以用特殊变量$event把它传入方法

```html
<button v-on:click="warn('Form',$event)">
    Submit
</button>
```



**组件**

全局注册

```javascript
Vue.component('my-component-name',{
    
})
```

局部注册

```javascript
var ComponentA = {...}
var ComponentB = {...}
var ComponentC = {...}
new Vue({
      el:'#app',
      component:{
                  'component-a':ComponentA,
                  'component-b':ComponentB
                 }
})
```

为了解决这个问题，Vue提供了一个$listeners property，它是一个对象，里面包含了作用在这个组件上的所有监听器。

```javascript
{
    focus:function(event){}
    input:function(value){}
}
```

有了这个$listeners property，你就可以配合v-on="$listeners"将所有的事件监听器指向这个组件的某个特定的子元素。对于类似input的你希望它也可以配合v-model工作的组件来说，为这些监听器创建一个类似下述inputListeners的计算属性非常有用

```javascript
Vue.component('base-input',{
    inheritAttrs:false,
    props:['label','value'],
    computed:{
        inputListeners:function(){
            var vm = this
            return Object.assign({},this.$listeners,{
                input:function(event){
                    vm.$emit('input',event.target.value)
                }
            })
        }
    },
    template:`
	<label>
		{{label}}
		<input
			v-bind='$attrs'
			v-bind:value="value"
			v-on="inputListeners"
>
</label>
`
})
```

这也是我们推荐以`update:myPropName `的模式触发事件取而代之。在一个包含title prop 的假设的组件中，我们可以用以下方法表达对这其赋新值的意图

```javascript
this.$emit('update:title',newTitle)
```



当点击这个按钮时，我们需要告诉父级组件放大所有博文的问二八年。Vue实例提供了一个自定义事件的系统来解决这个问题。父级组件可以像处理native DOM 事件一样通过v-on监听子组件实例的任意事件

```
<blog-post
	v-on:enlarge-text="postFontSize+=0.1"
></blog-post>
```

同时子组件可以通过内建的$emit方法并传入事件名称来触发一个事件

```html
<button v-on:click="$emit('enlarge-text')">
    Enlarge text
</button>
```

使用事件抛出一个值

有的时候用一个事件来抛出一个特定的值是非常有用的。例如我们可能想让blog-post组件决定他的文本要放大多少。这是可以使用$emit的第二个参数来提供这些值

```html
<button v-on:click="$emit('enlarge-text',0.1)">
    Enlarge text
</button>
```

然后在父组件监听这个事件时候，通过$event来访问被抛出的值

```html
<blog-post
           v-on:enlarge-text="postFontSize+=$event"
           >
</blog-post>
```

