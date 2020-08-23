## width: auto 和 height: auto

`width`、`height`的默认值都是`auto`

对于块级元素，流体布局之下`width:auto`自适应撑满父元素宽度。这里的撑满并不同于`width:100%`的固定宽度，而是像水一样能够根据`margin`不同来自适应父元素的宽度

对于内联元素，`width:auto`则呈现出包裹性，即由子元素的宽度决定

无论是内联元素还是块级元素，`height:auto`都是呈现包裹性，即高度由子级元素撑开。

注意：正常流下，如果块级元素的width是个固定值，`margin`是`auto`，则`margin`会撑满剩下的空间，如果`margin`是固定值，`width`是`auto`，则`width`会撑满剩下的空间



## 选择器优先级

内联样式 > ID选择器 > [类 | 伪类 | 属性选择器] > [标签 | 伪元素选择器] > [通用选择器 | 子选择器(>) | 相邻选择器(+) | 同胞选择器(~)]

伪元素 : `:before / :after`

## 盒模型

下面的这个做法，可以让所有的盒子`box-sizing`为`border-box`,太美了，有没有

```
:root {
	box-sizing: border-box
}
* {
	box-sizing: inherit
}
```



#### padding

padding 不可为负值，但是可以为百分比值。为百分比时垂直和水平方向的`padding`都是相对于父级元素**宽度**计算的。

#### margin

1. 作为外边距,margin属性不会参与盒子宽度的计算，但是通过设置margin为负值,却能改变元素的宽度,但这种情况只会在流布局时(也就是width是默认的auto)，如果元素设定了宽度，或者元素设置了`float:left`/`position:absolute`这样的属性改变了流布局，那么margin为负无法改变宽度

2. 块级元素的垂直方向会发生margin合并，存在三种场景

   * 相邻兄弟元素之间maring合并
   * 父元素margin-top和子元素margin-top,父元素的margin-bottom和子元素的margin-bottom
   * 空块级元素自身的margin-top和margin-bottom合并

   组织maring合并

   * 把元素放到BFC中
   * 设置border或padding阻隔margin
   * 用内联元素阻隔
   * 给父元素设定高度

3. margin的百分比和padding一样，垂直方向和水平方向的百分比都是相对于父元素宽度计算

## css属性简单继承

css分为默认继承和默认不继承，当没有指定值时(也就是说这个元素没有设置这个属性时)，默认继承的属性取父元素的同属性的计算值，默认不继承的属性取属性的初始值(初始值是指当属性没有指定值时的默认值)。

#### 默认继承的属性

* 所有元素默认继承: visibility 、cursor
* 文本属性默认继承: letter-spacing 、word-spacing 、white-space 、line-height 、color 、font 、font-family 、font-size 、font-style 、font-weight 、text-align 、text-shadow 、text-transform 、direction 、text-indent
* 列表元素默认继承: list-style 、list-style-type 、list-style-position 、list-style-image
* 表格元素默认继承: border-collapse

#### 默认不继承的属性

* 所有元素默认不继承: all 、display、 overflow、 contain
* 文本属性默认不继承: vertical-align、text-decoration、text-overflow
* 盒子属性默认不继承: width、height、padding、margin、border、min-width、min-height、max-width、max-height
* 背景属性默认不继承: background、background-color、background-image、background-repeat、background-position、background-attachment
* 定位属性默认不继承: float、clear、position、top、right、bottom、left、z-index、
* 内容属性默认不继承：content、counter-reset、counter-increment
* 轮廓属性默认不继承：outline-style、outline-width、outline-color、outline
* 页面属性默认不继承：size、page-break-before、page-break-after
* 声音属性默认不继承：pause-before、pause-after、pause、cue-before、cue-after、cue、play-during

**所有属性都可以通过设置inherit来实现继承**

#### 四个通用属性值

* inherit : 开启继承
* initial : 重置为默认值
* unset : 将属性重置为自然值
* revert : 使用样式表中定义的元素属性的默认值。



## line-height 和 vertical-align

