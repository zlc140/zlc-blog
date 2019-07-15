---
title: 数据拷贝
data: "2018/12/25 14:00:00"
tag: ['js', '数据拷贝']
meta: 
- name: description
  content: 数据拷贝
- name: keywords
  content: JS, 数据拷贝
---

### 浅拷贝
> 浅拷贝是对每个属性进行复制，遇到应用类型则复制其引用的地址,所以在修改其引用的的那个值的时候就会修改原来的变量


浅拷贝方法：
for...in , Object.assign(), 扩展运算符..., Array.proptotype.slicce(), concat()


### 深拷贝
> 深拷贝复制变量，遇到非基本类型变量递归直到基本类型，复制其值，这样新旧的对象是完全隔离的

1. 深拷贝最简单的实现： JSON.parse(JSON.stringgify(obj))
缺点： 
a. 对象的属性值是函数时，无法拷贝。
b. 原型链上的属性无法拷贝
c. 不能正确的处理 Date 类型的数据
d. 不能处理 RegExp
e. 会忽略 symbol
f. 会忽略 undefined

2. js实现深拷贝
```js
// 思路是：深度优先遍历（递归就是深度优先的思路）
function deepCopy(obj, hash= new WeakMap()) {
    if(obj instanceof RegExp) return new RegExp(obj);
    if(obj instanceof Date) return new Date(obj);
    if(obj instanceof Function) return new Function(obj);
    if(obj === null || typeof obj !== 'object') {
        return obj
    }
    // obj是数组则 obj.constructor() 是 [Function: Array]
    // obj是对象则 obj.constructor() 是 [Function: Object]
    let t = new obj.constructor()
    hash.set(obj,t)
    for(let key in obj) { 
        if(obj.hasOwnProperty(key)){ //是否是自身的属性
            t[key] = deepCopy(obj[key], hash)
        }
    }
    return t
}

// 思路：广度优先遍历 - 未完成
    
function deepCopy2(obj) {
    let origin = [obj]
    let copyObj = {}
    while (origin.length > 0) {
        let itmes = origin.shift()
        
    }
    
}

```
