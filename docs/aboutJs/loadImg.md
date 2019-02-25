---
title: 图片懒加载和预加载
data: "2018/12/25 14:00:00"
tag: ['js', '图片懒加载','预加载']
meta: 
- name: description
  content: 事件循图片懒加载和预加载
- name: keywords
  content: JS,图片懒加载,预加载
---


## 懒加载

图片设置dataset属性和默认src图片，在达到一定条件后修改src

 ```js 
	 
	/*懒加载*/
	var aImages = document.images;
	loadImg(aImages,2) 
    window.onscroll = function () {
    	loadImg(document.images,2)
    }
	function loadImg(arr, num) { 
        let maxNum = num;
		for(var i=0,len = arr.length; i< len; i++) {
			if(!arr[i].isload && arr[i].getBoundingClientRect().top < document.documentElement.clientHeight  && maxNum > 0){
				maxNum--
                arr[i].isload = true;
                arr[i].style.cssText = "transition: ''; opacity: 0;"
                if(arr[i].dataset) {
                    aftloadimg(arr[i], arr[i].dataset.original);
                }else {
                    aftloadimg(arr[i], arr[i].getAttribute('data-original'));
                }

                (function(i){
                    setTimeout(function () {
	                    arr[i].style.cssText = "transition: 1s; opacity: 1;"
                    },500)
                })(i)
			}
        }
    }
	function aftloadimg(obj, url){
		var oImg = new Image();
		oImg.onload = function () { //它会等oImg加载完成才会执行
            obj.src = oImg.src;
		}
		oImg.src = url;

    }

 ```

## 预加载

 把需要用到的图片在load之后加载出来，之后用到这种图片就不会再次请求接口 了

 ```js
 
	var oBtn = document.getElementsByTagName('button')[0];
	var oImg0 = document.images[0]; 
	/*预加载*/
	var array = ["img/1.jpg","img/2.jpg","img/3.jpg","img/4.jpg"]
	var iNow = -1;
	oBtn.onclick = function(){
		iNow++;
		iNow = iNow%4;
		oImg0.src = array[iNow];
	}
	var aImages = [];
	function preLoadImg(array){
		for(var i = 0, len = preLoadImg.arguments[0].length; i < len; i++){
			aImages[i] = new Image();
			aImages[i].src = preLoadImg.arguments[0][i];
		}
	}

 
 
 ```