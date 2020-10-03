# 第十四章-DOM

## 文档对象模型(DOM)的构成

## 节点类型

**Node**是基准节点类型，是文档一个部分的抽象表示，所有其他类型都继承Node

Document 类型表示整个文档，对应树形结构的根节点。在JavaScript中,document对象是Document的实例，拥有查询或获取节点的很多办法

Element 节点表示文档中所有HTML或XML元素，可以用来操作他们的内容和属性

其他节点类型分别表示文本内容、注释、文档类型，CDATA区块和文档片段

DOM 描述了名为Node 的接口，这个接口是所有DOM节点类型必须实现的。Node接口在JavaScript中被实现为Node类型，所有节点类型都继承Node类型，因此所有类型都共享相同的基本属性和方法。

1. 每个节点都要nodeType属性，表示该节点的类型
2. nodeName,nodeValue 保存节点信息。这两个属性的值完全取决于节点类型
3. 节点关系：parentNode,previousSibling,nextSibling,firstChild,lastChild,childNodes
4. 操纵节点:   appendChild(),insertBefore(),replaceChild(),removeChild
5. cloneNode 复制节点   normalize()处理文档子树中的文本节点



**Document**类型是JavaScript中表示文档节点的类型。在浏览器中，文档对象document是HTMLDocument的实例，表示整个HTML页面。

nodeType 为 9

nodeName 为 "#document"

nodeValue 为 null

parentNode 为 null

ownerDocument 为 null

document.documentElement始终指向页面中的html元素

document.body始终指向body元素

document.doctype 访问`<!doctype>`标签

document.title 浏览器窗口标题栏

document.URL

document.referrer(链接到当前页面的那个页面的URL)

document.domain(页面的域名)：domain是可以设置的。如果URL包含子域名如p2p.wrox.com，则可以将domian设置为"wrox.com"，不能给这个属性设置URL中不包含的值。当页面中包含来自某个不同子域的窗格(frame)或内嵌窗格(ifame)时，因为跨源通信存在隐患，所以不同子域的页面无法通过JavaScript通信，此时，在每个页面上把document.domain设置为相同的值，这些页面就可以访问对方的JavaScript对象了，比如，一个加载自 www.wrox.com 的页面中包含一个内嵌窗格，其中的页面加载自
p2p.wrox.com。这两个页面的 document.domain 包含不同的字符串，内部和外部页面相互之间不能
访问对方的 JavaScript 对象。如果每个页面都把 document.domain 设置为 wrox.com，那这两个页面
之间就可以通信  

HTMLCollection对象namedItem()方法可以通过**标签的name属性取得某一项的引用**。

要取得文档中的所有元素，可以给getElementsByTagName()传入*

getElementsByName()会返回具有给定name属性的所有元素

特殊集合:document.anchors包含文档中所有带name属性的a元素，document.form包含文档中所有form元素，document.images包含文档中所有img元素,document.links包含文档中所有带href属性的a元素

document.implementation ：由于DOM有多个leval和多个部分，因此确定浏览器实现了DOM的那些部分是很必要的，可以使用document.implementation来实现，document.implementation上hasFeature()方法，这个方法接收两个参数：特性名称和DOM版本

文档写入：向网页输出流中写入内容，write()，writeln()，open()，close()



**Element**类型表示XML或HTML元素，对外暴露出访问元素标签名、子节点和属性的能力。

nodeType 为 1

nodeName 为 元素的标签名

nodeValue 为 null

parentNode 为 Document 或 Element 对象

HTML元素都有下面的标准属性

id，元素在文档中的唯一标识符

title，包含元素的额外信息，通常以提示条形式展示

lang，元素内容的语言代码

dir，语言的书写方向("ltr"表示从左到右，"rtl"表示从右到左)

className

属性方法:getAttribute() setAttribute() removeAttribute()

attributes 属性：Element类型是唯一使用attributes属性的DOM节点。attributes属性包含一个NamedNodeMap实例，是一个类似NodeList的“实时”集合。元素的每个属性都表示为一个Attr节点，并保存在这个NamedNodeMap对象中。NamedNodeMap对象包含下列方法

getNamedItem(name)，返回nodeName属性等于name的节点

removeNamedItem(name)，删除nodeName属性等于name的节点

setNamedItem(node)，向列表中添加node节点，以其nodeName为索引

item(pos)，返回索引位置pos处的节点

`element.attributes.getNamedItem('id').nodeValue`

创建元素 document.createElement()

**Text**类型包含按字面解释的纯文本，也可能包含转义后的HTML字符，但不包含HTML代码。

nodeType 为 3 

nodeName 为 "#text"

nodeValue 为节点中包含的文本

Text节点中包含的文本可以通过nodeValue属性访问，也可以通过data属性访问，这两个属性包含相同的值。修改nodeValue或data的值，也会在另一个属性反映出来

文本节点操作文本的方法

appendData(text)，向节点末尾添加文本text

deleteData(offset,count)，从位置offset开始删除count个字符

insertData(offset,text)，在位置offset插入text

replaceData(offset,count,text)，用text替换从位置offset到offset+count的文本

splitText(offset)，在位置offset将当前文本节点拆分为两个文本节点

substringData(offset,count)，提取从位置offset到offset+count的文本

**Comment**类型是注释类型

nodeType等于8

nodeName 值为 ’#comment‘

nodeValue值为 注释的内容

parentNode 值为Document或Element对象



## 浏览s器兼容性

