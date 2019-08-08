---
title: 认识babel
data: "2019/06/18 14:00:00"
tag: ['es6', 'babel']
meta: 
- name: description
  content: babel是什么，如何使用
- name: keywords
  content: es6,babel
---

## babel是什么
    JavaScript如同别的语言一样，一直在更新中，那么新出现的API在比较旧的浏览器
    上就会出现不兼容问题，而`babel`就是把`es2015/2017`等的新语法转为为可以覆盖
    大部分浏览器的es5语法，常规来说转到es5是比较流行和安全的做法
    
## 使用方法

1. 使用单体文件 （standalone script）
2. 命令行（cli）
3. 构建工具的插件（webpack的babel-loader,rollup的rollup-plugin-babel）

后两种比较常见，第二种多见与package.json的script命令，第三种则是集成到构建工具中
三种方式只是入口不一，处理的方式是一样

## 运行方式和插件
babel总共分为三个阶段： 解析， 转换， 生成

babel的转换是要通过一个个plugin插件实现的，so如果没有任何插件则输出的代码不变

插件分为 语法插件和转译插件
1. 语法插件：在解析这一步使得babel能解析更多语法（babel内部解析类库是babylon,非babel开发）

2. 转译插件：添加转译插件后再转换这步把源码转换并输出。这是babel***最本质的需求***
  例如`babel-plugin-transform-es2015-arrow-functions`插件可以将箭头函数转`(a)=>a`为正常的函数`function a(){return a}`
    
>  注意：同类语法可能两种插件都存在，如果我们用来转译插件就不要语法插件了，一种就行了

## babel配置

1. 将插件添加到配置文件中（如.babelrc或者package.json的babel里，格式相同）

2. 使用`npm install babel-plugin-****` 安装插件

## preset

一套新的规范（如es2015）包含多个转译插件，如果每次开发一个个装会很麻烦，preset就是提供一组组的插件组合
类似套餐服务

1. preset包含env,react,flow,minify等，env是最重要的
2. stage-x 这里是包含当年最新规范
    * stage-0  -稻草人：只是一个想法，经过 TC39 成员提出即可。
    * stage-1  -提案： 初步尝试
    * stage-2  -初稿： 完成初步规范
    * stage-3  -候选： 完成规范，浏览器初步实现
    * stage-4  -完成： 被添加到下一年度发布
    
>其中第一级的stage会包含高级的stage的内容，例如stage-1会包含234的内容  
stage-4 在下一年更新会直接放到 env 中，所以没有单独的 stage-4 可供使用。

3. 201x,latest
这些也已列入规范例如 es2015 包含 arrow-functions，es2017 包含 syntax-trailing-function-commas。但因为 env 的出现，使得 es2016 和 es2017 都已经废弃。所以我们经常可以看到 es2015 被单独列出来，但极少看到其他两个。

latest 是 env 的雏形，它是一个每年更新的 preset，目的是包含所有 es201x。但也是因为更加灵活的 env 的出现，已经废弃。


## 执行顺序
* plugin会在preset之前
* plugin会从前到后顺序执行
* preset的顺序刚好相反，从后向前（为了向后兼容）


## 插件和 preset 的配置项   

















[原文](https://juejin.im/post/5c19c5e0e51d4502a232c1c6)
