---
title: CSS学习笔记
data: "2019/2/26 14:00:00"
tag: CSS
meta: 
- name: description
  content: CSS学习笔记
- name: keywords
  content: CSS3,CSS,动画
---

## box-shadow
定义是给元素框添加一个或多个阴影

参数： box-shadow: h-shadow v-shadow blur spread color inset;

1. h-shadow: 必需。水平阴影位置，可负值  
2. v-shadow: 必需。垂直阴影位置，可负值  
3. blur:     可选。模糊距离  
4. spread:   可选。阴影尺寸  
5. color:    可选。阴影颜色,位置可以改变(可以放在首或尾)  
6. inset:    可选。将外部阴影改为内部阴影  

实例： box-shadow: 2px 2px 3px 5px #ccc inset;  
可以是多个：box-shadow: #fff 22px -15px 0 6px,
                      	#fff 57px -6px 0 2px;
             
使用： 给容器添加外阴影和内阴影，还可以绘制一些简单的图形，如下  

:::warning 性能
框阴影渲染成本高（CPU中计算的），且大框阴影应用于固定元素是会更糟，因为它在滚动时可能迫使浏览器重绘页面
大部分，在FireFox尤为糟糕，其中固定元素和大 CSS 框阴影可以带来抓取，减慢到 2帧/秒 滚动和 DOM 操纵。  
因此，尽量避免在应用程序中使用大框阴影或太多阴影，因为它会对应用程序的性能产生严重影响。
:::

影响性能的实例：
对某个对象设置设置动画效果，通过keyfram修改box-shadow,在移动端会有些卡顿  
解决：
  boxshadow设置到伪类上，keyframe改变opacity(opacity不会触发浏览器的重绘)  
  

<css-my-boxshadow></css-my-boxshadow>

## 移动元素
移动方法： transform,left/top,margin
说明：前端经常会有一些css来完成的位置平移的动画效果，我们常用的就是`transform: tanslate()` 和定位`position:absolute`

1. translate的位移是相对与本元素的宽高，left/top是相对父级宽高（需设置releatve/absolute）;margin是相对于父级的
2. translate可以开启GPU渲染（硬件加速），translate移动会生成一个新的层，不触发重绘
3. margin是改变元素位移，会改变render tree的结构，必定会引起页面回流和重绘
4. 开启GPU的方法： 1.transform:translateZ(0); 2. will-change: transform;
5. transform的局限性：开启GPU加速，虽然洁身了layout和paint阶段，但会创建Layer，越多的Layer占用内存越大，过多的渲染开销会超过性能的改善

<css-ma-position></css-ma-position> 

## CSS3动画
1. 过度动画：transition,只能控制开始和结束
    参数：
    过度属性(transition-property),  
    延时(transition-delay),  
    过度时间(transiont-duration),  
    过度方式(transition-timing-function)  

2. 自定义动画：animation ，可以设置动画的过程  
- animation-name 动画名称  
- animation-duration 动画时长  
- animation-timing-function 动画速度曲线/ ease/ease-in/ease-out...  
- animation-delay  动画延迟  
- animation-iteration-count  动画应该播放的次数  infinite(无限)/number  
- animation-direction 是否轮流反向播放动画 alternate(反向轮流)/normal  
- @keyframes{from{}to{}}添加动画的step 

#### 注意：
* transition和animation不能同时使用，都有时默认执行animation
* 使用transform-style: preserve-3d ,可以转换为3D效果;
* tansition只能是一段动画，animation可以一直执行
* 尽量使用keyframes和transform进行动画，这样浏览器会自身分配每帧的长度，并作出优化
* 如果非要使用js来进行动画，使用requestAnimateFrame
* 使用2d transform而不是改变top/left的值，这样会有更短的repaint时间和更圆滑的动画效果
* 移动端的动画效果可能会比pc端的差，因此一定要注意性能优化，尽量减少动画元素的DOM复杂性，待动画结束后异步执行DOM操作

<css-my-animation></css-my-animation>