`line-height`和`vertical-align`是控制元素垂直对齐的两大属性`

在内联元素的垂直方向对齐中，基线是最为重要的概念。`line-height`定义的就是两基线之间的距离，`vertical-align`的默认值就是基线。

#### line-height

1. `line-height`属性用于设置多行元素的空间量，如多行文本的间距。

2. 对于块级元素来说，`line-height`决定行框盒子的最小高度，不是实际高度，当元素设置了高度，line-height不起作用

3. 对于内联元素来说，内联元素的行框盒子的高度完全由line-height决定。

4. line-height 实现垂直居中

   行距是指一行文本和相邻文本之间的距离。行距具有上下等分的机制：文字上下的行距是一样的。

还有很多不懂的地方 [链接](https://juejin.im/post/5ce607a7e51d454f6f16eb3d#heading-16)

## float 

1. 包裹性：此时元素width会像height一样由子元素决定，而不是默认撑满父元素
2. BFC：元素设置为float:left之后，其display的计算值就成了block
3. 没有任何margin合并
4. 脱离文档流

## 定位

#### 绝对定位 absolute

* 定义

  绝对定位是完全的脱离文档流，绝对定位一旦产生就不会对周围元素产生任何影响

* 默认最大宽度为包含块的宽度

  包含块指的是距离最近的position不为static的祖先元素

* 无依赖绝对定位(不设置top,right等)

  如果元素是内联元素，那么当无依赖绝对定位后，则和内联元素在同一行显示。如果元素是块级元素，则换行显示

* 绝对定位和overflow:hidden

  当overflow:hidden元素在绝对定位和包含块之间的时候，绝对定位元素不会被裁剪

  ```html
  <div style="position:relative">
  	<div style="overflow:hidden">
  		<img src="big.jpg" style="position:absolute"/>
  	</div>
  </div>
  ```

* 流体特性

  当绝对定位元素的水平方向(`left/right`)或垂直方向(`top/bottom`)的两个定位属性同时存在的时候，绝对元素在该方向上便具有了流体特性。此时的`width/height`属性具有自动撑满的特性，和一个正常流的`div`元素的`width`属性别无二致

#### 固定定位 fixed

相对于屏幕视口的位置来指定元素位置。但是当祖先元素的transform属性为none时，相对定位由视口改为该祖先元素。

#### 粘性定位 sticky

```#one {position: sticky;top: 10px}```

在视口滚到到元素top距离小于10px之前，元素为相对定位。之后，元素将固定在与顶部距离10px的位置。直到视口回滚到阈值以下。



## 元素的显示与隐藏

1. `display:none`元素不可见、不占据空间、资源会加载、DOM可访问
2. `visibility:hidden`元素不可见、不能点击、但占据空间、资源会加载
3. `opacity:0`元素不可见、可以点击、占据空间
4. `opacity:0;position:absolute`元素不可见、可以点击、不占据空间
5. `position:relative;z-index:-1`元素不可见、不能点击、占据空间、可以使用
6. `position:absolute;z-index:-1`元素不可见、不能点击、不占据空间，可以使用

## display:none 与 visibility:hidden区别

1. `display:none`的元素不会占据任何空间，`visibility:hidden`的元素会占据空间
2. `display:none`会影响css3的`transition`过渡效果，`visibility:hidden`不会
3. `display:none`隐藏产生重绘和回流,`visibility:hidden`只会触发重绘
4. 株连性:`display:none`的节点和子孙节点全都不见。`visibility:hidden`的节点的子孙节点元素可以设置`visibility:visile`显示。但是要注意`visibility:hidden`属性具有继承性，所以子孙元素默认继承了hidden而隐藏，但是当子孙元素重置为`visibility:visible`就不会被隐藏



## css 的两种盒模型

> 1. 有两种：IE 盒子模型、W3C盒子模型
> 2. 盒模型：内容、填充、边框、边界
> 3. 区别：W3C盒子的width 指的是内容部分的宽度，IE的content部分把padding 和 border 计算了进去，所以他的width指的是content+padding+border



水平

没总结



垂直居中

行内元素和块级元素区别

css  如何处理类名冲突问题





首屏时间 图片懒加载 预加载



BFC 

弹性布局

层叠规则

流：CSS中一种基本的定位和布局机制。

流体布局：利用元素“流”的特性实现的各类布局效果。

CSS3 的新特性：
一、布局更为丰富
• 移动端的崛起，催生了 CSS3 媒介查询以及许多响应式布局特性的出现，如图片元素
的 srcset 属性、 CSS 的 object-fit 属性。
• 弹性盒子布局（flexible box layout）终于熬出了头。
• 格栅布局（grid layout）姗姗来迟。

二、 视觉表现长足进步。
• 圆角、阴影和渐变让元素更有质感。
• transform 变换让元素有更多可能。
• filter 滤镜和混合模式让 Web 轻松变成在线的 Photoshop；
• animation 让动画变得非常简单。

