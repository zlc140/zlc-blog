---
title: new原理
data: "2019/06/18 14:00:00"
tag: ['js', 'new原理']
meta: 
- name: description
  content: new原理
- name: keywords
  content: JS,new原理
---

- new操作符的过程

 1. 创建一个类实例，创建空对象{}, 设置`Object.__proto__ == Person.prototype`
 2. 初始化实例：构造函数Person被传入参数并被调用，将this指向设定为实例obj
 3. 返回实例obj
 
 ```js
var Person = function(name){
    this.name = name;
}
Person.prototype.say = function() {
    console.log('hello,' + this.name)
}

var p1 = new Person('JAX')
p1.say()

// 方法一：
function objectFactory() {
    let obj = new Object();
    let Constructor = [].shift.apply(arguments);
    obj.__proto__ = Constructor.prototype;//第一步
    return function () {
        var ret = Constructor.apply(obj, arguments);//第二步
        return ret == 'object' ?ret : obj //第三步
    }
}
var p2 = objectFactory(Person)('JSX')

// 方法二是：

const selfNew = function(fn, ...rest) {
    let instance = Object.create(fn.prototype)
    let res = fn.apply(instance, rest)
    return isComplexDataType(res) ? res : instanve
}

const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && obj !== null


var p3 = selfNew(Person, 'rose')
var p4 = selfNew(Object, {'name': 123})


```
