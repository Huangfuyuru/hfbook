小题

**window.onload document.onload 分别在什么时候触发？**

window.onload 必须等到页面内的所有元素加载完毕后才能执行，所有元素指页面结构、内容以及关联文件

document.onload 页面DOM结构绘制结束后触发

**图片src和背景url区别？**

图片不需要设置宽高，而背景需要设置宽高，才能显示。

图片作为背景，在图片没加载或加载失败的时候，不会有个图片的占位标记，不会出现红叉。

网页加载的过程中，作为背景的图片会等到结构加载完成才开始加载，而img中的图片会在加载结构的过程中加载。

