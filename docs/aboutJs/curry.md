---
title: 函数柯里化
data: "2019/06/18 14:00:00"
tag: ['js', 'curry', '函数柯里化']
meta: 
- name: description
  content: 函数柯里化
- name: keywords
  content: JS,函数柯里化
---
## 函数柯里化
- 定义：在数学和计算机科学中，柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术
     函数的length是该函数的参数的个数

- 作用：减少代码冗余，增加可读性，装X

- 上代码
```js
function sum (a, b, c) {
	console.log(a + b + c);
}
sum(1, 2, 3); // 6
//柯里化 写法一
function curry(fn, curryArgs) {
	return function() {
		//函数参数数组化
		let args = [].slice.call(arguments)

		if(curryArgs != undefined) {
			args = args.concat(curryArgs)
		}
		//fn.length 返回的是函数参数的长度
		if(args.length < fn.length){
			//递归调用到全部参数放到一起
			return curry(fn, args)
		}
		//递归出口
		return fn.apply(null, args)
	}
}
// 写法二

function curry2(fn) {
    //这个fn.length获取到的是fn的预设参数的长度
	if(fn.length <= 1) return fn;
	const generator = (...args) => {
		if(fn.length === args.length) {
			return fn(...args)
		}else {
			return (...args2) => {
				return generator(...args, ...args2)
			}
		}
	}
	return generator
}
```
 这种开始的时候传部分参数的方式是偏函数。[bind](/aboutJs/callApply.md#bind方法)就是偏函数的典型的代表
```js
// 调用
// let fn = curry(sum,2)
// fn(1,3) //6
let fn = curry(sum)
fn(1,2)(3) //6
fn(1)(2,3) //6
fn(1,2,3)  //6
```

- 数据类型判断
```js
const isType = (type) => (value) =>  Object.prototype.toString.call(value) === '[object '+value+']'
let isArray = isType('Array')
let arr = []
isArray(arr) // true
```

## 缓存计算
它用于优化比较耗时的计算，通过将计算结果缓存到内存中，这样对于同样的输入值，下次只需要中内存中读取结果。
可用于有大量重复性的计算的方法中

```js
function memoizeFunction(func) {
	const cache = {};
	return function() {
		let key = arguments[0];
		if (cache[key]) {
			return cache[key];
		} else {
			const val = func.apply(null, arguments);
			cache[key] = val;
			return val;
		}
	};
}

const fibonacci = memoizeFunction(function(n) {
	return (n === 0 || n === 1) ? n : fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(100)); // 输出354224848179262000000
console.log(fibonacci(100)); // 输出354224848179262000000

```
