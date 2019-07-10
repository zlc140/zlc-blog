---
title: 循环遍历
data: "2018/12/25 14:00:00"
tag: ['js', '循环遍历']
meta: 
- name: description
  content: 循环遍历
- name: keywords
  content: JS,循环遍历
---

### 1. 常用的循环遍历方法
1. for(){}  
2. forEach()  
3. switch...case  
4. while  
5. map()  
6. filter()  
7. some()  
8. for...in  
9. for...of  
10. jq的$.each()
11. reduce  
12. es6 赋值解构

### for循环
关键字： 
break: 强制结束整个循环，后面的代码不再执行，循环结束  
continue: 结束本轮循环，contiune后面的代码不再执行，继续执行下一轮循环  

### 循环中连续使用async/await

1. 通过for循环异步获取数据，在for中使用await可以等待获取到数据之后再执行之后的数据
2. forEach不支持Promise的感知，所以不会等待await,会继续执行,所以不要forEach结合await使用
3. map中使用 await  map 始终返回promise数组，这是因为异步函数总是返回promise。
所以map要通过promise.all（并发）来获取所有的执行结果
4. filter 中await不工作，因为在filter中的判断条件返回一个promise(总为true),所以可以先map+primise.all获取值再filter过滤
5. reduce中await会是总值变的混乱，所以也是通过map+primise.all之后在计算all

```js
const fruitBasket = {
 apple: 27,
 grape: 0,
 pear: 14
};
const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
};

const getNumFruie = fruit => {
  return sleep(1000).then(v => fruitBasket[fruit]);
};
const fruitsToGet = ['apple', 'grape', 'pear']; 
const forLoop = async _ => {
  console.log('start');

  for (let index = 0; index < fruitsToGet.length; index ++) {
    const fruit = fruitsToGet[index];
    const numFruit = await getNumFruit(fruit);
    console.log(numFruit);
  }
  console.log('End')
}
forLoop()
//start
//27
//0
//14
//end

const forEachLoop = _ => {
  console.log('Start');

  fruitsToGet.forEach(async fruit => {
    const numFruit = await getNumFruit(fruit);
    console.log(numFruit)
  });

  console.log('End')
}
forEachLoop()
//start
//end
//27
//0
//14


const mapLoop = async _ => {
  console.log('Start')
  const promises = await fruitsToGet.map(async fruit => {
    const numFruit = await getNumFruit(fruit);
    return numFruit;
  })
  const numFruits = await Promise.all(promises);
  console.log(promises);
  console.log(numFruits);

  console.log('End')
}

//“Start”;
//“[Promise, Promise, Promise]”;
// [27,0,14]
//“End”;

```
[参考文献](https://www.jianshu.com/p/5b8c695474f0)

### 2. forEach,map
es5新增的循环遍历方法
同：
1. 写法相似
2. 都只能遍历数组
3. 匿名函数this指向window
4. continue,break, return 不能终止循环

不同： 
1. map返回新的数组，不改变原数组，匿名函数的返回值为每一项的新值
2. forEach无返回值，不改变原数组

### 3. for...in, for...of
同： 
1. break可以跳出循环，中断所有

不同： 
1. for...in es5新增方法 用来循环遍历当前对象可枚举的属性， for...of es6新增方法
2. for...in 遍历对象的key值，类似Objec.keys(),遍历数组时返回下标（string类型,所以它常用来遍历对象）
3. for...of 具有iterable类型的集合都可以遍历(forEach也可以)，如map,set,Array,Object

### while循环
1. 只要条件为true就一直循环下去
2. do/while是while的变体，它在执行判断条件之前会执行一次do中的代码块

### filter,some,every,reduce
0. 他们都是数组的方法
1. filter过滤数组，验证返回通过条件的那些项，返回新数组
2. some检测数组中是否有满足某添加的值，有返回true,没有返回false；some不检测空数组
3. every检测数组是否每一项都符合某条件，遇到不符合的直接返回false,都符合返回true
4. reduce遍历数组，计算修改，重新返回一个新的数组或对象


### Object.keys(), Object.getOwnPropertyNames()
1. Object.keys()遍历对象返回对象属性名（可枚举）
2. Object.getOwnPropertyNames()遍历对象属性名（包括不可枚举）

```js
let arr = [1,2,3,4,5]

for(var i =0; i < arr.length; i++){
    console.log(arr[i])
}
// 数组。obj都可
var a = $.each(arr,function(index,item,arr){    //index:索引 item: 元素。
      console.log(index,item);
      console.log('this',this);  //this指向当前元素
})

let obj = {'a': 1, 'b': 2, 'c': 3} //私有属性
Object.prototype.say = function(val){ //这是共有属性
    console.log(val)
}
for(let key in obj) {
    if(obj.hasOwnProperty(key)) { //判断是否是私有属性，是才继续
        console.log(key)
    }
}

//forEach的跳出循环方法 try...catch
try {
    var array = ["first", "second", "third", "fourth"];
    array.forEach(function (item, index) {
    if (item == "third") {
        var a = aaaa; // first second 后就报错，就跳出循环了
        throw new Error("ending");//报错，就跳出循环
    } else {
    console.log(item);
};
});
} catch (e) {
    if (e.message == "ending") {
        console.log("结束了");
    } else {
        console.log(e.message);
    };
};

//判断arr是否有6这个项
let has6 = arr.some(item => item === 6) //false
let everyTrue = arr.every(item => item > 0) //true
/**
* @callback（all, item, index） 调用每一项的方法
*       all是总值，item对应项，对应下标
*       返回all
* @all 返回值的初始值
*/
arr.reduce((all, item, index) => {
    all[item] = item
    return all;
}, {})
```
