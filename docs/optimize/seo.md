---
title: 前端网站seo优化
data: "2019/06/24 14:00:00"
tag: ['js','vue', '前端优化', '前端资源优化']
meta: 
- name: description
  content: 前端网站加载速度优化
- name: keywords
  content: SEO站点优化
---

## vue单页项目改造seo优化


1. 预渲染+vueMetaInfo (prerender-spa-plugin + vue-meta-info )
- a. 使用场景：相对静态的网站&需要添加seo关键词的页面不是很多
- b. 优势：项目改造成本最小
- c. 原理：prerender-spa-plugin依赖与Puppeteer 的爬取页面的功能，类似将代码运行在一个无Ui的谷歌浏览器中，获取到代码并返回生成对应文件下的html文件最为搜索引擎的数据源
- d. 缺点: 对于需要通过请求获取数据的页面不友好，（商品详情，文章等）；预渲染页面过多容易卡死；安装时注意webpack等版本

``` js
// 压缩dist文件为dist.zip
const FileManagerPlugin = require('filemanager-webpack-plugin')
// seo预渲染
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 预渲染
            config.plugins.push(new PrerenderSPAPlugin({
                    staticDir: path.join(__dirname, 'dist'),
                    indexPath: path.join(__dirname, 'dist', 'index.html'),
                    routes: ['/', '/about'], //需要预选让的页面
                    serve: { //预选染页面如果有需要求情的数据
                        proxy: CONFIG.proxyAble //同devserve
                    },
                    renderer: new Renderer({ 
                        inject: {
                            foo: 'bar'
                        },
                        headless: true, //渲染时显示浏览器窗口。对调试很有用。
                        renderAfterDocumentEvent: 'render-event' //等到事件触发去渲染，此处我理解为是Puppeteer获取页面的时机
                    })

                })
            )
            config.plugins.push(new FileManagerPlugin({  //初始化 filemanager-webpack-plugin 插件实例
                    onEnd: {
                        delete: [   //首先需要删除项目根目录下的dist.zip
                            './dist.zip',
                        ],
                        archive: [ //然后我们选择dist文件夹将之打包成dist.zip并放在根目录
                            {source: './dist', destination: './dist/dist.zip'},
                        ]
                    }
                })
            )

        }
}
// main.js
new Vue({
    router,
    store,
    render: hh => hh(App),
    mounted () {
        document.dispatchEvent(new Event('render-event'))
    }
}).$mount('#app')
```

## nuxt项目（服务端渲染框架）

## vue项目ssr改造