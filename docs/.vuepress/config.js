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
                        { text: 'aboutCss', link: '/aboutCss/' }
                    ]}, 
                    { text: 'counter', link: '/counter/' },
                    {text: 'Tags', link: '/tags/', tags: true},
                    { text: 'github', link: 'https://github.com/zlc140'} 
                ],
                sidebar: { 
                    '/aboutJs/': [
                        {
                            title: 'Js相关知识',
                            collapsable: false,
                            children: [
                                '/aboutJs/',
                                '/aboutJs/eventLoop.md',
                                '/aboutJs/webPage.md',
                                '/aboutJs/control.md',
                                '/aboutJs/debounce.md',
                                '/aboutJs/loadImg.md'
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
                    '/counter/': [
                        {
                            title: 'Counter',
                            collapsable: false,
                            children: [
                                '/counter/'
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
    }
   
}