---
title: 前端请求数据
data: "2019/06/18 14:00:00"
tag: ['es6', 'fetch', 'ajax', 'axios']
meta: 
- name: description
  content: 前端请求数据的方法
- name: keywords
  content: es6,fetch,ajax
---

## 什么是AJAX

AJAX代表异步JavaScript和XML，它允许应用程序通过与Web服务器交换数据来异步更新网页。  

**AJAX是一个误导性的名称。AJAX应用程序可能使用XML来传输数据，但将数据作为纯文本或JSON文本传输同样很常见。 - w3shools.com**  

  `XMLHttpRequest`的实例对象的属性都在prototype上有10个普通属性和9个方法  
  
设置`requestHeader`的值  
1. **`Content-type`:**   
a. 发送json数据格式  
    `xhr.setRequestHeader("Content-type","application/json; charset=utf-8")`   
b. 发送表单数据   
    `xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=utf-8");`   
c. 发送纯文本（不设置content-type ,默认此值）  
    `xhr.setRequestHeader("Content-type","text/plain; charset=utf-8");`   
d. 发送HTML文本   
    `xhr.setRequestHeader("Content-type","text/html; charset=utf-8");`     
e. 可以不带编码   
    `xhr.setRequestHeader("Content-type","application/json");`   
f. 对大小写不敏感    
    `xhr.setRequestHeader("Content-type","Application/JSON; charset=utf-8");`  
 
2. **`Cache-Control: xhr.setRequestHeader('Cache-Control', '')`**      
a. `no-cache`  在发布缓存副本之前，强制要求缓存把请求提交给原始服务器进行验证。  
b. `public` 可以被任何对象（客户端，代理服务器等）缓存，即使是通常不可缓存的内容如（该响应没有max-age指令或Expires消息头）  
c. `private` 只能单个用户缓存，即不能被代理服务器缓存。  
d. `no-store` 缓存不应存储有关客户端请求或服务器响应的任何内容。  
e. `max-age(seconds)` 缓存最大时间  
f. `xhr.setRequeryHeader('Cache-Control':'public, max-age=31536000')`缓存静态资源  
g. `Cache-Control: no-cache, no-store, must-revalidate` 关闭缓存  

3. **`XMLHttpRequest`的属性**   
a. `readyState` 只读属性（0：请求建立，未初始化；1：初始化（以掉open,未send）;2:发送数据send; 3:数据传输中loading;4.完成）  
b. `status` 只读；表示HTTP请求状态对应http请求状态码  
c. `statusText` 服务器响应状态信息 status==200X时放回'OK',失败为null,301的 Moved Permanently , 302的 Found , 303的 See Other , 307 的 Temporary Redirect , 400的 Bad Request , 401的 Unauthorized 等等  
e. `timeout` 值为大于0数字，指定ajax请求超时时长  
f. `response` `responseText` 均为服务器响应内容  
g. `responseXML` 服务器响应xml的内容  
h. `responseType` 响应类型 缺省为空字符串, 可取 "arraybuffer" , "blob" , "document" , "json" , and "text" 共五种类型.  
I. `responseURL` 返回ajax请求最终的URL, 如果请求中存在重定向, 那么responseURL表示重定向之后的URL.  
J. `withCredentials` 布尔，默认false  表示跨域请求中不发送cookies等信息,为true则发。对同域无影响  
k. `upload`  属性默认返回一个 `XMLHttpRequestUpload` 对象, 用于上传资源  

```js
xhr.upload.onprogress = function(e){
  var percent = 100 * e.loaded / e.total |0;
  console.log('upload: ' + precent + '%');
}

```
4. `XMLHttpRequest`的方法
a. `onreadystatechange` 该方法回调在`readyState`改变时调用
b. `onloadstart` 触发在发送请求之前，readyState=1之后触发，包含一个`ProgressEvent`事件进度对象（lengthComputable布尔，资源长度是否可计算；loaded加载资源的大小；total总资源大小）
c. `onprogress` readyState==3 状态时开始触发 默认传入 `ProgressEvent` 对象 资源加载进度 `e.loaded/e.total`;
d. `onload` 调方法在ajax请求成功后触发 `readyState==4` 状态之后. 可以来捕捉一个ajax请求成功
e. `onloadend` `readyState==4`或`readyState==2`（未响应）触发 默认传`ProgressEvent`对象
f. `ontimeout` 请求超时时触发
g. `abort()` 用于取消ajax 请求取消后  readyState 状态将被设置为 0 (`UNSENT`)
h. `getResponseHeader` 获取ajax响应头中指定name的值 `console.log(xhr.getResponseHeader('Content-Type'));//"text/html"`
i. `getAllResponseHeaders` 获取所有安全的ajax响应  响应头以字符串形式返回
j. `setRequestHeader()` 设置请求头
k. `onerror` 请求出错执行
l. `overrideMimeType` 用于强制指定`response` 的 MIME 类型
```js
xhr.getResponseHeader('Content-Type');//"text/plain"
xhr.overrideMimeType("text/xml; charset = utf-8");
xhr.getResponseHeader('Content-Type');//"text/xml; charset = utf-8"
```
```js

function requery(url, options={}) {
    if(!url)return;
    let xmlhttp;
    let method = options.method || 'GET';
    let async = options.async || true; //是否异步
    let data = options.data
    if(window.XMLHttpRequest) { //IE7+,Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest()
    }else { //IE5,6
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
    }
    if(method.toUpperCase() == 'GET' && options.data){
        let props = []
        Object.key(data).forEach(v => {
            let item = encodeURIComponent(v) + '=' + encodeURIComponent(data[v])
            props.push(item)
        })
        if(url.indexOf('?') === -1){
            url = url + '?' + props.join('&')
        }else {
            url = url + props.join('&')
        }
    }
    xmlhttp.open(method, url, async)
    if(method.toUpperCase() == 'POST'){ 
        xmlhttp.setRequestHeader('Content-type', 'application/json;charset=utf-8')
        xmlhttp.send(data)
    }else {
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=utf-8')
        xmlhttp.send()
    }
    
    
}

```

