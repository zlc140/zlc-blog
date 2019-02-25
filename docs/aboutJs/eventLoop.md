---
title: 事件循环
data: "2018/12/25 14:00:00"
tag: ['js', '事件循环','Event Loop']
meta: 
- name: description
  content: 事件循环
- name: keywords
  content: JS,事件循环,Event Loop
---


## js事件循环 
`js`执行为单线程，所有代码皆在主线程调用栈完成执行。当主线程任务清空后才会去轮询取任务队列中任务。

1. 同步和异步
    同步：是指调用函数可以立刻得到结果 (调用后必须执行完才会继续下个任务)
    异步：调用函数后需要通过一定手段在将来得到结果`setTimeout`,`promise`,`ajax`,`dom`事件 (调用后不需等待结果继续下个任务)
    
2. 任务队列
    同步任务： 排队执行
    异步任务：不在主线程，而进入任务队列，等待队列通知到主线程可以执行了才会执行
    
3. 执行顺序
    -  同步任务在主线程执行，形成一个执行栈
    -  但主线程为空时，检查任务队列是否为空，为空继续检查，不为空则继续c
    -  去任务队列首位，压入执行栈
    -  执行新任务
    -  检查执行栈，为空则跳到b;不可则继续执行
    
    
4. `Event Loop` (入栈出栈的循环)
    不同的异步函数执行放入不同的任务中 === 宏任务(`macro-task`)  微任务(`micro-task`)
   
   `macro-task`包括： `setTimeout`,`setInterval`,`setImmediate`,`I/O`,`UI redndering`
   `micro-task`包括： `process.nextTick`,`Promise`,`Object.observe`,`MutationObserver`
   
   - 执行完主线程任务
   - 取微任务执行到清空
   - 取一个宏任务执行
   - 取微任务执行到清空
   - 重复c->d
 
  
5. 注意：
   其实`promise`的`then`和`catch`才是`microtask`，本身的内部代码不是。
    `script`标签的内容会被当成一个独立的`task`,即会执行完前面的`microtask`,才会继续执行下个`script`
    - 浏览器和`node`中执行不一样
    - 任务队列是先入先出
    
```js
    console.log('global') 
    for (var i = 1;i <= 5;i++) {
      setTimeout(function() {
        console.log(i)
      },i*1000)
      console.log(i)
    }
    
    new Promise(function (resolve) {
      console.log('promise1')
      resolve()
     }).then(function () {
      console.log('then1')
    })
    
    setTimeout(function () {
      console.log('timeout2')
      new Promise(function (resolve) {
        console.log('timeout2_promise')
        resolve()
      }).then(function () {
        console.log('timeout2_then')
      })
    }, 1000)
     
```
结果: global - 1-2-3-4-5 - promise1 - then1 - 6 - timeout2 - timeout2_promise - timeout2_then - 6()

[参考文献](https://juejin.im/post/5aacd1766fb9a028cb2d6766)

## `node`事件循环 

- 在`node`中事件每一轮循环按照顺序分为6个阶段，来自`libuv`的实现：

    1. `timers`：执行满足条件的`setTimeout`、`setInterval`回调。
    2. `I/O callbacks`：是否有已完成的`I/O`操作的回调函数，来自上一轮的`poll`残留。
    3. `idle`，`prepare`：可忽略
    4. `poll`：等待还没完成的`I/O`事件，会因`timers`和超时时间等结束等待。
    5. `check`：执行`setImmediate`的回调。
    6. `close callbacks`：关闭所有的`closing handles`，一些`onclose`事件。

[参考文献1](https://juejin.im/post/5aa5dcabf265da239c7afe1e)