伪类选择器：

伪元素选择器：：

关系选择器

* 空格 后代选择器
* 大于号">" 相邻后代选择器
* ~ 兄弟选择器
* "+" 相邻兄弟选择器

**每个元素都有两个盒子，外在盒子和容器盒子**

**外在盒子负责元素是可以一行显示，还是只能换行显示**

**内在（容器）盒子负责宽高、内容呈现**

`display:block`由外在的“块级盒子”和内在的“块级容器盒子”组成

`display:inline-block`由外在的“内联盒子”和内在的“块级容器盒子”组成。所以他即可以和图文显示在一行，又能直接设置width/height

widht/height 作用在 **内在盒子**

你说 inline-block 是块元素还是内联元素，是内联元素

我们设置width是其实设置的是**内在盒子**的宽度，但是当不设置width，而是让它使用默认值“width:auto”时，**内在盒子**的宽度就会根据**内部尺寸**和**外部尺寸**来决定它的真实宽度。内部尺寸表示尺寸由内部元素决定，外部尺寸表示宽度由外部元素决定。

width:auto 它包含四种特性

1. 充分利用可用空间  fill-available

   比如说`<div> <p>`这些元素的宽度默认是100%于父级容器的，撑满可用空间

2. 收缩与包裹 fit-content

   元素浮动、绝对定位、inline-block、table将元素宽度收缩为内容宽度

3. 收缩到最小 min-content

   采用内部元素最小宽度指值最大的那个元素的宽度作为最终容器的宽度

   最小宽度值，例如图片的最小宽度值是图片呈现的宽度，文本元素，中文是一个中文的宽度，英文是一个单词的长度

4. 超出容器限制 max-content

   表示采用内部元素宽度值最大的那个元素的宽度作为最终容器的宽度。

**外部尺寸的表现**

1. 特性一，正常流宽度

2. 格式化宽度，position设置为absolute或fixed的元素，它的宽度表现的是内部尺寸，但是当它的right\left或top\bottom这种对立方位的属性值同时设置了，这个时候它的宽度表现的是外部尺寸，它的宽度大小相对于最近的具有定位特性的祖先元素计算。

   `div{position:absolute;left:20px;right:20px}`,假设该`div`元素最近的具有定位特性的祖先元素的宽度是1000像素，则这个`div`元素的宽度是960像素

**内部尺寸的表现**

如何判断一个元素使用的是内部尺寸内，假如这个元素里面没有内容，宽度是0，那他应用的是“内部尺寸”。如果这个元素中没有内容，但是它的宽度不为0，那它应用的是“外部尺寸”

```html
.parent{
    width: 300px;
    height: 200px;
    background:pink
}
<div class="parent">
    <div></div>
    <span></span>
</div>
```

内层的div，它的尺寸是300*0

内层的span，它的尺寸是0*0，说明span应用是内部尺寸

内部尺寸的表现：

