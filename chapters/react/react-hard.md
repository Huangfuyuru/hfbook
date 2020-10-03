# React 难点

**开发中会遇到的问题**

1. setState 是同步还是异步?

   异步：在钩子函数和React合成事件中使用setState是异步

   同步：在异步函数比如setTimeout和原生事件中使用setState是同步  

2. 为什么有时候连续两次setState只有一次生效?

   a) 直接传递对象的setState会被合并成一次

   b) 使用函数传递state不会被合并

**setState 执行过程**

1. 将setState传入的partialState参数存储在当前实例的state暂存队列中
2. 判断当前React是否处于批量更新状态，如果是，将当前组件加入待更新的组件队列中
3. 如果未处于批量更新状态，将批量更新状态标识设置为true,用事务再次调用前一步方法，保证当前组件加入了待更新组件队列中。
4. 调用事务的wrap方法，遍历待更新组件队列依次执行更新
5. 执行生命周期componentWillReceiveProps
6. 将组件的state暂存队列中state进行合并，获得最终要更新的state对象，并将队列置为空
7. 执行生命周期componentShouldUpdate,根据返回值判断是否要继续更新
8. 执行生命周期componentWillUpdate
9. 执行真正的更新render
10. 执行生命周期componentDidUpdate

