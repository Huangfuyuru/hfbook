# FlexBox(弹性盒子)

设置了`display:flex`的元素称为Flex容器(flex container)，容器的子元素称为Flex项目(flex items).

container默认存在两根轴：主轴和垂直的交叉轴

![轴](E:\Second semester of third grade\awesome\hfbook\chapters\img\js_15.png)

#### FlexBox Container属性

##### 1.flex-direction

定义主轴的方向，也就是"items"的排列方向

* row:主轴为水平方向，从左边开始排列
* row-reverse:主轴为水平方向，从右边开始排列
* column:主轴为垂直方向，从上往下排列
* column:主轴为垂直方向，从下往上排列

##### 2.flex-wrap

一行排不开时，是否换行，如果换行，按照什么方向

* nowrap(默认)：不换行，如果排满了，就缩小"items"的尺寸
* wrap:换行，沿交叉轴的方向
* wrap-reverse:换行，沿交叉轴的相反方向

##### 3.flex-flow

flex-flow是flex-direction和flex-wrap的简写

`flex-flow:row nowrap`

##### 4.justify-content

"items"在主轴上的对齐方式

* flex-start(默认值):左对齐
* flex-end:右对齐
* center:中间
* space-between:两端对齐，“items”之间 的间隔相等
* space-around:每个项目两侧的间隔相等

##### 5.align-items

"items"在交叉轴上的对齐方式

* flex-start:在交叉轴的起点对齐
* flex-end:在交叉轴的终点对齐
* center:在交叉轴的中点对齐
* baseline:与"items"的第一行文字的基线对齐
* stretch(默认值):如果项目未设置高度或设为auto,将占满整个容器

##### 6.align-content

align-content定义了多根轴线的对齐方式，当"items"不止一行。如果项目只有一行，该属性不起作用

* flex-start:与交叉轴的起点对齐
* flex-end:与交叉轴的终点对齐
* center:与交叉轴的中点对齐
* space-between:与交叉轴的两端对齐，主轴方向"items"没根轴之间间隔平均
* space-around:每根主轴方向"items"两侧的间隔都相等
* stretch:（默认值）每根"items"轴线展开占满整个交叉轴

![](E:\Second semester of third grade\awesome\hfbook\chapters\img\five.png)

![four](E:\Second semester of third grade\awesome\hfbook\chapters\img\four.png)

![one](E:\Second semester of third grade\awesome\hfbook\chapters\img\one.png)

![six](E:\Second semester of third grade\awesome\hfbook\chapters\img\six.png)

![three](E:\Second semester of third grade\awesome\hfbook\chapters\img\three.png)

![two](E:\Second semester of third grade\awesome\hfbook\chapters\img\two.png)

#### Flexbox items属性

##### 1.order

定义单个"item"的排列位置，属性值值越小，排列越靠前，默认为0

```javascript
.item{
	order:2
}
```

##### 2.flex-grow

定义“item”的放大比例，默认为0，也就是如果存在剩余空间，也不放大。如果每个"item"的flex-grow属性值为1，那么每个"item"等分剩余空间

##### 3.flex-shrink

定义"item"的缩小比例，默认为1，如果空间不足，该"item"将等比例缩小。设置为0时，当空间不足时,item不缩小。设置为2时，缩小比例默认为2倍

##### 4.flex-basis

`flex-basis`属性定义了在分配多余空间之前，“item” 占据的主轴空间。浏览器可以根据这个属性，计算主轴是否还剩余空间。默认值为`auto``，即 “item” 的本来大小。

它可以设为跟`width`或`height`属性一样的值，则 “item” 将占据固定空间。

##### 5.flex

是flex-grow,flex-shrink,flex-basix的简写属性，默认值为0 1 auto

改属性有两个简写值：

- `flex: auto;` 等同于 `flex: 1 1 auto;`。

- `flex: none;` 等同于 `flex: 0 0 auto;`。

- `flex:1;`等同于`flex:1 1 0%;`

  `flex:2;`等同于`flex:2 2 0%;`

##### 6.align-self

`align-self`属性允许单个 “item” 可以和其他项目有不一样的对齐方式。

可覆盖`align-items`属性。默认值为`auto`，表示继承 “container” 的`align-items`属性。

[相关资料1](https://zhuanlan.zhihu.com/p/32946068)

[相关资料2](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

