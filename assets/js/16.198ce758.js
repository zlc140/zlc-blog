(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{345:function(n,e,s){"use strict";s.r(e);var t=s(1),r=Object(t.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var n=this,e=n.$createElement,s=n._self._c||e;return s("div",{staticClass:"content"},[s("p",[n._v("##关于面试")]),n._v(" "),s("p",[n._v("::: 关于面试\n-name: zhanglc\n-age: 26\n-address: shanghai\n-job: webDeveloper\n:::")]),n._v(" "),s("ol",[s("li",[s("p",[n._v("你对自己未来的定位是怎样的？你想向什么方向发展？职业规划")]),n._v(" "),s("p",[n._v("做了这个久的前端开发，我发现前端才是一个产品的最重要的环节，因为前端是开发给用户使用的，也是一个\n产品的意义，如何能更好的站在一个用户的角度去开发一个产品才是我们前端开发的方向，我更想也更愿意花时间\n去了解一个产品的方方面面，这样才能更好的去开发实现一个产品。减少和产品的沟通成本。")]),n._v(" "),s("p",[n._v("从开发角度的话，我会先把前端知识学精，现在前端的知识点很丰富的，是学不完的，我只要能保持永远的好奇心，\n不断学习和追踪，保持对新技术的强烈嗅觉，并能应用到项目中，从某些方面达到提升开发质量或者效率的目的。只有\n在本职工作上（针对的是这个领域）做到极致，再去研究别的语言。")]),n._v(" "),s("p",[n._v("平时我会在一些技术网站上阅读一些比较好的文章（掘金，简书等），开放自己的眼界，了解新知识，探索新技术。同时也会阅读\n时下流行框架的源码，重最底层了解一个开发框架的技术原理等。")])]),n._v(" "),s("li",[s("p",[n._v("面试开场：简单的自我介绍\n您好，我是***，工业设计毕业，一直从事前端开发工作，之前的公司是电商方面，现在的是金融方面P2P,\n主要项目经历是Vue方面项目较多，有移动端商城，erp管理系统，以及微信小程序等。")])]),n._v(" "),s("li",[s("p",[n._v("针对乐福购商城详细说下，以及收获和遇到的难点\n该项目是微信公众号的商城，支持手机浏览器，我只要负责的是关于商品的所有开发，包括商品列表，分类，商详，下单支付，\n购物车，订单管理，售后管理，以及营销活动（拼团，砍价，满减满赠）\n收获：这个项目我的参与度算很高了，包括后期的迭代开发，维护都是我在做，基本50%以上是我完成的，那是后虽然压力很大，但收获也是正比的，通过这个项目\n让我对项目的框架，项目组件化，项目页面的缓存，项目兼容，项目优化等都有了更多的了解和解决方法。对商城的业务有了更全面的了解\n同时自我学习， 同事之间的沟通都有了很大的提升。这些也是我认为很重要的收获\n难点：除了一些比较麻烦的业务逻辑以外（商详选择规格），开发方面话，\n1.我们的页面经常会有一些弹框（不会自己消失的）或者那种直接在覆盖在本页面类弹框，在点击手机硬件返回按钮时，直接返回到了上页，其实用户只是想关闭弹框，\n解决：\n重新封装路由插件（包括它的钩子），\n往Vue添加全局数组（存放阻止回退的回调队列），\n在前置路由中判断数组长度，如果有方法则顺序执行方法，并执行history.forward();不执行next()\n在需要添加阻止回退的页面（不一定是弹框）通过引入Vue，获取到全局数组，监听弹框的显隐，显示就往里push回调方法（回调方法需要能调用组件实例），隐藏则splice()掉方法\n对于弹框(有统一的class),通过判断他们的display.如果不为none,则设置none，并forward()\n2. 页面缓存\n解决： 主要是通过keep-alive组件来实现的\nrouteConf（路由列表）添加属性cache,只有cache为true或没有该属性的路由的才会在路由的afterEach钩子中添加到白名单\n路由的白名单通过store（白名单，跳转方向动画slide-left,当前页面）来管理\n3. flex兼容 ，添加autoprefixer，添加前缀，针对还不兼容的则添加向下兼容css ，针对还有问题的机器则真机调试\n4. 页面优化。添加缓存（keep-alive）,图片懒加载（多图片页面）, webpack打包压缩")])]),n._v(" "),s("li",[s("h2",{attrs:{id:"谈下xss-和csrf我个人对xss的理解就是客户端被恶意注入代码（一般是通过form表单用户输入），来进行一些恶意操作，1-如发射型（诱使用户点击链接或提交表单或进入一个恶意网站）注入恶意脚本2-存储型获取用户隐私信息并保存数据库3-dom型，恶意脚本通过修改dom-是纯粹发生在前端的攻击"}},[n._v("谈下XSS 和CSRF\n我个人对XSS的理解就是客户端被恶意注入代码（一般是通过form表单用户输入），来进行一些恶意操作，\n1.如发射型（诱使用户点击链接或提交表单或进入一个恶意网站）注入恶意脚本\n2.存储型获取用户隐私信息并保存数据库\n3.DOM型，恶意脚本通过修改DOM,是纯粹发生在前端的攻击")]),n._v(" "),s("p",[n._v("CSRF CSRF，即 Cross Site Request Forgery，中译是跨站请求伪造，是一种劫持受信任用户向服务器发送非预期请求的攻击方式。\n例如：通过脚本来重复登录实验用户的密码\n防御 XSS 攻击\nHttpOnly 防止劫取 Cookie\n用户的输入检查\n服务端的输出检查\n防御 CSRF 攻击\n验证码\nReferer Check\nToken 验证")])])])])}],!1,null,null,null);e.default=r.exports}}]);