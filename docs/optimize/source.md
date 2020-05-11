---
title: 前端网站优化
data: "2019/06/24 14:00:00"
tag: ['js', '前端优化', '前端资源优化']
meta: 
- name: description
  content: 前端网站加载速度优化
- name: keywords
  content: 前端资源优化,网站加载速度优化
---

## 静态资源

一个前端网站的渲染通常静态资源加载的时间占有很大的比重，因此也成了最普遍的优化的点，现在对于静态资源的优化已经很丰富了
一下列举一些常见的： 
- html语义化，减少使用table,hr等标签 
- 减少资源请求次数，合并css,js文件，雪碧图
- 静态资源cdn分发 客户端可以通过最佳的网络链路加载静态资源
- css,js压缩，图片压缩，gzip压缩
- 静态资源缓存
- 图片的懒加载
- 资源按需加载

## vue-cli3项目

1. 压缩js，css （gzip，需要配合服务端配置使用，此处nginx配置）
插件： compression-webpack-plugin
``` js
const productionGzipExtensions = ['js','css']
configureWebpack: config => {
  config.plugins.push(new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: new RegExp(`\\.(${ productionGzipExtensions.join('|') })$`),
      threshold: 10240,
      minRatio: 0.8
  }))
}

//   ==========  nginx配置  nginx.conf =================
server {
    listen 80;
    server_name web.tesm.com;
    index  index.html index.htm index.php;
    set $webroot F:/webroot/test;
    autoindex_exact_size on;
    autoindex_localtime on;
    gzip on;
    gzip_min_length 1k;
    gzip_buffers 4 32k;
    #gzip_http_version 1.0;
    gzip_comp_level 8;
    gzip_types text/plain application/x-javascript text/css application/javascript application/xml text/javascript  image/jpeg image/gif image/png; 
    gzip_vary on;
    gzip_disable "MSIE [1-6]\.";
    location / {
      root $webroot; 
      try_files $uri $uri/ /index.html;
    }
}
```
效果：打包之后1mb左右的js/css可以压缩一半以上（.js.gz)

2. 图片压缩 image-webpack-loader
``` js
// 图片压缩
  config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
          bypassOnDebug: true
      })
      .end()
```

3. 避免首页加载时间过长可以考虑关闭vue-cli3自带的预加载

``` js
  config.plugins.delete('prefetch-index')
  config.plugins.delete('prefetch')
```

4. 打包之后js过大 
a. cdn加载，把vue,axios，swiper等通过script单独引入
``` js
//配置之后这些插件/框架js照常引用
configureWebpack: config => {
  // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
  config.externals = {
    vue: 'Vue',
    swiper: 'Swiper',
    'video.js': 'videojs'
  }
}
chainWebpack: config => {
  // 这个需要隐藏掉最外层的pages配置
  config.plugin("html").tap(args => {
        args[0].template = resolve("./public/index.html")
        args[0].cdn = {
          js: ['https://www.**********.com/static/vue.min.js'],
          css: []
        }
        args[0].isServe = isServe
        return args
    })
}

// 在index.html模板中使用
<% for (var i in htmlWebpackPlugin.options.cdn && htmlWebpackPlugin.options.cdn.css) { %>
        <link rel="stylesheet" type="text/css" href="<%= htmlWebpackPlugin.options.cdn.css[i] %>">
        <% } %> 
```

b. 分成多个chunk包
在vue-router中的,懒加载是添加注释的方式将chuankVender打包成多个
``` js
// 模板懒加载
 () => import(  /* webpackChunkName: "home" */ '@/views/Home'),
```