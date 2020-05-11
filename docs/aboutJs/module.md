---
title: 前端模块化
data: "2019/06/24 14:00:00"
tag: ['js', '前端模块化', 'AMD', 'CMD','UMD','Commonjs','Es Module']
meta: 
- name: description
  content: 前端模块化
- name: keywords
  content: AMD,CMD,UMD,Commonjs,Es Module,前端模块化
---

规范化JavaScript的模块定义和加载机制，减低了学习和使用各种框架的门槛，能够以一种统一的方式去定义和使用模块
，提高开发效率，减低了应用维护成本。
## AMD
1. 异步模块定义（Asynchronous Module Defintion）实例requirejs
2. requireJS推广过程中的对模块化定义的规范化产出
3. 推崇依赖前置
4. 以浏览器为第一的原则发展，异步加载模块
5. 模块依赖如何确定： 运行时
6. 目的：
    a. 解决前端页面有多个js时，相互之间依赖关系复杂导致js顺序管理越发麻烦，
    b. 异步加载，避免加载多个js会导致浏览器停止渲染假死
7. 模块必须采用特定的define()函数来定义
```js
//定义模块 
define(['jquery'],function(jquery){
    
})
//调用模块 相当于加载jQuery成功之后执行回调
require([module], callback);

```

```html
// data-main属性的作用是，指定网页程序的主模块。
<script src="js/require.js" data-main="js/main"></script>
```
```JS
// math.js define和require一样是两个参数，一个是依赖的数组，第二个是函数主体
define(function (){ 
　　　　var add = function (x,y){ 
　　　　　　return x+y; 
　　　　}; 
　　　　return { 
　　　　　　add: add
　　　　}; 
　　});



// 主模块写法main.js
require.config({ 
　　　　baseUrl: "js/lib", 
　　　　paths: { 
　　　　　　"jquery": "jquery.min",
　　　　　　"backbone": "backbone.min" ,
           "math": 'js/math'
　　　　},
        shim: {  //专门用来配置不兼容的模块（不符合AMD规范的库）
　　　　　　'underscore':{
　　　　　　　　exports: '_'
　　　　　　}, 
　　　　　　'backbone': {
　　　　　　　　deps: ['underscore', 'jquery'],
　　　　　　　　exports: 'Backbone'
　　　　　　} 
　　　　}
　　}); 

require(['jquery','backbone', 'math'], function(jquery, backbone, math) {
    // some code hear
    console.log(math.add(1,2))
})

```
## CMD
1. 通用模块定义前端运用（Common Module Definition）,实例seajs
2. seajs推广过程中的对模块化定义的规范化产出
3. 推崇依赖就近，推崇一个页面一个模块，遵循统一写法
4. 解决的问题和AMD一样，都是为浏览器而生的
5. 和AMD的区别是模块加载时机的不同
6. 第三方引入
```js
// 例如JQuery，这个加好之后添加别名
define(function (require, exports, module) {
    // jquery 源码
})
```
7. 一个seajs项目的根目录会有个文件夹sea-module,存放的依赖模块，这个项目的根目录是 c:/project/test/sea-module
8. 模块暴露接口的方法： exports, module.exports, return, 如何都没有，默认导出{},require默认导出undefined
9. 预先下载，延迟执行
```sea-module
seajs example
|--seajs
    |--sea-module       //存在依赖文件
        |--jquery
            |--jqeury.js
        |--sea.js    
    |--static         //存放自定义模块js
        |--main.js
        |--changeText.js
    |--index.html     //调用页面
```

```html
<script src="sea-module/sea.js"></script>
<script>
// 设置别名，要在use之前设置
    seajs.config({
        alias:{
            'matn':'../js/math.js',
            'jquery': 'jQuery/jquery.js'
        }
    });
    // seajs.use('./js/main.js');
    seajs.use(['math', 'jquery'], function(math,$) {
        $('box').innerText = math.add(1,2)
    });
</script>

```
```js
// math.js
define(function(require, exports, module) {
    var add = function (x,y){ 
    　　　　　　return x+y; 
　　　　}; 
       // 模块导出方法
       //exports.add = add;
　　　　module.exports = { 
　　　　　　add: add
　　　　};
        //return {
         //   add: add
        //}
})

// main.js

define(function(require, exports, module) {
   var math = require('math')
   console.log(math.add(1, 2))
})

```

## Commonjs
1. 服务端模块的规范，node采用了这个规范
2. 同步加载模块，加载完才执行之后的操作（例如node主要用于服务器编程，文件一般都已经存在于硬盘上，加载快）
3. 加载方式：整体加载，一个文件一个模块，加载使用require方法读取文件并执行，最后返回exports对象
4. 模块导出 module.exports,exports都可以，exports = module.exports = {}
5. 输出的是值拷贝，不存在动态更新
```js
// foobar.js
var test = 123; //私有变量
function Foobar () {
    this.foo = function() {
        console.log('haha')
    }
    this.bar = function () {
        this.foo();
        console.log('gggg')
    }
}
var foobar = new Foobar()
//module.exports = {
  //  foobar : foobar
//}
exports.foobar = foobar

// main.js使用   require默认读取js文件
var test = require('./foobar').foobar
test.bar()
```
## UMD
1. 跨平台的解决方案（Universal Module Definition） 是AMD和CommonJS的糅合
2. 先判断是否支持Node.js的模块（exports）是否存在，存在则使用Node.js模块模式。再判断是否支持AMD（define是否存在），存在则使用AMD方式加载模块。
```js
(function (window, factory) {
    if (typeof exports === 'object') {
     
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
     
        define(factory);
    } else {
     
        window.eventUtil = factory();
    }
})(this, function () {
    //module ...
});
```
## ES Module

1. 输出 export，使用import
2. import 会提升到真个页面的头部执行
3. export的位置可以随意，但export不能再局部作用域中，因为不能静态化了，违背了es6的设计初衷
4. export 导出的是变量的引用，入{a: a},随原文件值变而变，export.default导出的是一个值，不会改变
5. es Module 是预加载模式，commonjs是运行时加载，且有缓存，下次执行得到的还是上次的值
```js
// egg1
export const a = 1
import { a } from 'a.js'
//egg2
export default function(){}
import a from './'
```
