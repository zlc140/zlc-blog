---
title: 前端优化之reflow
data: "2019/06/24 14:00:00"
tag: ['js', '前端优化', 'reflow']
meta: 
- name: description
  content: 高级函数
- name: keywords
  content: reflow,前端优化
---



## 重绘和回流
1. [浏览器加载一个页面的过程](/aboutJs/webPage)
2. 重绘 当前元素样式(背景色，字色等)改变时不改变布局只改变外观风格（换肤）就会触发重绘，由于不影响其他dom，性能影响较少
3. 回流 浏览器会重新计算部分或全部文档的位置和布局，这个过程是性能杀手  
触发条件：  
* 调整窗口大小  
* 改变字体  
* 增加或移除样式表  
* 内容变化 入`input` ,`select`输入或选择  
* 激活`css伪类`  
* 操作`class`属性  
* JS操作DOM   
* 计算 `offsetWidth` `offsetHeight`  
* 设置`style`属性  
* `fixed`定位元素在滚动条移动是会一直触发回流  

4.如何避免重绘和回流呢

* `Display: none`不渲染，所以可以在对元素操作样式之前想`none`之后操作，完成后`block`,这样值触发两次回流（操作样式多的时候）

* `innerHTML` 直接以`innerHTML`插入新的`dom`和样式，只触发一次回流
    
* `DocumentFragment`是`DOM`节点，但不是`DOM tree`的一部分，相当于虚拟`DOM`，在缓存DOM上操作，最后一次性插入，触发一次回流

* 多种样式操做直接通过`class`的添加或删除进行，减少重绘次数

* 不要对元素行进`JS`动画流操作，尽量使用`css`动画属性
