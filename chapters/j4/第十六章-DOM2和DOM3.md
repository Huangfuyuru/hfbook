# DOM2和DOM3

DOM2和DOM3是按照模块化思路来制定标准的，每个模块之间有一定关联，但分别针对某个DOM子集。

* DOM Core：在DOM1核心部分的基础上，为节点增加方法和属性
* DOM Views：定义基于样式信息的不同视图
* DOM Events：定义通过事件实现DOM文档交互 第十七章
* DOM Style：定义以编程方式访问和修改CSS样式的接口
* DOM Traversal and Range：新增遍历DOM文档及选择文档内容的接口
* DOM HTML：在DOM1 HTML部分的基础上，增加属性、方法和新接口
* DOM Mutation Observers：定义基于DOM变化触发回调的接口 第十四章

**XML命名空间**

XML 命名空间可以实现在一个格式规范的文档中混用不同的XML语言，而不必担心元素命名冲突。

命名空间是使用xmlns指定的。XHTML的命名空间是"http://www.w3.org/1999/xhtml"，该包含在任何格式规范的XHTML页面的html元素中，如下

```xhtml
<html xmlns = "http://www.w3.org/1999/xhtml">
	<head>
        <title>Example</title>
    </head>
    <body>
        Hello world!
    </body>
</html>
```

上面所有元素都默认属于XHTML命名空间，可以使用xmlns给命名空间创建一个前缀，格式为"xmlns:前缀"

```xhtml
<xhtml:html xmlns:xhtml = "http://www.w3.org/1999/xhtml">
	<xhtml:head>
        <xhtml:title>Example</xhtml:title>
    </xhtml:head>
    <xhtml:body>
        Hello world!
    </xhtml:body>xhtml:body>
</xhtml:html>
```

如果文档中只使用一种XML语言，那么命名空间前缀是多余的，只有一个文档混合使用多种XML语言时才有必要。比如使用了XHTML和SVG两种语言。对于这样的文档，如果调用某个方法与节点交互，就会出现问题，比如创建一个新元素，这个元素属于哪个命名空间？查询特定标签名时，结果中应该包含哪个命名空间下的元素？

在DOM2中，**Node类型**包含一下特定于命名空间的属性：

* localName，不包含命名空间前缀的节点名
* namespaceURI，节点的命名空间URI，如果未指定则为null
* prefix，命名空间前缀，如果未指定则为null

在节点使用命名空间前缀的情况下，nodeName等于prefix+":"+localName

在DOM3中，又增加了命名空间相关的方法

* isDefaultNamespace(namespaceURI)，返回布尔值，表示namespaceURI是否为节点的默认命名空间
* lookupNamespaceURI(prefix)，返回给定prefix的命名空间URI
* lookupPrefix(namespaceURI)，返回给定namespaceURI的前缀

在DOM2中，**Document类型**新增了下面的方法

* createElementNS(namespaceURI,tagName)，以给定的标签名tagName创建指定命名空间namespaceURI的一个新元素
* createAttributeNS(namespaceURI,attributeName)，以给定的属性名attributeName创建指定命名空间namespaceURI的一个新属性
* getElementsByTagNameNS(namespaceURI,tagName)，返回指定命名空间namespaceURI中所有标签名为tagName的元素的NodeList

DOM2对**Element类型**的更新

* getAttributeNS(namespaceURI,localName)，取得指定命名空间namespaceURI中名为localName的属性
* getAttributeNodeNS(namespaceURI,localName)，取得指定命名空间namespaceURI中名为localName的属性节点
* getElementsByTagNameNS(namespaceURI,tagName)，取得指定命名空间namespaceURI中标签名为tagName的元素的NodeList
* hasAttributeNS(namespaceURI,localName)，返回布尔值，表示元素中是否有命名空间namespaceURI下名为localName的属性
* removeAttributeNS(namespaceURI,localName)，删除指定命名空间namespaceURI中名为localName的属性
* setAttributeNS(namespaceURI,qualifiedName,value)，设置指定命名空间namespaceURI中名为qualifiedName的属性为value
* setAttributeNodeNS(attNode)，为元素设置（添加）包含命名空间信息的属性节点attNode。

NamedNodeMap也增加了处理命名空间的方法，因为NamedNodeMap主要表示属性，所以这些方法大都适用于属性

* getNamedItemNS(namespaceURI,localName)，取得指定命名空间namespaceURI中名为localName的项
* removeNamedItemNS(namespaceURI,localName)，删除指定命名空间namespaceURI中名为localName的项
* setNamedItemNS(node)，为元素设置（添加）包含命名空间信息的节点

下面的内容与XML命名空间无关，主要关注DOM API的完整性和可靠性

DocumentType新增了三个属性:publicId,systemId和internalSubset。

publicId、systemId属性表示文档类型声明中有效但无法使用DOM1 API访问的数据。

importNode()方法，它的目的是从其他文档获取一个节点并导入到新文档，以便将其插入新文档。每个节点都有一个ownerDocument属性，表示所属文档。如果调用appendChild()方法时传入节点的ownerDocument不是指向当前文档，则会发生错误。而调用importNode()导入其他文档的节点会返回一个新节点，这个新节点的ownerDocument属性是正确的。

