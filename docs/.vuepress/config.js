module.exports = {
    title: 'zhanglc个人主页',
    description: "前端开发相关",
    head: [
        ['link', { rel: 'icon', href: '/logo.jpg' }]
    ],
    base: '/zlc-blog/',
    repo: 'https://github.com/zlc140/zlc-blog',
    dest: './docs/.vuepress/dist',
    serviceWorker: true,
    ga: '',
    themeConfig: {
        sidebarDepth: 2,
        displayAllHeaders: false, // 默认值：false
        docsDir: 'docs',
        locales: {
            '/': {
                label: 'English',
                selectText: 'Languages',
                editLinkText: 'Edit this page on GitHub',
                nav: [
                    { text: 'web', items: [
                        { text: 'aboutJs', link: '/aboutJs/' },
                        { text: 'aboutVue', link: '/aboutVue/' },
                        { text: 'aboutCss', link: '/aboutCss/' },
                        { text: '性能优化', link: '/optimize/optimize' },
                    ]},
                    { text: 'counter', link: '/counter/' },
                    { text: 'Tags', link: '/tags/', tags: true},
                    { text: 'github', link: 'https://github.com/zlc140'}
                ],
                sidebar: {
                    '/aboutJs/': [
                        {
                            title: 'Js相关知识',
                            collapsable: true,
                            children: [
                                '/aboutJs/',
                                '/aboutJs/eventLoop.md',
                                '/aboutJs/webPage.md',
                                '/aboutJs/control.md',
                                '/aboutJs/debounce.md',
                                '/aboutJs/loadImg.md',
                                '/aboutJs/callApply.md',
                                '/aboutJs/selfNew.md',
                                '/aboutJs/hoc.md',
                                '/aboutJs/curry.md',
                                '/aboutJs/proto.md',
                                '/aboutJs/loop.md',
                                '/aboutJs/JSONP.md',
                                '/aboutJs/animation.md'

                            ]
                        },
                        {
                            title: 'ES6相关知识',
                            collapsable: true,
                            children: [
                                '/aboutJs/aboutEs6/es6.md',
                                '/aboutJs/aboutEs6/generator.md',
                                '/aboutJs/aboutEs6/request.md'
                            ]
                        },
                        {
                            title: 'TS相关知识',
                            collapsable: true,
                            children: [
                            ]
                        }
                    ],
                    '/aboutCss/': [
                        {
                            title: 'css学习笔记',
                            collapsable: false,
                            children: [
                                '/aboutCss/',
                                '/aboutCss/one.md',
                                '/aboutCss/two.md'
                            ]
                        }

                    ],
                    '/aboutVue/': [
                        {
                            title: 'vue学习',
                            collapsable: false,
                            children: [
                                '/aboutVue/',
                                '/aboutVue/vueApi.md'
                            ]
                        }

                    ],
                    '/optimize': [
                        {
                            title: '性能优化',
                            collapsable: false,
                            children: [
                                '/optimize/',
                                '/optimize/optimize.md'
                            ]
                        }
                    ],
                    '/counter/': [
                        {
                            title: 'vuepress学习',
                            collapsable: false,
                            children: [
                                '/counter/'
                            ]
                        }

                    ],
                    '/about/': [
                        {
                            title: 'About',
                            collapsable: false,
                            children: [
                                '/about/'
                            ]
                        }

                    ],
                }
            }
        }

    },
    markdown: {
        anchor: {
            permalink: false
        },
        toc: {
            includeLevel: [1, 2]
        },
        extendMarkdown: md => {
            md.set( { breaks: true} )
        }
    },
    postcss: {
        plugins: [require('autoprefixer')]
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@public': ''
            }
        }
    }

}