## MutationObserver 接口

MutationObserver 接口可以在DOM被修改时异步执行回调。

**基本用法**

MutationObserver的实例要通过调用MutationObserver构造函数并传入一个回调函数来创建

`let observer = new MutationObserver(() => console.log('DOM was mutated'))`

新创建的MutationObserver实例不会关联DOM的任何部分，需要使用observe()方法将要观察的DOM关联起来，`observer.observe(document.body,{attribute:true})`;这时,body元素上的任何属性变化都会被这个MutationObserver实例发现，然后异步执行注册的回调函数。

每个回调函数都会收到一个MutationRecord实例的数组。MutationRecord实例包含的信息包括发生了什么变化，以及DOM的哪一部分受到了影响。如果连续改变会生成多个MutationRecord实例，下次回调执行时就会收到包含所有这些实例的数组，顺序为变化事件发生的顺序。

MutationRecord实例的属性



| 属性               | 说明                                                         |
| ------------------ | ------------------------------------------------------------ |
| target             | 被修改影响的目标节点                                         |
| type               | 字符串，表示变化的类型:"attributes"、"characterData"或"childList" |
| oldValue           | 如果在MutationObserverInit对象中启用(attributeOldValue或characterDataOldValue为true),"attributes"或"characterData"的变化事件会设置这个属性为被替代的值。childList类型的变化始终将这个属性设置为null |
| attributeName      | 对于"attributes"类型的变化，这里保存被修改属性的名字。其他变化事件会将这个属性设置为null |
| attributeNamespace | 对于使用了命名空间的"attributes"类型的变化，这里保存被修改属性的名字。其他变化事件会将这个属性设置为null |
| addedNodes         | 对于"childList"类型的变化，返回包含变化中添加节点的NodeList。默认为空NodeList |
| removedNodes       | 对于"childList"类型的变化，返回包含变化中删除节点的NodeList。默认为空NodeList |
| previousSibling    | 对于"childList"类型的变化，返回变化节点的前一个同胞Node,默认为null |
| nextSibling        | 对于"childList"类型的变化，返回变化节点的后一个同胞Node,默认为null |

传给回调函数的第二个参数是观察变化的MutationObserver的实例。

```
let observer = new MutationObserver((mutationRecords,mutationObserver)=>console.log(mutationRecords,mutationObserver));
observer.observe(document.body,{attribute:true});
document.body.className = 'foo'
```

默认情况下，只要被观察的元素不被垃圾回收，MutationObserver的回调就会响应DOM变化事件，从而被执行。要提前终止执行回调，可以调用disconnect()方法。但因为它是同步方法，所以不仅会停止此后变化事件的回调，也会抛弃已经加入任务队列要异步执行的回调，可以使用setTimeout进行操作。

多次调用observe()方法，可以复用一个MutationObserver对象观察多个不同的目标节点。此时，MutationRecord的target属性可以标识发生变化事件的目标节点。

调用disconnect()并不会结束MutationObserver的生命，还可以重新使用这个观察者，再将它关联到新的目标节点

MutationObserverInit对象用于控制对目标节点的观察范围。观察者可以观察的事件包括属性变化、文本变化和子节点变化。

MutationObserverInit对象的属性

| 属性                  | 说明                                                         |
| --------------------- | ------------------------------------------------------------ |
| subtree               | 布尔值，表示除了目标节点，是否观察目标节点的子树。如果是false，则只观察目标节点的变化；如果是true，则观察目标节点及其整个子树。默认是false |
| attributes            | 布尔值，表示是否观察目标节点的属性变化。默认是false          |
| attributeFilter       | 字符串数组，表示要观察那些属性的变化。把这个值设置为true也会将attributes的值转换为true，默认为观察所有属性 |
| attributeOldValue     | 布尔值，表示MutationRecord是否记录变化之前的属性值。把这个值设置为true也会将attributes的值转换为true。默认为false |
| characterData         | 布尔值，表示修改字符串数据是否触发变化事件                   |
| characterDataOldValue | 布尔值，表示MutationRecord是否记录变化之前的字符数据。把这个值设置为true也会将characterData的值转换为true。默认为false |
| childList             | 布尔值，表示修改目标节点的子节点是否触发变化事件。默认为false |

在调用observe()时，MutationObserverInit对象中的attribute、characterData和childList属性必须至少有一项为true



MutationObserver 接口只是出于性能考虑而设计，其核心是**异步回调与记录队列**模型。为了在大量变化事件发生时而不影响性能，每次变化的信息会保存在MutationRecord实例中，然后添加到记录队列。这个队列对每个MutationObserver实例都是唯一的，是所有DOM变化事件的有序列表。

记录队列

每次MutationRecord被添加到MutationObserver的记录队列时，仅当之前没有排期的微任务回调时(队列中微任务长度为0)，才会将观察者注册的回调作为微任务调度到任务队列上。这样可以保证记录队列的内容不会被回调处理两次。不过在回调的微任务异步执行期间，有可能又发生更多变化事件。因此被调用的回调会接收到一个MutationRecord实例的数组，顺序为他们进入记录队列的顺序。回调要负责处理这个数组的每一个实例，因为函数退出之后这些实现就不存在了。回调执行后，这些MutationRecord就用不着了，因此记录队列会被清空，其内容会被丢弃。

takeRecords()方法

调用MutationObserver实例的takeRecords()方法可以清空记录队列，取出并返回其中的所有MutationRecord实例。



























