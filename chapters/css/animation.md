animation-duration:指定动画需要多少s完成

animation-delay：设置延时，元素从加载完成到开始执行的间隔

animation-direction：设置动画在每次运动后是反向运行还是重新回到开始位置重复运行

​	normal:默认值，每个动画循环结束，动画重置到起点重新开始

​	alternate:动画交替反向运行

​	reverse:反向运行动画

​	alternate-reverse:反向交替，反向开始交替

animation-iteration-count:运行次数

animation-name：指定关键帧名称

animation-play-state:允许暂停和恢复动画

​	running

​	paused

animation-timing-function:设置动画速度。即通过建立加速度曲线，设置动画在关键帧之间是如何变化。

​	linear:动画从头到尾速度相同

​	ease:默认。动画以低速开始，然后加快，在结束前变慢

​	ease-in:动画以低速开始

​	ease-out:动画以高速结束

​	ease-in-out:动画以低速开始和结束

​	cubic-bezier(n,n,n,n):在 cubic-bezier 函数中自己的值。可能的值是从 0 到 1 的数值。

animation-fill-mode:指定动画执行前后如何为目标元素应用样式。

animation:name duration timing-function delay iteration-count direction fill-mode play-state

