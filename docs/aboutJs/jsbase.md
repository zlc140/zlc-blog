---
title: js基础知识
data: "2020/7/9 10:30"
tag: ['javaScript', '基础']
meta: 
- name: description
  content: javaScript基础
- name: keywords
  content: JS,基础
---

## javaScript如何工作：引擎，运行时和调用堆栈得概述
1. JavaScript引擎：
   它是执行js代码的程序或解释器。js引擎可以实现为标注解释器；或以某种形式将js编码为字节码的即使编译器
2. JS引擎：
    * V8  --google开发，c++编写 开源
    * Rhino --Mozilla基金会管理，开源，java开发
    * SpiderMonkey — 是第一个支持 Netscape Navigator 的 JavaScript 引擎，目前正供 Firefox 使用   
    * JavaScriptCore — 开源，以Nitro形式销售，由苹果为Safari开发
    * KJS — KDE 的引擎，最初由 Harri Porten 为 KDE 项目中的 Konqueror 网页浏览器开发
    * Chakra (JScript9) — Internet Explorer
    * Chakra (JavaScript) — Microsoft Edge 
    * Nashorn, 作为 OpenJDK 的一部分，由 Oracle Java 语言和工具组编写
    * JerryScript —  物联网的轻量级引擎  
 3. V8 也流行与nodejs；v8将js代码转换成更高效的机器码，而不是使用解释器（不同于最初的引擎）不产生字节码/中间代码；效率有效提升
     SpiderMonkey & Rhino（Mozilla）等现代浏览器与老版本的区别
    
简单总结：
1. v8引擎(谷歌，node)得两个组成部分：内存堆meeory heap（数据存储得地方）调用栈 Call Stack（代码执行的地方）
2. 有些浏览器api不是有js引擎提供的，如dom,定时器，ajax等，我们称之为web api
3. js是单线程编程语言，只有一个调用堆栈。调用栈是一中数据结构，记录了我们程序的位置。运行一个函数时会将其放到栈顶，函数进入返回，就从栈顶弹出
4. 每个进入调用栈的都称为调用帧，方便堆栈追踪
5. 堆栈溢出： 调用堆栈中的函数调用数量超出了调用堆栈的实际大小，浏览器会抛出一个溢出错误
6. 并发与时间循环产生的原因：当调用堆栈有函数要执行时，浏览器实际不能做其他任何事--它被阻塞了；如果函数执行时长过久会造成卡顿甚至报错，询问你是否关闭web页面