1. 收缩与包裹 fit-content 

   包裹和自适应，自适应指元素尺寸由内部元素决定，但永远小于“包含块”容器的尺寸。

   所以一个元素display设为inline-block,那么里面的内容即使再多，只要是正常文本，宽度也不会超过容器。

   ```html
   .parent-btn{
   	width: 100px;
   }
   <div class="parent-btn">
       <button class="btn">
       	按钮按钮按钮按钮按钮按钮按钮按钮按钮按钮
       </button>
   </div>
   ```

   button 这个 html元素是 display 是 inline-block,当button的父元素 width 设为 100px,button的宽度由内部尺寸决定，也就是内部元素的尺寸决定，当“按钮”两个字很多时，也没有改变父元素的宽度。这就体现了自适应，宽度不会超过“包含块”容器的尺寸

   这个[例子](https://demo.cssworld.cn/3/2-5.php)中，当文字少的时候居中，当文字多的时候居左。为什么呢？

   ```javascript
   .box {
   	text-align:center
   }
   .content {
   	display:inline-block;
   	text-align:left;
   }
   ```

   因为 content 的display 属性是 inline-block，也就是说它的宽度由内部元素决定，也就是文字内容，而文字内容较少，因为包裹性，所以text-align:left没有发挥左右，而外层box设置了text-align:center,因为content的**外在盒子**是inline,所以content居中。当文字增多时，content的宽度会变大，因为每一行会有空余，这个时候text-align:left会发挥作用，使文本靠左。但是不会超过“包含块”容器的宽度，所以其实content相对于box它还是居中的

2. 收缩到最小 min-content

   采用内部元素最小宽度指值最大的那个元素的宽度作为最终容器的宽度

3. 超出容器限制 max-content

   最大宽度就是元素可以有的最大宽度。等同于“包裹性”元素设置white-space:nowrap 声明后的宽度，white-space:nowrap 说明连续的内联元素不会换行。如果内部没有块级元素或者块级元素没有设置宽度值，则“最大元素”实际上是最大的连续内联盒子的宽度。

   [这个例子](https://demo.cssworld.cn/3/2-7.php),li 设置 inline-block ,说明每个li是一个内联元素，而 ul设置white-space:nowrap,不换行，所以它的wrap的最大宽度就是所有li的宽度



height:100%

height和width对百分比单位的支持是不同的。

对于width属性，如果父元素width为auto,百分比值是支持的，但是对于height属性，如果父元素height为auto，只要子元素在文档流中，其百分比值就完全被忽略。例如

```
div{
	width:100%;
	height:100%; //失效的
	background:url(big.jpg)
}
```

这个时候height是失效的，没有高度，我们必须给父元素设置一个具体的高度值。

如何让元素支持 height:100%

1. 设定显式的高度值

2. 使用绝对定位

   ```
   div {
   	height:40%;
   	position:absolute
   }
   ```

   注意，这个时候的height是相对于父元素的padding-box来计算的



max-width/max-height 初始值是none.

min-width/min-height 初始值是auto

max-width会覆盖width

```
<img src="a.jpg" style="width:480px !important;">
img {max-width:256px}
```

答案是256px, style !important都会失效，因为max-width会覆盖width

超越最大

超越最大指的是 min-width 覆盖max-width,当min-width 和 max-width 发生冲突的时候。



## 内联元素

内联元素的“内联”指的是“外在盒子”，inline-block和inline-table都是内联元素，`<button>`也是内联元素，因为其display是inline-block

内联元素的特征就是可以和文字在一行显示。因此，文字是内联元素，图片是内联元素，表单控件也是内联元素。

幽灵空白节点：在H5文档声明中，在每个“行框盒子”前面，具有该元素的字体和行高属性的0宽度的内联盒。

每一行就是一个行框盒子。



#### 替换元素

替换元素：通过修改某个属性值呈现的内容就可以被替换的元素称为“替换元素”

`<img><object><video><iframe><textarea><input>`都是典型的替换元素。替换元素除了内容可替换外，还有以下一些特性

(1) 内容的外观不受页面上的 css 的影响。注意是内容的外观

(2)有自己的尺寸

(3)在很多CSS属性上有自己的一套表现规则。

所有替换元素都是内联元素

替换元素的尺寸计算规则

(1)固有尺寸：指替换内容原本的尺寸。

(2)HTML尺寸：HTML尺寸只能通过HTML原生属性改变,这些 HTML 原生属性包括`<img>`的 width 和 height 属性、 `<input>`的 size 属性、 `<textarea>`的 cols 和 rows 属性等  

(3)CSS尺寸:特指可以通过CSS的width和height或者max-width/min-width和max-height/min-height设置的尺寸。

计算规则:CSS 尺寸>HTML 尺寸 > 固有尺寸

如果固有尺寸含有固有的宽高比例，同时仅设置了宽度或仅设置了高度，则元素依照固有的宽高比例显示。所以我们一般设置宽度而不设置高度，就是利用这个特性

```
img {width:200px}
<img src="1.jpg">
```

最终图片所呈现的宽高是 200 * 150



padding

1. padding 属性是不支持负值的
2. padding 支持百分比值，padding 百分比值无论是水平方向还是垂直方向均相对于宽度计算





#### 基线

内联元素默认是基线对齐，字母x的下边缘就是基线，所以内联元素默认和字母x的下边缘对齐。vertical-align 控制内联元素的基线位置。



#### 浮动

块状化的意思是，元素一旦float的属性值不为none,则其display计算值就是block或者table

为什么float 会让父元素的高度塌陷?



## vertical-align

vertical-align 只会对内敛元素起作用

目标元素自己的基线都默认和字母x的下边缘对齐

比如 vertical-align:middle 是将自己的基线变为中间，然后和x的下边缘对齐。

比如一个图片的默认基线是图片的下边缘，那么他的默认显示是图片下边缘和x的下边缘对齐，当给图片设置了vertical-align:middle，那么该图片的基线就变为图片的中心线然后和x的下边缘对齐。

x的大小可以通过line-height来设置。