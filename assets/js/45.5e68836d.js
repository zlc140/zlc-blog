(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{358:function(_,v,e){"use strict";e.r(v);var c=e(1),o=Object(c.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var _=this,v=_.$createElement,e=_._self._c||v;return e("div",{staticClass:"content"},[e("h2",{attrs:{id:"重绘和回流"}},[_._v("重绘和回流")]),_._v(" "),e("ol",[e("li",[e("a",{attrs:{href:"/aboutJs/webPage"}},[_._v("浏览器加载一个页面的过程")])]),_._v(" "),e("li",[_._v("重绘 当前元素样式(背景色，字色等)改变时不改变布局只改变外观风格（换肤）就会触发重绘，由于不影响其他dom，性能影响较少")]),_._v(" "),e("li",[_._v("回流 浏览器会重新计算部分或全部文档的位置和布局，这个过程是性能杀手"),e("br"),_._v("\n触发条件：")])]),_._v(" "),e("ul",[e("li",[_._v("调整窗口大小")]),_._v(" "),e("li",[_._v("改变字体")]),_._v(" "),e("li",[_._v("增加或移除样式表")]),_._v(" "),e("li",[_._v("内容变化 入"),e("code",[_._v("input")]),_._v(" ,"),e("code",[_._v("select")]),_._v("输入或选择")]),_._v(" "),e("li",[_._v("激活"),e("code",[_._v("css伪类")])]),_._v(" "),e("li",[_._v("操作"),e("code",[_._v("class")]),_._v("属性")]),_._v(" "),e("li",[_._v("JS操作DOM")]),_._v(" "),e("li",[_._v("计算 "),e("code",[_._v("offsetWidth")]),_._v(" "),e("code",[_._v("offsetHeight")])]),_._v(" "),e("li",[_._v("设置"),e("code",[_._v("style")]),_._v("属性")]),_._v(" "),e("li",[e("code",[_._v("fixed")]),_._v("定位元素在滚动条移动是会一直触发回流")])]),_._v(" "),e("p",[_._v("4.如何避免重绘和回流呢")]),_._v(" "),e("ul",[e("li",[e("p",[e("code",[_._v("Display: none")]),_._v("不渲染，所以可以在对元素操作样式之前想"),e("code",[_._v("none")]),_._v("之后操作，完成后"),e("code",[_._v("block")]),_._v(",这样值触发两次回流（操作样式多的时候）")])]),_._v(" "),e("li",[e("p",[e("code",[_._v("innerHTML")]),_._v(" 直接以"),e("code",[_._v("innerHTML")]),_._v("插入新的"),e("code",[_._v("dom")]),_._v("和样式，只触发一次回流")])]),_._v(" "),e("li",[e("p",[e("code",[_._v("DocumentFragment")]),_._v("是"),e("code",[_._v("DOM")]),_._v("节点，但不是"),e("code",[_._v("DOM tree")]),_._v("的一部分，相当于虚拟"),e("code",[_._v("DOM")]),_._v("，在缓存DOM上操作，最后一次性插入，触发一次回流")])]),_._v(" "),e("li",[e("p",[_._v("多种样式操做直接通过"),e("code",[_._v("class")]),_._v("的添加或删除进行，减少重绘次数")])]),_._v(" "),e("li",[e("p",[_._v("不要对元素行进"),e("code",[_._v("JS")]),_._v("动画流操作，尽量使用"),e("code",[_._v("css")]),_._v("动画属性")])])])])}],!1,null,null,null);v.default=o.exports}}]);