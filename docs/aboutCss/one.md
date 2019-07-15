---
title: 裁剪路径
data: "2019/2/26 14:00:00"
tag: CSS
meta: 
- name: description
  content: clip-path
- name: keywords
  content: clip-path,CSS,动画
---

### clip-path介绍
直译过来就是裁剪路径，使用SVG或形状定义一个HTML元素的可见区域的方法

兼容性： IE和Edge直接不支持，使用的时候添加`-webkit-`

### 基本图形
1. inset()

>inset()定义一个矩形，不是rect而是inset

inset的参数： top right bottom left round(radius,round后边要跟圆角的比例)

实例： clip-path: inset(top right buttom left round radius)


2. circle()
> circle()定义一个圆

circle参数： 1. 圆半径，默认元素宽高中短的为直径，支持百分比 2.圆心位置，默认元素中心点

实例： clip-path: circle(30% at 150px 120px)
简写： clip-path: inset(50%）//半径元素一半，中心为元素中心

3. ellipse()

>ellipse() 定义一个椭圆

ellipse()参数：a: x轴半径，默认宽一半 b:y轴半径，默认高一半 c:中心位置，默认元素中心

实例：clip-path: ellipse(45% 30% at 50% 50%)

4. polygon
> polygon()定义一个多边形

polygon参数：a:填充规则（默认nonzero, 还可以是evenodd）可省略,b: 多个坐标

实例： clip-path: polygon(50% 0, 500% 50%, 0 100%)

<css-clip-path></css-clip-path>