## $.ajax
jquery对原生ajax的一次封装,统一了ajax的api，不用再考虑不同浏览器的兼容差异
```js
$.ajax({
    url: '',
    type: '',
    async: false, //是否异步，默认true异步
    beforeSend: function() {
        //添加自定义http头
    },
    data: '',
    dataType: '', //预期服务器返回的数据类型。
    jsonp: '',
    success: function(res){
       
    }
})
```
[jQuery的ajax请求的详细参数](http://www.w3school.com.cn/jquery/ajax_ajax.asp)

## axios 
1. axios支持node,浏览器
2. 体积小,仅12k
3. 基于promise
4. 请求可以拦截请求和响应
5. 可取消、
6. 客户端支持防御XSRF
7. 已整合了vue和react,nuxt等框架
```js
axios.get('url').then(res => {
    
}).catch(err => {
    
})
axios.post('url', {
    mobile: '',
    password: ''
}).then(res => {
      
}).catch(err => {
  
})

axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
```

[axios接口文档](https://www.jianshu.com/p/7a9fbcbb1114)
[axios+框架接口文档](http://www.axios-js.com/)

## Fetch
fetch是web异步通信的未来,在大部分现代浏览器（除IE)开箱即用，受js生态系统的支持
因此fetch未来很可能真正取代ajax,直接成为web api

fetch()方法传入url,返回一个处理response 的 Promise,不论成功失败都会放回到promise

浏览器的支持：从chrome42, Firefox39, Opera29, EdgeHTML1起支持
对于不支持的的许多浏览器需要添加添加polyfill(垫片)
* es5的polyfill : [es5-shim](https://github.com/es-shims/es5-shim) [es5-sham](https://github.com/es-shims/es5-sham)
* Promise的polyfill: [es6-promise](https://github.com/stefanpenner/es6-promise)
* fetch的polyfill: [fetch-ie8](https://github.com/camsong/fetch-ie8)
如果要支持ie8+,以上三个建议都添加  
fetch一般有两个参数，第一个是请求地址，第二个是请求设置
* header  
- fetch的响应头
> 获取响应头： response.headers.get('Content-Type')
```js
// 设置头
var headers = new Headers();
headers.append("Content-Type", "text/html");
fetch(url,{
  headers: headers
});
```
* credentials
fetch的请求默认是不带cookie的，需要手动设置，include（带cookie）;omit: 缺省值, 默认为该值.same-origin: 同源, 表示同域请求才发送cookie.

* catch 处理缓存，同ajax

```js
let url = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=%27+123+%27&json=1&p=3'
fetch(url, {
    method: 'GET', //POST，GET，DELETE，UPDATE，PATCH和PUT
    headers: {'Content-Type': 'application/json;charset=utf-8'}, //header也可直接在这里设置
    mode: 'cors', // no-cors(不跨域)，cors(跨域)，same-origin(同域才会发送该fetch),cors-with-forced-preflight: 表示在发出请求前, 将执行preflight检查. （navigate , websocket）也是两个特殊值
    credentials: 'include', //
}).then(response => {
    if(response.status >= 200 && response.status < 300){
        return response.json
    }else{
        return Promise.reject(new Error(response.statusText))
    }
    
}).then(data => {
    console.log(data)
}).catch(err => {
    throw error(JSON.stringify(err))
})
```

* fetch的不足，
0. api简单
1. fetch基于promise，也受限于promise,兼容方面需要安装相关垫片，
2. fetch无法停止（没有ajax的abort方法）
3. 不支持timeout机制
4. 虽然没有回调嵌套的问题，但也会有then链接过长的问题，没有deferred（async/await）
5. 没有progress提示
* 不足的补充
1. fetch-jsonp 支持jsonp
```js
fetchJsonp(url, {
  timeout: 3000,
  jsonpCallback: 'callback'
}).then(function(response) {
  console.log(response.json());
}).catch(function(e) {
  console.log(e)
});
```
2 abort()使用promise.race()来实现

```js
let _fetch = (function(fetch) {
    return function(url, options) {
        let abort = null, timeout = 0;
        
        let abort_Promise = new Promise((resolve, reject) => {
             abort = (e)=> {
                 let val = e || 'abort'
                reject(val)
                console.info('abort done')
            }
        })
        let promise = Promise.race([
            fetch(url, options),
            abort_Promise
        ])
        promise.abort = abort;
        Object.defineProperties(promise, 'timeout', {
            get: function() {
                return timeout
            },
            set: function(ts) {
                if((ts=+ts)){
                    timeout = ts;
                    setTimeout(abort,ts);
                }
            }
        })
        return promise;
    }
})(fetch)

var p = _fetch('url',{}).then(response => {
    
},err => {
    
})
p.timeout = 1
p.abort();
```
fetch请求后, 立即调用abort方法, 该promise被拒绝, 符合预期,注意：abort()方法是另写的，没有写在then方法中，因为then返回的是一个新的promise对象

3. timeout 通过Promise.race实现
```js
//简易版
function timer(time) {
    //return new Promise((resolve, reject) => {
    //    setTimeout(function() {
    //        reject('timeout')
    //    }, time)
    //})
    return new Promise(resolve => setTimeout(resolve, time)).then(res => {
        console.log('timeout')
    })
}
let p = fetch(url,options)
Promise.race([p,timer(1000)])
``` 
