---
title: vueAPI
data: "2018/12/25 14:00:00"
tag: vue
meta: 
- name: description
  content: Vue
- name: keywords
  content: vue
--- 

## 动态组件

1. component是Vue的内置组件，有is来决定被渲染的组件是哪个
```vue
<component 
    v-bind:is="el-button" 
    @click="btnClick" 
    class="hello">
    click me
</component>
```
<component is="my-counter"></component>

2. 通过component实现了动态加载组件，但在切换选项卡时我们想保持之前组件的状态，keep-alive
```vue
<!-- 失活的组件将会被缓存 -->
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

## 异步组件
在大型应用中，我们有时需要分割小一些的代码块，并且只在需要的时候才从服务器加载某个模块。

```js
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // 向 `resolve` 回调传递组件定义
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})

// 一个推荐的做法是将异步组件和 webpack 的 code-splitting 功能一起配合使用：
Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包，这些包
  // 会通过 Ajax 请求加载
  require(['./my-async-component'], resolve)
})

// 把 webpack 2 和 ES2015 语法加在一起，我们可以写成这样：
Vue.component(
  'async-webpack-example',
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)

// 当使用局部注册的时候，你也可以直接提供一个返回 Promise 的函数：
new Vue({
  // ...
  components: {
    'my-component': () => import('./my-async-component')
  }
})
```

## require.context
webpack在构建是会解析代码中的require.context()
 
>Vue中应用场景:  
在vue中，我们对于一些基础组件，可以使用require.context()函数来创建上下文模块，然后进行全局注册组件，记住全局注册的行为必须在根 Vue 实例 (通过 new Vue) 创建之前发生。  
[基础组件的自动化全局注册](https://cn.vuejs.org/v2/guide/components-registration.html#%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6%E7%9A%84%E8%87%AA%E5%8A%A8%E5%8C%96%E5%85%A8%E5%B1%80%E6%B3%A8%E5%86%8C)
 
```js
const files = require.context(
    './components',
    false,
    /\.test\.js$/
)
```
1. 参数：  
    * 要搜索的文件目录, ./components  
    * 是否搜索该文件目录的子目录  
    * 文件名的正则匹配 以.test.js结尾的文件  
2. 返回files
打印files 发现返回一个require()函数
```js
ƒ webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
```
    而这个函数有3个属性:  
    - resolve 是一个函数，它返回请求被解析后得到的模块 id。  
    - keys：也是一个函数，它返回一个数组，由所有可能被上下文模块处理的请求组成。  
    - 是上下文模块里面所包含的模块 id. 它可能在你使用 module.hot.accept 的时候被用到  

## 依赖注入
访问父组件实例可以直接通过this.$parent来访问，但如何更深层次的嵌套组件上，就无法这么访问了，所以有了依赖注入
它用到了两个新的实例选项 provide inject

1. provide 选项允许我们指定我们想要提供给后代组件的数据/方法
```js
provide: function() {
    return {
        getMap: this.getMap
    }
}
```
2. 然后在任何后代组件里，我们都可以使用 inject 选项来接收指定的我们想要添加在这个实例上的属性：
```js
{
    inject: [getMap]
}
```
## keep-alive缓存
1. keep-alive 包裹动态组件时会缓存不活动的组件
该组件参数props
* `include:`   字符串或正则表达式。只有名称匹配的组件会被缓存
* `exclued:`   字符串或正则表达式。只有名称匹配的组件不会被缓存
* `max`        数字。最多可以缓存多少组件实例。一旦缓存的组件达到最大值，新实例创建前会销毁最近没访问的那个
>注意：include和exclude如果参数是数组或正则表达式，需要使用v-bind:的形式传
```vue
<keep-alive include="a,b">
  <component :is="view"></component>
</keep-alive>
<!-- 多个条件判断的子组件 -->
<keep-alive :include="/a|b/">
  <comp-a v-if="a > 1"></comp-a>
  <comp-b v-else></comp-b>
</keep-alive>

<!-- 和 `<transition>` 一起使用 -->
<transition>
  <keep-alive :include="['a', 'b']" :max="10">
    <component :is="view"></component>
  </keep-alive>
</transition>
```

2. tab切换组件，通过keep-alive缓存组件，从而保留组件的当前状态，如果添加缓存之后我想对某些数据在切换回来
的时候进行更新，怎么操作？

>子组件添加生命周期：activated
在渲染该组件或者进入该组件时会调用
 
> deactivated
在切换到别的组件时调用


