
---
title: vue原理解析
data: "2018/06/21 11:00:00"
tag: vue
meta: 
- name: description
  content: vue原理笔记
- name: keywords
  content: vue
--- 


Vue核心功能简单实现原理 数据驱动和组件化
1.渐进式框架，Vue核心库+Vue插件（实现特定功能是引入插件进行增强）
2.MVVM  model数据层 - view视图层 - VM viewModel 处理数据和界面中间层，指Vue实例

核心功能：

1.双向数据绑定
2.订阅-发布者模式
	
	new Vue 实例 ==》 数据添加到监听队列  ==》渲染模板（绑定的数据渲染到视图）==》渲染的时候将绑定的数据添加订阅并放到消息盒子deps (一个数据对应一个depId,可能对应多个subs(多处绑定了该数据)) ==》数据变更触发触发发布者subs进行视图更新 

注意： 1.订阅盒子数据结构：每个被监听的key通过definedProperty劫持数据的get添加订阅，set来发布
	depIds = {
	1: {
		key: 'name', ==> 
		id: 1,
		subs: [
			 {val: 'Jake',vm: vm,cb: cb,expOrFn:expOrFn},
			 {val: 'Luse',vm: vm,cb: cb,expOrFn:expOrFn}
		]
	},
	2: {
		key: 'age',
		id: 1,
		subs: [
			{val: 19,vm: vm,cb: cb,expOrFn:expOrFn},
			{val: 21,vm: vm,cb: cb,expOrFn:expOrFn}
		]
	}
}
subs的va应该是一样的，当有一个修改，就会触发notity,更新其他的subs

3.虚拟DOM，diff算法
	1.根据一个json对象生成一个dom结构的数据，插入根节点
	2.json对象发生改变的时候和之前的数据进行diff算法对比，更新对应的发生变更的节点
	
	思考：Vue中使用的方法
	1.每个组件都是生成的虚拟dom ==> router ==》 对应的模板，根节点 ==》 生成虚拟dom ==> 添加监听队列 ==》订阅发布 ==》更新虚拟dom ==》 插入根节点 
	
4.路由

5.js解析
