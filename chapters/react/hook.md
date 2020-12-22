# Hook

hook 是 React 16.8 的新增特性，可以在不编写class的情况下使用state以及其他React特性。Hook是一些可以让你在函数组件里“钩入”React state和生命周期等特性的函数，Hook不能在class组件中使用

**Hook动机**

1. 在组件之间复用状态逻辑很难

   可以使用Hook从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用**Hook使你在无需修改组件结构的情况下复用状态逻辑**

2. 复杂组件变得难以理解

   **Hook将组件中相互关联的部分拆分成更小的函数(比如设置订阅或请求数据)**,而并非强制按照生命周期划分

3. 难以理解的class



**State Hook**

1. useState

   ```react
   let [count,setCount] = useState(0)
   ```

   通过在函数组件里调用它来给组件添加一些内部state。useState会返回一对值:当前状态和一个让你更新它的函数。



2. useEffect

   ```react
   useEffect(() => {
       // 使用浏览器的 API 更新页面标题
       document.title = `You clicked ${count} times`;
     });
   ```
   
它跟 class 组件中的 componentDidMount、componentDidUpdate 和componentWillUnmount 具有相同的用途，只不过被合并成了一个 API.
   
如果组件卸载时要清除在effect中创建的比如定时器等，可以在useEffect中返回一个清除函数。因为useEffect会在浏览器绘制后延迟执行，如果是DOM变更为了保证同步性可以使用useLayoutEffect来代替。
   
可以给useEffect传递第二个参数，它是effect所依赖的值数组，只有当这个数组中的值更新后useEffect的第一个参数才会执行，如果只想执行依次effect可以传递一个空数组。



3. useContext

   ```react
   const locale = useContext(LocaleContext);
   ```

   接收一个context对象(就是React.createContext的返回值)并返回该context的当前值。这个当前值指的是Provider的value



4. useReducer



5. useMemo

   把“创建”函数和依赖项数组作为参数传入useMemo,它仅会在某个依赖项改变时才重新计算



6. useCallback

7. useRef

   返回一个可变的ref对象，可以从current上拿到子组件

   



**Hook 使用规则**

* 只能在函数最外层调用hook，不要再循环、条件判断或者子函数中调用
* 只能在React的函数组件中调用hook，不要在其他JS函数调用。