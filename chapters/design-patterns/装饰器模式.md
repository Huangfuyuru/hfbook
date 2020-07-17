# 装饰器模式

### 介绍

为对象添加新功能，不改变其原有的结构和功能。区别于适配器模式将原有功能改变。

### 演示

- UML类图

  [![NlT3Ks.png](https://s1.ax1x.com/2020/06/20/NlT3Ks.png)](https://imgchr.com/i/NlT3Ks)

- 代码演示

  ```javascript
   class Circle{
              draw(){
                  console.log('画一个圆形')
              }
          }
          class Decorator{
              constructor(circle){
                  this.circle = circle
              }
              draw(){
                  this.circle.draw();
                  this.setRedBorder(this.circle)
              }
              setRedBorder(circle){
                  console.log('设置红色边框')
              }
          }
          let cir1 = new Circle();
          cir1.draw();
          let dec = new Decorator(cir1);
          dec.draw();
  ```

  

### 场景

- ES7装饰器
  - 装饰类
  - 装饰方法
- core-decorators

