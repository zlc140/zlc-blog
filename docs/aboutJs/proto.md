---
title: 原型和继承
data: "2019/06/18 14:00:00"
tag: ['js', 'Object', 'prototype','原型链','继承']
meta: 
- name: description
  content: 原型和继承
- name: keywords
  content: JS,Object,prototype,原型链,继承
---
[[toc]]

## JS原型

- 定义：  
每个构造函数（constructor)都已一个原型对象（ptototype），原型对象都包含一个指向构造函数的指针，
而实例（instance）都包含一个指向原型对象的指针
    
- 原型链
> 如果让原型对象指向另一个类型的实例，即：constructor1.prototype = instance2 会发生什么呢？
现在要找实例对象instance1上的p1属性：

1. 首先会在instance1对象内部属性上找一遍；
2. 接着在instance1.__proto__(constructor1.prototype)上找（即instance2上找一遍）
3. 如果instance2上还没有，就会找instance2.__proto__(constructor2.prototype)上找一遍直至找到或者到object.prototype

> 搜索轨迹：instance1 => instance2 => constructor2.prototype ..... => object.prototype

```js

function Father(){
	this.property = true;
}
Father.prototype.getFatherValue = function(){
	return this.property;
}
function Son(){
	this.sonproperty = false;
}
//继承 Father
Son.prototype = new Father();//Son.prototype被重写,导致Son.prototype.constructor也一同被重写
Son.prototype.getSonVaule = function(){
	return this.sonproperty;
}
var instance = new Son();
alert(instance.getFatherValue());//true

```

- 确定原型和实例之间的关系
1. instanceof
由于原型链的关系所以一下都是true
> console.log(instance instanceof Father) //true  
> console.log(instance instanceof Son) //true  
> console.log(instance instanceof Object) //true  

2. isPrototypeOf()
同样是在原型链上出现过的原型就是true
> console.log(Object.prototype.isPrototypeOf(instance))  
> console.log(Father.prototype.isPrototypeOf(instance))  
> console.log(Son.prototype.isPrototypeOf(instance))  

- 原型链继承的问题  
> 问题1：原型链上有引用类型时会在所以实例中共享
> 问题2：创建子实例时不能向父的构造函数传参数

## 构造函数继承
基本思想:即在子类型构造函数的内部调用超类型构造函数.
```js
function Father(){
	this.colors = ["red","blue","green"];
}
function Son(){
	Father.call(this);//继承了Father,且向父类型传递参数
}
var instance1 = new Son();
instance1.colors.push("black");
console.log(instance1.colors);//"red,blue,green,black"

var instance2 = new Son();
console.log(instance2.colors);//"red,blue,green" 可见引用类型值是独立的

```
* 优点： 解决了原型链直接继承的那两个问题
* 缺点： 随之而来的是子的实例无法获取到父的原型上的方法，方法只能在构造函数中定义，函数复用也就不可用了

## 组合继承
基本思路: 使用原型链实现对原型属性和方法的继承,通过借用构造函数来实现对实例属性的继承.

```js
function Animal(name) {
    this.name = name;
    this.type = ['金','木','水','火','土']
}
Animal.prototype.eat = function(food) {
    console.log(this.name + '最喜欢吃的食物是：'+ food)
}

// 这里有传参和不传的差别
function Cat(name, age) {
    Animal.call(this, name)
    this.kind = 'cat'
    this.age = age
}
//function Cat() {
   // Animal.call(this, ...arguments)
   // this.kind = 'cat'
//}
Cat.prototype = new Animal();
Cat.prototype.sayAge = function(age) {
    console.log(this.name + '是一只' + age + '岁的' + this.kind)
}

let mimi = new Cat('mimi')

```
* 优点： 避免了原型链继承和构造继承的缺点
* 缺点： 调用了两次父类构造函数，有一定的不必要的损耗


## 原型链继承
在object()函数内部, 先创建一个临时性的构造函数, 然后将传入的对象作为这个构造函数的原型,最后返回了这个临时类型的一个新实例.

```js
function object(o) {
    function F(){}
    F.prototype = o;
    return new F();
}

let obj = {
    kind: ['a','b','c']
}

let p1 = object(obj)

// ECMAScript5新增了Object.create()规范化了上面的方法

let p2 = Object.create(obj)
```
* 提醒: 原型式继承中, 包含引用类型值的属性始终都会共享相应的值, 就像使用原型模式一样.
* 优点：简单

## 寄生式继承

寄生式继承的思路与(寄生)构造函数和工厂模式类似, 即创建一个仅用于封装继承过程的函数,该函数在内部以某种方式来增强对象,最后再像真的是它做了所有工作一样返回对象. 如下.
```js
function createAnother(original){
	var clone = object(original);//通过调用object函数创建一个新对象
	clone.sayHi = function(){//以某种方式来增强这个对象
		alert("hi");
	};
	return clone;//返回这个对象
}

let p3 = createAnother(obj)
```
* 注意: 使用寄生式继承来为对象添加函数, 会由于不能做到函数复用而降低效率;这一点与构造函数模式类似.

## 寄生组合式继承

其背后的基本思路是: 不必为了指定子类型的原型而调用超类型的构造函数我们所需要的无非就是父类原型的一个副本而已.本质上,就是使用寄生式继承来继承父类的原型,然后在将结果指定给子类的原型:

```js
function extend(subClass,superClass){
	var prototype = object(superClass.prototype);//创建对象（父类原型副本） 等同于使用Object.create(superType.prototype)
	prototype.constructor = subClass;//增强对象 为副本添加constructor属性,弥补重写原型而失去的constructor属性
	subClass.prototype = prototype;//指定对象 将创建的对象(副本)赋值给子类的原型
}

// 使用方法以上面组合的Animal为例子
extend(Cat, Animal)
Cat.prototype.sayage = function(age) {
    console.log(age, 'age')
}
// ====================================  升级版  ===================================

function extend2(subClass, superClass) {
  var F = function() {};
  F.prototype = superClass.prototype;
  subClass.prototype = new F(); 
  subClass.prototype.constructor = subClass;

  subClass.superclass = superClass.prototype;
  if(superClass.prototype.constructor == Object.prototype.constructor) {
    superClass.prototype.constructor = superClass;
  }
}

function Father(name){
	this.name = name;
	this.colors = ["red","blue","green"];
}
Father.prototype.sayName = function(){
	alert(this.name);
};
function Son(name,age){
	Father.call(this,name);//继承实例属性，第一次调用Father()
	this.age = age;
}
extend2(Son,Father)//继承父类方法,此处并不会第二次调用Father()
Son.prototype.sayAge = function(){
	alert(this.age);
}
var instance1 = new Son("louis",5);
instance1.colors.push("black");
console.log(instance1.colors);//"red,blue,green,black"
instance1.sayName();//louis
instance1.sayAge();//5

var instance2 = new Son("zhai",10);
console.log(instance2.colors);//"red,blue,green"
instance2.sayName();//zhai
instance2.sayAge();//10
 

```

## extend继承
通过es6 的class和extend实现继承
```js
class Animal {
    constructor(name) { 
        this.name = name
    } 
    greet(sound) {
        console.log(sound)
    }
}

class Dog extends Animal {
    constructor(name,color) {
        super(color) //super方法，表示父类的构造函数，用来新建父类的this对象
        this.name = name
    }
}   
let dian = new Dog('小点儿', 'blue')
```

[参考文档](https://juejin.im/post/58f94c9bb123db411953691b)


