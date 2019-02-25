---
title: 函数防抖和节流
data: "2018/12/25 14:00:00"
tag: ['js', '函数防抖','函数节流']
meta: 
- name: description
  content: 函数防抖和节流
- name: keywords
  content: JS,函数节流,函数防抖
---

## 防抖

 * 函数防抖 函数只在最后调用，例如resize,在松口后才调用，scroll在滚动停止才调用
 * 应用：onresize, input监听
 * 特点： 调用之后的一段时间函数不再调用
 * @param func 回调
 * @param time 间隔时间
 * @param immediate 是否立即执行（true:首次立即执行，之后time之内不在执行； false:高频出发，延迟到最后一次的time后执行一次   ）
 * @returns {function(*=)}
 * 
``` js{5}
function debounce(func, time = 200, immediate = true){
	let timer, context, args;
	
	//延迟执行函数
	const later = () => setTimeout(() => {
		timer = null;
		if(!immediate) {
			func.apply(context, args)
			context = args = null;
		}
	}, time)
	
	return function(...params) {
		 if(!timer){
			context = this
			args = params
		 	timer = later()
			 if(immediate) {
		 		func.apply(this, params)
			 }else {
		 		context = this
				args = params
			 }
		 }else {
		 	 clearTimeout(timer)
			 timer = later()
		 }
	
	}
}

``` 

## 节流
 
 * 函数节流 方法会在触发之后的delay秒执行，期间触发不会执行，只有下个周期触发才继续执行
 * 应用： 点击误触，
 * 特点： 一定时间内函数只调用一次
 * @param func
 * @param delay
 * @returns {function(*=)}

 ```js
function throttle(func, delay) {
	let timer;
	let timeout = null;
	return function() {
		let args = arguments,//闭包传参
			_me = this;//获取上下文
		let runCallBack = function() {
			timer = +new Date();
			timeout = false;
			func.apply(_me,args);
		}
		if(timeout)return;
		if(+new Date() - timer < delay && !timeout){
			console.log('a')
			timeout = setTimeout(runCallBack, delay)
			return;
		}
		runCallBack()
	}
}
```


```html
    <input type="text" placeholder="你好" id="test" style="width:100%;height: 30px;">
    <div id="box" style="width: 100%; height: 2000px; background-color: #ddd;"></div>  
    <script type="text/javascript">
        function cb(e){
        	console.log(e)
        }
        function cb2(c){
	        console.log(c.target.value)
        }
        let box = document.querySelector('#box')
        let test = document.querySelector('#test')
        //
        let func = debounce(cb2, 500, true)
        let func2 = throttle(cb, 1000)
        test.addEventListener('input', function(e){
	        func(e)
        })

        window.onscroll = function(e){
	        func2(e)
        }
    </script>
```