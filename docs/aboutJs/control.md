---
title: 前端鉴权
data: "2018/12/25 14:00:00"
tag: ['js', '前端鉴权']
meta: 
- name: description
  content: 前端鉴权
- name: keywords
  content: JS,前端鉴权
---
 
 -  前端鉴权常见的方式
 
 ### HTTP Basic Authentication 通过http是否有author判断，弹出登录的验证框
 
这种授权方式是浏览器遵守http协议实现的基本授权方式,HTTP协议进行通信的过程中，HTTP协议定义了基本认证认证允许HTTP服务器对客户
 端进行用户身份证的方法。
 
 ### session-cookie
 
后端在前端登录请求时添加session会话，返回个前端一个由session生成的id
 前端保存在cookie中，下次请求时的请求头带上该域名下的cookie信息
 后端验证
 
 ### Token 验证

 ```
  1. 客户端使用用户名跟密码请求登录
  2. 服务端收到请求，去验证用户名与密码
  3. 验证成功后，服务端会签发一个 Token，再把这个 Token 发送给客户端
  4. 客户端收到 Token 以后可以把它存储起来，比如放在 Cookie 里或者 Local Storage 里
  5. 客户端每次向服务端请求资源的时候需要带着服务端签发的 Token
  6. 服务端收到请求，然后去验证客户端请求里面带着的 Token，如果验证成功，就向客户端返回请求的数据
 ```
 
 #### 4.OAuth(开放授权) （支付宝，微信，QQ）

[参考](https://blog.csdn.net/wang839305939/article/details/78713124/)