importNode()方法跟cloneNode()类似，接收两个参数：要复制的节点和表示是否同时复制子树的布尔值，返回结果是适合在当前文档中使用的新节点

DOM2 View 给Document类型增加了新属性defaultView，是一个指向拥有当前文档的窗口（或窗格frame）的指针,IE8及更早版本支持等价的parentWindow属性。因此要确定拥有文档的窗口，可以使用以下代码
`let parentWindow = document.defalutView || document.parentWindow`

除了上面这一个方法和一个属性，DOM2 Core还针对document.implementation对象增加了createDocumentType()和createDocument()。createDocumentType()用于创建DocumentType类型的新节点，接收3个参数：文档类型名称、publicId和systemId。createDocument()用于创建新文档，接收3个参数：文档元素namespaceURI，文档元素的标签名和文档类型

DOM3给**Node类型**新增了两个用于比较节点的方法：isSameNode()和isEqualNode()。isSameNode()用于比较节点相同，引用同一个对象；isEqualNode()用于比较节点相等，意味着节点类型相同，拥有相同的属性(nodeName,nodeValue)，而且attributes和childNodes也相等。

DOM3也增加了给DOM节点附加额外数据的方法-setUserData()，接收3个参数：键、值、处理函数，用于给节点追加数据。

`document.body.setUserData("name","Nicholas",function(){})`

然后，可以通过相同的键再取得这个信息

`let value = document.body.getUserData("name")`

setUserData()的处理函数会在包含数据的节点被复制、删除、重命名或导入其他文档的时候执行，可以在这个时候决定如何处理用户数据。处理函数接收5个参数：表示操作类型的数值(1代表复制，2代表导入，3代表删除，4代表重命名)、数据的键、数据的值、源节点和目标节点。删除节点时，源节点为null；除复制节点外，目标节点都为null

内嵌窗格的变化

iframe新增了一个contentDocument属性，这个属性包含代表子内嵌窗格中内容的document对象的指针。

```
let iframe = document.getElementById('myIframe');
let iframeDoc = iframe.contentDocument;
```

contentDocument属性是Document的实例，拥有所有文档属性和方法，因此可以像使用其他HTML文档一样使用它。还有一个contentWindow，返回相应窗格的window对象，这个对象上有一个document属性



样式

HTML中的样式有3种定义方式：外部样式表（通过link标签），文档样式表（通过style标签），元素特定样式（通过style属性）

任何支持style属性的HTML元素在JavaScript中都会有一个对应的style属性。这个style属性是CSSStyleDeclaration类型的实例，其中包括通过HTMLstyle属性为元素设置的所有样式信息，但不包含通过层叠机制从文档样式和外部样式继承来的样式。

DOM2 Style规范在style对象上定义了一些属性和方法。这些属性和方法提供了元素style属性的信息并支持修改

cssText，包含style属性中的CSS代码，可以读取/写取

length，应用给元素的CSS属性数量

parentRule，表示CSS信息的CSSRule对象

getPropertyPriority(propertyName)，如果CSS属性propertyName使用了!important则返回"important"，否则返回空字符串

getPropertyValue(propertyName)，返回属性propertyName的字符串值

item(index)，返回索引为index的CSS属性名

removeProperty(propertyName)，从样式中删除CSS属性propertyName

setProperty(propertyName,value,priority)，设置CSS属性propertyName的值为value，priority是"important"或空字符串

计算样式

style对象中包含支持style属性的元素为这个属性设置的样式信息，但不包含从其他样式表层叠继承的同样影响该元素的样式信息。DOM2 Style在document.defaultView上增加了getComputedStyle()方法。这个方法接收两个参数：要取得计算样式的元素和伪元素字符串（如":after"）。如果不需要查询伪元素，则第二个参数可以传null。getComputedStyle()方法返回一个CSSStyleDeclaration对象(与style属性的类型一样)，包含元素的计算样式

```html
<!DOCTYPE html>
<html>
<head>
<title>Computed Styles Example</title>
	<style type="text/css">
		#myDiv {
            background-color: blue;
            width: 100px;
            height: 200px;
        }
</style>
</head>
<body>
	<div id="myDiv" style="background-color: red; border: 1px solid black"></div>
</body>
</html>
```

上面的div元素从style标签和自己的style属性获取了样式，此时，这个元素的style对象中包含backgroundColor和border属性，但不包含width和height属性。下面的代码从这个元素获取了样式

```javascript
let myDiv = document.getElementById('myDiv');
let computedStyle = document.defaultView.getComputedStyle(myDiv,null);
console.log(computedStyle.width)
```

操作样式表

CSSStyleSheet类型表示CSS样式表，包括使用link标签和通过style标签定义的样式表。这两个标签本身分别是HTML Link Element和HTMLStyleElement。CSSStyleSheet类型是一个通用样式表类型，可以表示以任何方式在HTML中定义的样式表。

CSSStyleSheet类型继承StyleSheet，后者可用作非CSS样式表的基类。以下是CSSStyleSheet从StyleSheet继承的属性。

