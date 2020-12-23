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
## 组件更新
通过修改组件得key值更新组件渲染
```vue
<template>
  <div>
    <Child
      :key="`${componentKey}-1`"
    />
    <Child
      :key="`${componentKey}-2`"
    />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        componentKey: 0,
      };
    },
    methods: {
      forceRerender(child) {
        this.componentKey += 1;
      }
    }
  }
</script>

```
我们调用forceRerender方法之后组件因为key值改变而更新

# 异步组件
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
provide: function () {
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

## 自定义生命周期
1. 应用：当同时打开有多个轮询/定时器/动画等的标签页面时，导致浏览器卡顿
   解决：通过`visibilitychange`事件监听标签显/隐控制持续占内存的方法
```js
// pagechange.js
import Vue from 'vue'

// 通知所有组件页面状态发生了变化
const notifyVisibilityChange = (lifeCycleName, vm) => {
    // 生命周期函数会存在$options中，通过$options[lifeCycleName]获取生命周期
    const lifeCycles = vm.$options[lifeCycleName]

    // 因为使用了created的合并策略，所以是一个数组
    if (lifeCycles && lifeCycles.length) {
        // 遍历 lifeCycleName对应的生命周期函数列表，依次执行
        lifeCycles.forEach(lifecycle => {
            lifecycle.call(vm)
        })
    }

    // 遍历所有的子组件，然后依次递归执行
    if (vm.$children && vm.$children.length) {
        vm.$children.forEach(child => {
            notifyVisibilityChange(lifeCycleName, child)
        })
    }
}

/**
 * 添加生命周期钩子函数
 * @param {*} rootVm vue 根实例，在页面显示隐藏时候，通过root向下通知
 */
export const init = () => {
    const { optionMergeStrategies } = Vue.config

    /*
      定义了两个生命周期函数 pageVisible, pageHidden
      为什么要赋值为 optionMergeStrategies.created呢
      这个相当于指定 pageVisible, pageHidden 的`合并策略`与 created的相同（其他生命周期函数都一样）
     */
    optionMergeStrategies.pageVisible = optionMergeStrategies.beforeCreate
    optionMergeStrategies.pageHidden = optionMergeStrategies.created
}

/**
 * 将事件变化绑定到根节点上面
 * @param {*} rootVm
 */
export const bind = rootVm => {
    window.addEventListener('visibilitychange', () => {
        // 判断调用哪个生命周期函数
        let lifeCycleName
        if (document.visibilityState === 'hidden') {
            lifeCycleName = 'pageHidden'
        } else if (document.visibilityState === 'visible') {
            lifeCycleName = 'pageVisible'
        }
        if (lifeCycleName) {
            // 通知所有组件生命周期发生变化了
            notifyVisibilityChange(lifeCycleName, rootVm)
        }
    })
}

// main.js 引入&注册方法

import { init, bind} from 'pagechange.js'
init()
const vm = new Vue(
    router,
    store
).$mount('#app')
bind(vm)


// 组件使用

export default  {
    pageVisible() {
        console.log('页面显示出来了')
      },
      pageHidden() {
        console.log('页面隐藏了')
      }
}
```    

## keep-alive缓存
1.使用： keep-alive 包裹动态组件时会缓存不活动的组件
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
在渲染该组件或者进入该组件
>时会调用
 
> deactivated
在切换到别的组件时调用
>

3. keep-alive实现原理，它是一个抽象组件（自身不渲染Dom元素）

 ```js
/* keep-alive组件 */
export default {
  name: 'keep-alive',
  /* 抽象组件 */
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created () {
    /* 缓存对象 */
    this.cache = Object.create(null)
  },

  /* destroyed钩子中销毁所有cache中的组件实例 */
  destroyed () {
    for (const key in this.cache) {
      pruneCacheEntry(this.cache[key])
    }
  },
  mounted() {
       // 实时监听黑白名单的变动
       this.$watch('include', val => {
           pruneCache(this, name => matched(val, name))
       })
       this.$watch('exclude', val => {
           pruneCache(this, name => !matches(val, name))
       })
   },
  render () {
    /* 得到slot插槽中的第一个组件 */
    const vnode: VNode = getFirstComponentChild(this.$slots.default)

    const componentOptions: ?VNodeComponentOptions = vnode && vnode.componentOptions
    if (componentOptions) {
      // check pattern
      /* 获取组件名称，优先获取组件的name字段，否则是组件的tag */
      const name: ?string = getComponentName(componentOptions)
      /* name不在inlcude中或者在exlude中则直接返回vnode（没有取缓存） */
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      const key: ?string = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? `::${componentOptions.tag}` : '')
        : vnode.key
      /* 如果已经做过缓存了则直接从缓存中获取组件实例给vnode，还未缓存过则进行缓存 */
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance
        // 2.5.0 新增这段逻辑，使用 LRU 策略 make current key freshest
        remove(keys, key);
        keys.push(key);
      }
      // 不命中缓存,把 vnode 设置进缓存
      else {
        this.cache[key] = vnode;
        // 2.5.0 新增这段逻辑，LRU 策略的移除。
        keys.push(key);
        // 如果配置了 max 并且缓存的长度超过了 this.max，还要从缓存中删除第一个
        if (this.max && keys.length > parseInt(this.max)) {
            pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
        
      }
      /* keepAlive标记位 */
      vnode.data.keepAlive = true
    }
    return vnode
  }
}
```
* 1.获取keep-alive 包裹着的第一个子组件对象和组件名
匹配include/exclude,决定是否缓存放回组件实例
* 2.根据组件id和tag生成缓存key,并在缓存对象中查找是否缓存过，如存在取出缓存值并更新key在cache keys
中的位置（LRU置换策略关键）
* 3.在this.cache对象中存储该组件实例并保存key,之后检查缓存的实例数量是否超过max设置，如果是，通过LRU置换策略
删除最久的（数组第一个）
* 4.最后组件实例的keepAlive属性设 为true,在渲染和执行被包裹组件的钩子函数会用到

4. keep-alive 渲染过程
vue渲染过程：
> new Vue => init() => mount => complie => render => vnode => patch => DOM


keep-alive组件是在patch阶段，这是构建组件树（虚拟dom）,并将VNode转成真正DOM节点的过程

>Q&A1：我们都知道keep-alive不渲染dom节点，这是怎么做到的呢？
```js
// src/core/instance/lifecycle.js
export function initLifecycle (vm: Component) {
    const options= vm.$options
    // 找到第一个非abstract父组件实例
    let parent = options.parent
    if (parent && !options.abstract) {
        while (parent.$options.abstract && parent.$parent) {
              parent = parent.$parent
        }
        parent.$children.push(vm)
    }
    vm.$parent = parent
    // ...
}
```
###### Vue初始化生命周期时，为组件建立父子关系会根据abstract忽略某个组件

>Q&A2: keep-alive包裹的组件如何使用缓存的？
在patch阶段
```js
// src/core/vdom/patch.js
function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    let i = vnode.data
    if (isDef(i)) {
        const isReactivated = isDef(vnode.componentInstance) && i.keepAlive
        if (isDef(i = i.hook) && isDef(i = i.init)) {
            i(vnode, false)
        }
        if (isDef(vnode.componentInstance)) {
            initComponent(vnode, insertedVnodeQueue)
            insert(parentElem, vnode.elem, refElem) // 将缓存的DOM(vnode.elem) 插入父元素中
            if (isTrue(isReactivated)) {
                reactivateComponent(vnode, insertedVnodeQueue, parentEle, refElm)
            }
            return true
        }
    }
}
```
* 在首次加载被包裹组建时，由keep-alive.js中的render函数可知，vnode.componentInstance的值是undfined，keepAlive的值是true，因为keep-alive组件作为父组件，它的render函数会先于被包裹组件执行；那么只执行到i(vnode,false)，后面的逻辑不执行；
* 再次访问被包裹组件时，vnode.componentInstance的值就是已经缓存的组件实例，那么会执行insert(parentElm, vnode.elm, refElm)逻辑，这样就直接把上一次的DOM插入到父元素中。

## 组件间传参
1. 父子组件传参： props, $emit
2. vuex （所有组件间传参）=》 适合比较复杂的情况
3. eventBus (兄弟组件间/跨级组件间) ==》 逻辑不复杂的小页面
```js
// 直接使用
import Vue from 'vue'
const eventBus = new Vue()
export { eventBus } 

// 组件A 监听get_click事件
 eventBus.$on('get_click', (target) => {
    console.log(target)
})

// 组件B 触发get_click事件
eventBus.$emit('get_click', '哈哈，我点击了你')

// 自定义
class EventBus{
    constructor(){
        // 一个map，用于存储事件与回调之间的对应关系
        this.event=Object.create(null);
    };
    //注册事件
    on(name,fn){
        if(!this.event[name]){
            //一个事件可能有多个监听者
            this.event[name]=[];
        };
        this.event[name].push(fn);
    };
    //触发事件
    emit(name,...args){
        //给回调函数传参
        this.event[name]&&this.event[name].forEach(fn => {
            fn(...args)
        });
    };
    //只被触发一次的事件
    once(name,fn){
        //在这里同时完成了对该事件的注册、对该事件的触发，并在最后取消该事件。
        const cb=(...args)=>{
            //触发
            fn(...args);
            //取消
            this.off(name,fn);
        };
        //监听
        this.on(name,cb);
    };
    //取消事件
    off(name,offcb){
        if(this.event[name]){
            let index=this.event[name].findIndex((fn)=>{
                return offcb===fn;
            })
            this.event[name].splice(index,1);
            if(!this.event[name].length){
                delete this.event[name];
            }
        }
    }
}
```
4. provide, inject (跨级传参) 
```js
// 祖父级组件
provide() {
    return {
        tabbarIndex: 0
    }
}

// 孙级组件
inject:['tabbarIndex']
// 缺点：
// 1.追踪数据较为困难
// 2.provide,reject绑定的数据不是可响应的
```
5. $attrs(非props 属性), $listeners（监听的事件） （跨级传参， 多层级组件交互）
```vue
// 孙级组件1
<template>
    <div>{{parentName}} <button @click="reset">点击修改</button></div>
</template>

<script>
    export default {
        name:'SonItem1',
        inheritAttrs:false,
        props: {
            parentName:{
                type:String
            }
        },
        methods:{
            reset() {
                this.$emit('update')
            }
        }
    }
</script>
// 孙级组件2
<template>
    <div>{{parentName}}</div>
</template>

<script>
    export default {
        name:'SonItem2',
        inheritAttrs:false,
        props: {
            parentName:{
                type:String
            }
        }
    }
</script>
// 子组件

<template>
    <son-item1 v-bind="$attrs" v-on="$listeners"></son-item1>
    <son-item2 v-bind="$attrs" v-on="$listeners"></son-item2>
</template>

<script>
    export default {
         name: 'ChildItem',
         inheritAttrs:false,
    }
</script>
// 父组件


<template>
    <child-item :parentName="parentName" @update="changeName"></child-item>
</template>

<script>
    export default {
         data(){
            return {
                parentName: '1111111'
            }
         },
         methods:{
            changeName() {
                this.parentName = '2222222'
            }
         }
    }
</script>

```
