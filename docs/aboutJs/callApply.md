---
title: callapply原理
data: "2019/06/18 14:00:00"
tag: ['js', 'call', 'apply']
meta: 
- name: description
  content: call,apply
- name: keywords
  content: JS,call,apply
---

## call, apply, bind

1. 相同点： 都立足于改变this指向

2. 不同点：
    * call和apply会立即执行函数，bind只绑定，不执行
    * call的参数是枚举，apply参数是数组，且二者为实参，bind是预设参数
    
```js
var obj = {
    age: 22
}

function say(name) {
    console.log('我是：' + name + '|今年：' + this.age);
}

say.call(obj, 'jack'); // 我是：jack|今年：22
say.apply(obj, ['mike']); // 我是：mike|今年：22

```

## `call`的实现方法
```js
// js实现call方法 添加到原型上的方法如果方法内有使用this，则不能使用箭头函数
Function.prototype.selfCall = function(context, ...args) {
    let func = this;
    console.log(this)
    context || (context = window);
    if(typeof func !== 'function') throw new TypeError('this is not function')
    let caller = Symbol('caller')
    context[caller] = func
    let res = context[caller](...args)
    delete context[caller]
    return res
}
```

## `bind`方法 
只绑定不调用，需要再次调用才能打印
```js
var a = {
    user:"追梦子",
    fn:function(e,d,f){
        console.log(this.user); //追梦子
        console.log(e,d,f); //10 1 2
    }
}
var b = a.fn;
var c = b.bind(a,10);
c(1,2);
```
