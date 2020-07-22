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





水平

没总结



垂直居中

行内元素和块级元素区别

css  如何处理类名冲突问题





首屏时间 图片懒加载 预加载



BFC 

弹性布局

层叠规则

