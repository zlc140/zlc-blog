---
title: JS动画
data: "2018/12/25 14:00:00"
tag: ['js', 'JS动画']
meta: 
- name: description
  content: JS动画
- name: keywords
  content: JS, JS动画
---

## 前端动画

1. 常见的CSS3 的[`animation`和`translate`](/aboutCss/#css3动画)

2. [web animation](https://developer.mozilla.org/zh-CN/docs/Web/API/Animation),此功能还未浏览器开发

3. requestAnimationFrame接受一个函数，此函数将在下一帧之前执行，不需要太多计算，只需在下一帧渲染前修改掉数值即可  
`window.requestAnimationFrame()`告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。  
回调函数执行次数一般是每秒60次/ 它是和设备相关联的，如果屏幕刷新率是60Hz,那么回调函数就每16.7ms被执行一次，
由系统来决定回调函数的执行时机  
```js
 /**
 * 创建一个400px内匀速运动的方块
     *  执行补间动画方法
     *
     * @param      {Number}    start     开始数值
     * @param      {Number}    end       结束数值
     * @param      {Number}    time      补间时间
     * @param      {Function}  callback  每帧的回调函数
     */
    function animate(start, end, time, callback) {
        let startTime = performance.now() // 设置开始的时间戳
        let differ = end - start // 拿到数值差值(移动的距离)
        // 创建每帧之前要执行的函数
        function loop() {
            raf = requestAnimationFrame(loop) // 下一阵调用每帧之前要执行的函数
            const passTime = performance.now() - startTime // 获取当前时间和开始时间差
            let per = passTime / time // 计算当前已过百分比
            if (per >= 1) { // 判读如果已经执行
                per = 1 // 设置为最后的状态
                cancelAnimationFrame(raf) // 停掉动画
            }
            const pass = differ * shake(per) // 通过已过时间百分比*开始结束数值差得出当前的数值
            callback(pass) // 调用回调函数，把数值传递进去
        }
        let raf = requestAnimationFrame(loop) // 下一阵调用每帧之前要执行的函数
    }
    //这个是把匀速运动改为非匀速运动（匀加速）
    function  easeIn(time) { // 接收一个当前的时间占总时间的百分比比
        return time ** 2
    }
    //这个是把匀速运动改为非匀速运动（抖一抖）
    function shake(time) {
        if (time < 0.6) {
            return (time / 0.6) ** 2
        } else {
            return Math.sin((time-0.6) * ((3 * Math.PI) / 0.4)) * 0.2 + 1
        }
     }
    // 使用：
     box = document.querySelector('.box')
    // requestAnimationFrame(this.add)
    animate(0, 400, 1000, value => {
        box.style.transform = `translateX(${value}px)` // 将数值设置给 方块 的 css 属性 transform 属性可以控制元素在水平方向上的位移
    })
```
<JS-animation></JS-animation>
