# react-native复习

#### 常用组件

View

Text

`<Text>`元素在布局上不同于其他组件，在`Text`内部的元素不再使用flexbox布局，而是采用文本布局

Image

显示不同类型图片的组件，包括网络图片、静态资源、base64图片

```react
<Image source={require('../assets/logo.png')}/> //本地图片
<Image source={{uri:'https://fan...'}}/> //线上图片
<Image source={{uri:'data:image/png;base64...'}}/> //base64图片
```

resizeMode : 决定当组件尺寸和图片尺寸不成比例的时候如何调整图片的大小，默认值是cover.   

* cover:在保持图片宽高比的前提下缩放图片，直到宽度和高度都大于等于容器视图的尺寸。
* contain:在保持图片宽高比的前提下缩放图片，直到宽高都小于等于容器视图的尺寸。
* stretch:宽高填满容器
* repeat:重复平铺图片直到填满容器。图片会维持原始尺寸，但是当尺寸超过容器时会在保持宽高比的前提下缩放到能被容器包裹
* center:居中不拉伸

ImageBackground

添加背景，必须指定width和height

```react
<ImageBackground source={...} style={{width:'40px',height:'40px'}}/>
```

TextInput

```react
<TextInput
	value={value}
	onChangeText={函数来改变value}
/>
```

ScrollView

滚动组件

#### 交互组件

Button

跨平台的按钮组件

```react
<Button
	onPress={()=>{}}
    title='按钮'
/>
```

TouchableOpacity

可以自己定制的按钮

#### 列表组件 

FlatList

特点:

* 完全跨平台
* 支持水平布局
* 支持单独的头部尾部组件
* 支持下拉刷新，上拉加载 onRefresh onEndReached
* 支持跳转到指定行
* 支持多列布局
* 行组件显示或隐藏时可配置回调事件

```react
<FlatList
	data={[{key:'a'},{key:'b'}]}
	renderItem={(item)=><Text>{item.key}</Text>}
/>
```

记

- onRefresh：下拉刷新
- refreshing：下拉刷新时的图标
- onEndReached: 上拉加载
- onEndReachedThreshold: （0-1之间的数）距离底部多少距离触发上拉加载函数
- keyExtractor: 为 item 指定key

SectionList 

高性能的分组列表组件

```react
<SectionList
    sections={data}
    keyExtractor={(item,index)=>item+index}
	renderItem={(item)=><Item title={item}/>}
    renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.header}>{title}</Text>
      )}
/>
```

#### 路由组件

1. react-navigation

2. react-native-router-flux

基础使用

```react
const Root = () => {
    return (
    	<Router>
        {/*Router 里只能放一个组件，将全部的跳转页面都放到Root下面*/}
            <Scene key="root">
            {/*key 就是给页面的标签，供Actions使用*/}
            {/*component 设置关联的页面*/}
            {/*title 页面标题*/}
            {/*initial 设置默认页面*/}
             	<Scene
                    key="one"
                    component={PageOne}
                    title="PageOne"
                    initial={true}/>
                <Scene
                    key="two"
                    component={PageTwo}
                    title="PageTwo"/>
            </Scene>
        </Router>
    )
}
```

路由跳转

```react
const PageOne = () => {
	return (
    	<View>
            <Text onPress={()=>Actions.two()}>
            	我是Page One
            </Text>
        </View>
    )
}
```

数据传递和刷新

```react
export default class PageTwo extends Component {
    render() {
        const data = this.props.data || 'null';
        return (
        	<View>
            	<Text
                    onPress=>{()=>Actions.one({
                        data:'从two传递到one'
                    })}
                	我是Page One
                </Text>
                <Text
                    onPress={()=>Actions.refresh({
                        data:'Changed data'
                    })}>
                	refresh:{data}
                </Text>
            </View>
        )
    }
}
```

Tabs功能

```react
const Root = () => {
    return (
    	<Router>
        	<Scene>
            	<Tabs
                	key="tabbar"
                    // 是否显示标签栏文字
                    showLabel={false}
                    tabBarStyle={{backgroundColor: "#eee"}}
                    //tab选中的颜色
                    activeBackgroundColor="white"
                    //tab没选中的颜色
                    inactiveBackgroundColor="red"
                >
                	<Scene/>
                    <Scene/>
                    <Scene/>
                </Tabs>
            </Scene>
        </Router>
    )
}
```

Drawer

```react
<Drawer
    key="drawer"
    drawerPosition="left/right"
    drawerImage={图片源}
    drawerIcon={}
    contentComponent={DrawerContent}
	drawerWidth={400}
    hideDrawerButton
>
    <Tabs></Tabs>
</Drawer>
```

Lightbox

```react
<Router>
  <Lightbox>
    <Scene key="root">
      ...
    </Scene>
    <Scene key="light_box" component={MyLightbox} />
  </Lightbox>
</Router>
```

Modal

```react
<Router>
  <Modal>
    <Scene key="root">
      ...
    </Scene>
    <Scene key="statusModal" component={StatusModal} />
    <Scene key="errorModal" component={ErrorModal} />
    <Scene key="loginModal" component={LoginModal} />
  </Modal>
</Router>
```

#### 其他组件

Animated 创建动画

WebView 

react-native-image-picker 启动本地图库和照相机来采集图片

react-native-image-crop-picker 启动本地图库和照相机来采集图片并且可以裁剪

react-native-button

react-native-message-bar 消息栏通知组件

react-native-vector-icons 图标库

react-native-swiper  轮播图

#### 获取设备尺寸

Dimensions.get('window').width

flex布局

`flexDirection justifyConent alignItems`

#### 本地存储

```react
AsyncStorage.setItem('username','zhangsan',()=>console.log('store success!'))
AsyncStorage.getItem('username')
```

