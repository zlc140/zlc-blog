---
title: generator
data: "2019/06/18 14:00:00"
tag: ['es6', 'generator']
meta: 
- name: description
  content: generator生成器
- name: keywords
  content: es6, generator
---

## 定义
`generator`是es6引入的新的数据类型，它看上去很像函数，但可以多次返回
下面的g就是一个generator实例，调用它只会得到一个遍历器对象

```js
function* gen() {
    yield 1;
    yield 2;
    yield 3;
}
var g = gen();

console.log(g);         // Generator {} 
console.log(g.next());  // { value: 1, done: false }
console.log(g.return(5));  // { value: 5, done: true }
console.log(g.next()); //{ value: undefined, done: true }

```

## 特性
1. 惰性求值 （这一特性可用来做暂缓执行函数）只有调用`next()`之后才会执行函数获取结果
2. 自动遍历  可以通过`for...of,Array.form,[...]`来隐式调用next
3. `Generator.prototype.return()`方法用于立即结束遍历，并返回给定的值。
```js
function* numbers () {
    yield 1;
    yield 2;
    return 3;
    yield 4;
}

//for...of
var gen1 = numbers();
for (let n of gen1) {
    console.log(n);    //1  2
}

//Array.from
console.log(Array.from(numbers()));  // [1, 2]

//扩展运算符(…)
console.log([...numbers()]);    // [1, 2]

//解构赋值
let [x, y] = numbers();
console.log(x);   //1
console.log(y);   //2
```

## 实现类async/await
多个ajax请求按照顺序执行
```js
function run(generatorFunc) {
    let it = generatorFunc()
    let result = it.next()

    return new Promise((resolve, reject) => {
        const next = function(result) {
            if(result.done) {
                resolve(result.value)
            }
            result.value = Promise.resolve(result.value)
            result.value.then(res => {
                let result = it.next(res)
                next(result)
            }).catch(err => {
                reject(err)
            })
        }
        next(result)
    })
}

function* func() {
    let res = yield api(data)
    cosnole.log(res)
    let re2 = yield api(data2)
    cosnole.log(res2)
    console.log(res,res2)
}

run(func)
```

## 实现类promise.all()
//通过添加`resume`函数作为推进器，使得函数可以自动连续依次执行
```js
function delay(time, callback){
    setTimeout(function(){
        callback("sleep "+time);
    },time);
}

function run(genFunc) {
    var g = genFunc(resume);
    function resume(value) {
        g.next(value);
    }
    g.next();
}
//注意这里调用的delay不能是同步的，必须要是异步的
run(function* delayedMsg(resume) {
    console.log(yield delay(1000, resume));
    console.log(yield delay(2000, resume));
});

```
