# css模块化

#### React中CSS模块化

1. 使用 css modules

```react
import React,{Component} from 'react'
import CSSModules from "react-css-modules"
import styles from "assets/css/main.css"
class main extends Component{
	constructor(props){
		super(props)
	}
	render(){
		return (
			<div class={styles.container}>
				<div class={styles.child}></div>
			</div>
		)
	}
}
export default main
```

```css
//main.css
.container{
    ...
}
.child{
    ...
}
```

2. 给每个页面根节点设置唯一类名，然后加上CSS后代选择器的方式来实现私有样式