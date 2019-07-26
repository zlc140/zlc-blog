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

## rem布局(前端适配)
rem是相对于根元素fontsize字体大小的单位，例如根元素（html）的fontsize:16px;则1rem = 16px;


换算规则：
设计稿： 750px;
一个屏宽（clientWidth）是10rem,所以1rem = 75px; html的fontsize设置为75px即可

1. 设置meta标签
```html
<meta name="viewport" content="width=device-width", initial-scale=1;maximum-scale=1>
 
```
- viewport: 虚拟窗口大小
- width: 控制viewport宽度，可以自己设定320px等，一般设置为设备宽度（device-width）
- initial-scale 初始缩放比例，默认为1
- maximum-scale 用户最大缩放比例
- minimum-scale=1, 最小缩放比
- user-scalable=no 禁止用户缩放

2. 设备dpr  像素比    window.devicePixelRatio获取设备的像素比
* 设备物理像素：屏幕上有多少个可以改变颜色的点，入iphone6横向有750个
* 设备独立像素：是虚拟概念，如css设置div宽为10px,则在屏幕表现为屏幕上的10个点

dpr = 设备物理像素/设备独立像素  
iphone6的是 750/375 = 2 dpr是2  
也就是我们css设置1px相当于设备上的2px;  
这时候就需要控制屏幕缩放比来使css的1px = 屏幕的1px  

```js
// dpr大于1的设备会通过meta设置缩放
// 换算比例： 750的设计稿： 1rem = 20px; 1px = 0.05rem;
    var maxWidth = 550;//对于px的
    var isMobile = /Android|webOS|iPhone|iPod|ipad|BlackBerry/.test(navigator.userAgent);
    var isIos = navigator.userAgent.match(/iphone|ipod|ipad/gi)
    !(function (doc, win) {
        //根据缩放比例设置body字体大小，即网页默认字体大小
        function n() {
            doc.body ? doc.body.style.fontSize = 12 * dpr + "px" : win.addEventListener("DOMContentLoaded", n)
        }

        function d() {
            if(isMobile) {
                maxWidth = docEle.clientWidth;
            }
            if (maxWidth / dpr > 640) {
                maxWidth = 640 * dpr;
            }
            docEle.style.fontSize = 20 * (maxWidth / 750) + 'px';
            //限制pc最小宽度
            if (maxWidth < docEle.clientWidth && !isMobile) {
                document.querySelector('html').style.width = maxWidth + 'px';
                document.querySelector('html').classList.add('pc');
            } else {
                document.querySelector('html').style.width = '100%';
                document.querySelector('html').classList.remove('pc');
            } 
        }   
        var docEle = doc.documentElement,
            dpr=parseInt(Math.min(win.devicePixelRatio, 3));
            scale = 1 / dpr,
            resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
            docEle.dataset.dpr = dpr;

        var metaEle = doc.createElement('meta');
        metaEle.name = 'viewport';
        metaEle.content = 'initial-scale=' + scale + ',maximum-scale=' + scale;
        docEle.firstElementChild.appendChild(metaEle);
 
        if (!doc.addEventListener) return;
        if(n(), d(), win.addEventListener(resizeEvent, d, false),win.addEventListener('pageshow', function(e){
            e.persisted && d();
        }), dpr >= 2) {
            var a = doc.createElement("body"), s = doc.createElement("div");
            s.style.border = ".5px solid transparent", a.appendChild(s), docEle.appendChild(a), 1 === s.offsetHeight && docEle.classList.add("hairlines"), docEle.removeChild(a)
        }

    })(document, window);
```

设置了rem单位之后可以在css中通过设置全局换算方法来换算对应的rem单位
```sass
$designWidth: 750;//设计稿宽度
@function px2rem($px) {
  @return $px*750/$designWidth/20 + rem
}

//index.scss中
@import 'px2rem.scss'
.banner{ height: px2rem(180)}

```

其他解决方法
1. [hotcss.js](http://imochen.github.io/hotcss/)
* 保证不同设备下的统一视觉体验。
* 不需要你再手动设置 viewport，根据当前环境计算出最适合的 viewport。
* 支持任意尺寸的设计图，不局限于特定尺寸的设计图。
* 支持单一项目，多种设计图尺寸，专为解决大型，长周期项目。
* 提供 px2rem 转换方法，CSS 布局，零成本转换，原始值不丢失。
* 有效解决移动端真实 1 像素问题
2. [px2rem](https://www.npmjs.com/package/px2rem-loader)[ lib-flexible]()二者配合使用
> npm install px2rem-loader --save-dev //可以将css中的px转成rem
npm install lib-flexible --save //在main中引入，用于设置rem的js
* 需要在webpack中配置loader
* 需要配合js使用，有耦合性
:::tip
    如果设置rem的时候修改了meta缩放（dpr=2是设置scale=0.5）,这个时候屏幕宽度即clientWidth = 设备宽度 * 3
    动态设置scale虽然解决了1px(在一些设备上比较宽)的问题，当同时引发出来的问题就是不能在设置media来响应式了
:::

## 自适应/响应式
1.自适应布局： 需要考虑不同终端，手机，电脑，ipad等设备，使用固定分割点进行布局，只需考虑几种不同状态的样式

2. 响应式布局：需要考虑不同终端，流式布局+媒体查询，同时页面元素随着窗口变化而自动适配

>差别：自适应不同分辨率的布局不变，响应式可能会变（如手机上是一行，电脑上是多行的）

- 设置meta标签（初始为1，禁止缩放）
- 媒体查询 @media，这个是可以直接设置在link上的，更具不同的宽度加载不同的css
```html
<link href="styles.css" rel="stylesheet" media="(max-width:480px)">
<style>
@import url(styles.css) (max-width:480px)
/** iPad **/
@media only screen and (min-width: 768px) and (max-width: 1024px) {}
/** iPhone **/
@media only screen and (min-width: 320px) and (max-width: 767px) {}

//解决1px太粗的问题可以直接设置border为.5px;也可以通过缩放
@media (device-pixel-ratio: 2) { .1px {
    /*border: .5px solid #000;*/
    height: 1px;
    width: 200%;
    border: none;
    transform: scale(.5);
}}
</style>

```

```html
<!--设置不同的图片-->
<img src="image.jpg"
     data-src-600px="image-600px.jpg"
     data-src-800px="image-800px.jpg"
     alt="">
     
<!--  css-->
<style>
 @media (min-device-width:600px) {
     img[data-src-600px] {
         content: attr(data-src-600px, url);
     }
 }
 
 @media (min-device-width:800px) {
     img[data-src-800px] {
         content: attr(data-src-800px, url);
     }
 }    
</style> 
```

3. 流式布局： 使用百分比定义宽度，高度px来固定，可根据父元素实时调整尺寸，尽可能适应不同屏幕




