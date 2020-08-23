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