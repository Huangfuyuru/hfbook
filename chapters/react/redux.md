# redux

redux的设计思想是：web应用是一个状态机，视图和状态都是一一对应的。所有的状态保存在一个对象里面。它的核心是三部分store,action,reducer。store是保存数据的地方，可以把它当作一个容器，一个应用只能有一个store,redux提供createStore这个函数来生成store,因为store中保存了数据，如果想得到数据可以用store.getState()来拿到。action它是一个对象，它相当于用户的操作，来告诉store和reducer如何操作数据，其中必须有type属性表示这个动作的目的,改变store中的数据的唯一方式就是派发action,我们可以使用store.dispatch来派发。当这个action被派发到了store后，store并没有能力通过action来改变数据，通过action来改变数据的活是由reducer来完成的，reducer是一个函数，它接受action和当前的state(也就是store中保存的数据)作为参数，返回一个新的state，放在store中，reducer注意事项1.不能在reducer中改写参数，不能调用系统I/O,不能发生请求等。

store允许使用store.subscribe方法设置监听函数，一旦store中的数据发生变化，就会自动执行这个函数，一般是放在componentDidMount中，同时要在componentWIllUnMount中销毁。

异步操作我们可以使用中间件来实现。在createStore()方法中添加applyMiddleware函数，这个函数包裹中间件

react-redux

分为UI组件和容器组件

UI组件只负责UI的呈现，不带由任何业务逻辑，没有状态不会使用this.state这个变量，所有的数据都是有this.props提供，不适用任何的redux的API。容器组件负责管理数据和业务逻辑，不负责UI的呈现，带有内部状态，使用redux的API

使用connect方法将UI组件生成容器组件，输入逻辑：外部数据如何转换为UI组件的参数，输出逻辑：用户发出的动作如何变为action对象，从UI组件传出去。connect接受两个参数mapStateToProps和mapDispatchToProps前者负责输入逻辑，将state映射到UI组件的props，后者负责输出逻辑，及将用户对UI组件的操作映射成Action 