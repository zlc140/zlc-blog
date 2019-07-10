---
title: jsonP实现
data: "2019/06/18 14:00:00"
tag: ['js', '跨域', 'jsonP']
meta: 
- name: description
  content: 高级函数
- name: keywords
  content: 跨域,jsonP
---

## 原理
浏览器都有同源策略，因此产生了跨域问题，因为`script`的`src`不会被同源所约束，因此JSONP是通过动态加载script的src来实现的跨域
，参数只能通过url,且只支持get方法

jsonp代码
```js
function jsonp({url, params, callback}) {
    return new Promise((resolve, reject) => {
        let srcipt = document.createElement('script')
        
        window[callback] = function(data) {
            resolve(data)
            document.body.removeChild(srcipt)
        }
        
        params = {...params, callback} //name=jj&callback=show
        let arrs = []
        for(let key in params) {
            arrs.push(`${key}=${params[key]}`)
        }
        srcipt.src = `${url}?${arrs.join('&')}`
        document.body.appendChild(script)
    })
}
```
使用
```js
function show(data){
    console.log(data)
}
jsonp({
    url: 'http://localhost:3000',
    params: {
        name: 'jj'
    },
    callback: 'show'
}).then(res => {
    console.log(res)
})
```
后端代码
```js
let express = require('express')
let http = require('http')
let app = express();
app.get('/show',(req, res)=> {
    let {callback} = res.query
    res.send(`${callback}('hello')`)
}) 
app.listen(3000)
```
