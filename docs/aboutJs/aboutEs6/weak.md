---
title: Set&Map
data: "2019/06/18 14:00:00"
tag: ['es6', 'set', 'map']
meta: 
- name: es6遍历
  content: es6遍历
- name: keywords
  content: es6, set, map
---


### Set和WeakSet
- Set

1. Set是es6提供的新的数据结构，类似数组，但是Set的的成员值是唯一的
2. 所以Set可以用来做数组去重
3. set原型上的方法有： Set.prototype.add(val)//添加元素 delete(val)//删除元素， has(val)//是否有某个元素，clear()//清楚所有元素
4. 遍历方法： Set.prototype.keys() //返回key的遍历器 values()//值 entries()//键值对 forEach() //遍历
5. for...of可以直接遍历set的key值 因为set默认有Set.prototype[Symbol.iterator] 遍历器
```js
const a = new Set();
[1,2,1,3].forEach(v => a.add(v))

for(let i of a){console.log(i)}
[...a] //[1,2,3]
Array.form(a) //[1,2,3]
a.size //3
a.add(4).add(5) //[1,2,3,4,5]
a.delete(1) 
a.size //4
a.has(2) //true

// 1
// 2
// 3
```

- WeakSet
1. 结构和set类似
2. 和set的区别
    a. weakSet的成员只能是对象  
    b. WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。
3. WeakSet 不可遍历。
4. 使用：WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。
```js
const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}
we.add(1)
// TypeError: Invalid value used in weak set

```

```js
const foos = new WeakSet()
class Foo {
  constructor() {
    foos.add(this)
  }
  method () {
    if (!foos.has(this)) {
      throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用！');
    }
  }
}
```
上面代码保证了Foo的实例方法，只能在Foo的实例上调用。这里使用 WeakSet 的好处是，foos对实例的引用，不会被计入内存回收机制，所以删除实例的时候，不用考虑foos，也不会出现内存泄漏。

### Map和WeakMap

1. 类似Object的数据结构，键值对的结合，和object的差别是它的"键"可以不限制类型（Object的key限制为字符串）
2. Map可以通过[...]转为数组，不过是二位数组
```js
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false

const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);
map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"

map.set('edition', 6)        // 键是字符串
map.set(262, 'standard')     // 键是数值
map.set(undefined, 'nah')    // 键是 undefined

```
