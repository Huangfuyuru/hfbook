# 适配器模式

### 介绍

​	旧接口格式和使用者不兼容，中间加一个适配器转换接口

### 演示

- UML类图

  [![Nl6aCt.png](https://s1.ax1x.com/2020/06/20/Nl6aCt.png)](https://imgchr.com/i/Nl6aCt)

- 代码演示

  ```javascript
  class Adaptee{
      specifiRequest(){
          return '德国标准插头'
      }
  }
  class Target{
      constructor(){
          this.adaptee = new Adaptee();
      }
      request(){
          let info = this.adaptee.specifiRequest();
          return `${info} - 转换器 - 中国标准插头`
      }
  }
  //测试
  let target = new Target();
  console.log(target.request())
  ```

### 场景

- 封装旧接口
- vue computed