* disabled，布尔值，表示样式表是否被禁用了（这个属性是可读写的，因此将他设置为true会禁用样式表）
* href，如果是使用link包含的样式表，则返回样式表的URL，否则返回null
* media，样式表支持的媒体类型集合，这个集合有一个length属性和一个item()方法，跟所有DOM集合一样。同样跟所有DOM集合一样，也可以使用中括号访问集合中特定的项。如果样式表可用于所有媒体，则返回空列表
* ownerNode，指向拥有当前样式表的节点，在HTML中要么是link元素要么是style元素，如果当前样式是通过@import被包含在另一个样式表中，则这个属性值为null
* parentStyleSheet，如果当前样式表是通过@import被包含在另一个样式表中，则这个属性指向导入它的样式表。
* title，ownerNode的title属性
* type，字符串，表示样式表的类型，对CSS样式表来说，就是'text/css'
* cssRules，当前样式表包含的样式规则的集合
* ownerRule，如果样式表是使用@import导入的，则指向导入规则，否则为null
* deleteRule(index)，在指定位置删除cssRules中的规则
* insertRule(rule,index)，在指定位置向cssRules中插入规则

document.styleSheets表示文档中可用的样式表集合。这个集合的length属性保存着文档中样式表的数量，而每个样式表都可以使用中括号或item()方法获取。

CSS规则

CSSRule类型表示样式表中的一条规则，这个类型也是一个通用基类，很多类型都继承它，但其中最常用的是表示样式信息的CSSStyleRule

* cssText，返回整条规则的文本。
* parentRule，如果这条规则被其他规则包含，则指向包含规则，否则就是null。
* parentStyleSheet，包含当前规则的样式表
* selectorText，返回规则的选择符文本。
* style，返回CSSStyleDeclaration对象，可以设置和获取当前规则中的样式
* type，数值常量，表示规则类型

创建规则

DOM规定，可以使用insertRule()方法向样式表中添加新规则。

`sheet.insertRule("body {background-color:silver}",0)`



元素尺寸

**偏移尺寸**

offsetHeigth，元素在垂直方向上占用的像素尺寸，包括它的高度、水平滚动条高度和上下边框的高度

offsetWidth，元素在水平方向上占用的像素尺寸，包括它的宽度、垂直滚动条宽度和左右边框的宽度

offsetLeft，元素左边框外侧距离包含元素左边框内侧的像素数

offsetTop，元素上边框外侧距离包含元素上边框内测的像素数

其中offsetLeft和offsetTop是相对于包含元素的

![](E:\offer-go\hfbook\img\offset.jpg)



**客户端尺寸**

元素的客户端尺寸包含元素内容及其内边距占用的空间。

clientHeight，内容区域高度加上、下内边距的高度

clientwidth，内容区域宽度加左、右内边距的宽度

不包含滚动条占用的空间

**滚动尺寸**

滚动尺寸提供了元素内容滚动距离的信息，有些元素，比如html无须任何代码就可以自动滚动，而其他元素则需要使用css的overflow属性令其滚动。

scrollHeight，没有滚动条出现时，元素内容的总高度

scrollWidth，没有滚动条出现时，元素内容的总宽度

scrollLeft，内容区左侧隐藏的像素数，设置这个属性可以改变元素的滚动位置

scrollTop，内容区顶部隐藏的像素数，设置这个属性可以改变元素的滚动位置

![](E:\offer-go\hfbook\img\scroll.jpg)

**元素尺寸**

浏览器在每个元素上都暴露了getBoundingClientRect()方法，返回一个DOMRect对象，包含6个属性:left、top、right、bottom、height和width。

![](E:\offer-go\hfbook\img\positio.jpg)





遍历

DOM2 Traversal and Range 模块定义了两个类型用于辅助顺序遍历DOM结构。这两个类型--NodeIterator和TreeWalker---从某个起点开始执行对DOM结构的深度优先遍历

NodeIterator 类型可以通过document.createNodeIterator()方法创建实例。接收4个参数

* root ，作为遍历根节点的节点
* whatToShow，数值代码，表示应该访问哪些节点
* filter，NodeFilter对象或函数，表示是否接收或跳过特定节点
* entityReferenceExpansion，布尔值，表示是否扩展实体引用

whatToShow 参数是一个位掩码，通过应用一个或多个过滤器来指定访问哪些节点。这个参数对应的常量是在NodeFilter类型中定义的

* NodeFilter.SHOW_ALL，所有节点
* NodeFilter.SHOW_ELEMENT，元素节点
* 。。。

这些值除了NodeFilter.SHOW_ALL 之外，都可以组合使用

`let whatToShow =  NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT`

filter参数可以用来指定自定义NodeFilter对象，或者一个作为节点过滤器的函数。NodeFilter对象只有一个方法acceptNode()，如果给定节点应该访问就返回NodeFilter.FILTER_ACCEPT，否则返回NodeFilter.FILTER_SKIP。因为NodeFilter是一个抽象类型，所以不可能创建它的实例。只要创建一个包含acceptNode()的对象，然后把它传给createNodeIterator()就可以。



































