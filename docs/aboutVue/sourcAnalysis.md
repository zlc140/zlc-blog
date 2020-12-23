---
title: vue源码分析
data: "2020/12/16 15:38"
tag: vue
meta: 
- name: description
  content: Vue
- name: keywords
  content: vue
--- 

## vue双向数据绑定


## Object.defineProperty 与 proxy  数据拦截对比

1. Object.defineProperty

```js
let data = {
  m:1,
  n: {
    o: 123
  },
  h: [4,2,3]
}

function observe(data) {
  if (typeof data === 'object') {
    Object.keys(data).forEach(key => {
      defineProperty(data, key, data[key])
    })
  }
}

function defineProperty(obj, key, val) {
  observe(val) // 递归源数据，深度劫持
  Object.defineProperty(obj, key, {
    get() {
      console.log('get')
      return val
    },
    set(newVal) {
      console.log('set)
      if(newVal !== val) val = newVal
    }
  })
}

// ========== Q: 此时对obj有了深度的拦截，当对数据还是无法拦截 =========

```
所以对数据的的数组的push,pop,shift等方法进行拦截
```js
  function arrayMethods() {
    const arrProto = Array.prototype
    const arrMethods = Object.create(arrProto)
    const methods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']
    methods.forEach(method => {
      const original = arrMethods[method]
      Object.defineProperty(arrayMethods, method, {
        value: function v(...args) {
          console.log('set arrayMethods')
          return original.apply(this, args)
        }
      })
    })
    return arrMethods
  }
  function observe (data) {
    if (typeof data==='object') {
      if (Array.isArray(data)) {
        // 数组走方法拦截
        data.__proto__ = arrayMethods()
      }else {
        // 其他走属性值拦截
        defineProperty(data, key, data[key])
      }
    }
  }
```

2. 霸气的 <code>Proxy</code> 拦截

```js
function defineReactive(obj) {
  Object.keys(obj).forEach(key => {
    if(typeof obj[key] === 'object') {
      obj[key] = defineReactive(obj[key)
    }
  })
  return new Proxy(obj, {
    get(target, key) {
      console.log('get')
      return target[key]
    },
    set(target,key, val) {
      console.log('set')
      return target[key] = val
    }

  })
}
data = defineReactive(data)
```
<code>proxy</code>可直接对对象和数组的各种的方法进行拦截

