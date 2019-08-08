/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js");

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "389dc04b7ea96c5fc184ad88b4325a41"
  },
  {
    "url": "about.html",
    "revision": "20cf6bc9bf40d7ad8ab7e18cc7990791"
  },
  {
    "url": "aboutCss/index.html",
    "revision": "d42215925edfe59d3c1e800df5b13b14"
  },
  {
    "url": "aboutCss/one.html",
    "revision": "2b6dc47a757a926894650c484967ed15"
  },
  {
    "url": "aboutCss/two.html",
    "revision": "cb87c81367be4d65037b3ee1f904030b"
  },
  {
    "url": "aboutJs/aboutEs6/es6.html",
    "revision": "565c189c440525825755afb9dc81e24a"
  },
  {
    "url": "aboutJs/aboutEs6/generator.html",
    "revision": "98c8e8d0deeafe45f0fdb871b9b9ee35"
  },
  {
    "url": "aboutJs/aboutEs6/request.html",
    "revision": "8210f6887e680ed34d2517af91c5a383"
  },
  {
    "url": "aboutJs/aboutEs6/weak.html",
    "revision": "4358f6ae30c5b330f38de8712a8ac57a"
  },
  {
    "url": "aboutJs/animation.html",
    "revision": "970cab36c8eb750b8c4cad0be61e4ce5"
  },
  {
    "url": "aboutJs/callApply.html",
    "revision": "c9777a50e8ddfc9b0fbec54a7b455470"
  },
  {
    "url": "aboutJs/control.html",
    "revision": "6b955a1be28117983c09a7b9fe53ccd5"
  },
  {
    "url": "aboutJs/copy.html",
    "revision": "efa09eb9726584664345237c13803b8b"
  },
  {
    "url": "aboutJs/curry.html",
    "revision": "124355d5a18a2212e7e28178825796dc"
  },
  {
    "url": "aboutJs/debounce.html",
    "revision": "20bc4b23f97da504b1be171e9f98db36"
  },
  {
    "url": "aboutJs/eventLoop.html",
    "revision": "a5d3057946ad4ee67c1a067a3b4476f2"
  },
  {
    "url": "aboutJs/hoc.html",
    "revision": "32de41d97854b2eadde110941c9c937d"
  },
  {
    "url": "aboutJs/index.html",
    "revision": "9c3f606aaf0044b525d369d7dece942d"
  },
  {
    "url": "aboutJs/JSONP.html",
    "revision": "1bbffaec1653b06b5fe4612d6ff9829c"
  },
  {
    "url": "aboutJs/loadImg.html",
    "revision": "f44a9586e4d3e93fc2d93ae2b0ac1efe"
  },
  {
    "url": "aboutJs/loop.html",
    "revision": "9852181965d1e61a6787d9fe674884e8"
  },
  {
    "url": "aboutJs/proto.html",
    "revision": "f1660fc2fa5f473a5116bed0aba192ac"
  },
  {
    "url": "aboutJs/selfNew.html",
    "revision": "4f1449ca4ea356b11c3bf2a5d958e439"
  },
  {
    "url": "aboutJs/webPage.html",
    "revision": "1ac3c145fc25bb618097aedaec42fb1e"
  },
  {
    "url": "aboutVue/index.html",
    "revision": "ed92ac6a958419ea973afa83dccb80bd"
  },
  {
    "url": "aboutVue/vueApi.html",
    "revision": "95dbc7c47a7ec9dcbb6276bc37b83183"
  },
  {
    "url": "assets/css/0.styles.32c68d3c.css",
    "revision": "bc41052d9c191e14be57ee853bbf79d1"
  },
  {
    "url": "assets/fonts/element-icons.535877f5.woff",
    "revision": "535877f50039c0cb49a6196a5b7517cd"
  },
  {
    "url": "assets/fonts/element-icons.732389de.ttf",
    "revision": "732389ded34cb9c52dd88271f1345af9"
  },
  {
    "url": "assets/img/51563262972_.pic_hd.663dfd17.jpg",
    "revision": "663dfd17fd16e50a22688d699d7a3186"
  },
  {
    "url": "assets/img/contact-bg.90b89018.jpg",
    "revision": "90b89018c57623f25ff271dda0b322e8"
  },
  {
    "url": "assets/img/logo.4642280b.jpg",
    "revision": "4642280b71b71692fd8d5bf2bf7050cd"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/services-bg.5222d76c.jpg",
    "revision": "5222d76c2ce8a32d587fc6fc8e5f4da4"
  },
  {
    "url": "assets/img/skills-bg.ac55424d.jpg",
    "revision": "ac55424d4f2e9cb3691f5eb9a4b65bf6"
  },
  {
    "url": "assets/js/1.c87db1b4.js",
    "revision": "f7f3d64eba0ed973dd91248d7a1c5450"
  },
  {
    "url": "assets/js/10.19d174b6.js",
    "revision": "71012baf6fae77ecae3f104041edc02c"
  },
  {
    "url": "assets/js/11.7af2b0b8.js",
    "revision": "28ce0e1817d9b547f312ff6bea5a06ca"
  },
  {
    "url": "assets/js/12.04871506.js",
    "revision": "9d1a678b97abe9c01d8e91b2162bb027"
  },
  {
    "url": "assets/js/13.32c9c228.js",
    "revision": "6d4de9f6e9675a4a8716b42eb387b807"
  },
  {
    "url": "assets/js/14.34c4d234.js",
    "revision": "bdb5acba32a5085a0e027bcb2eb5d971"
  },
  {
    "url": "assets/js/15.4dc7fa03.js",
    "revision": "0255f11e5c129e1065452e59e2a8d3d0"
  },
  {
    "url": "assets/js/16.198ce758.js",
    "revision": "4affc583052e111fc95ec4b284b2b8d0"
  },
  {
    "url": "assets/js/17.bbf95844.js",
    "revision": "e256d2fd78132079443a4a77c8416f35"
  },
  {
    "url": "assets/js/18.a212a5d4.js",
    "revision": "4d2648a0e82b0262b5f40b5583d2c05b"
  },
  {
    "url": "assets/js/19.c735edcf.js",
    "revision": "6d4452e0b5b8482d00d521a0e37707d9"
  },
  {
    "url": "assets/js/20.8ba5e936.js",
    "revision": "3eb6d8b7081236103a5bbefa79a0ad8b"
  },
  {
    "url": "assets/js/21.6d282839.js",
    "revision": "a0952dc2b4013f95a4c10acfe114289f"
  },
  {
    "url": "assets/js/22.fd72d617.js",
    "revision": "3ffbf39f9bfbf6edc1475d0a721ac79b"
  },
  {
    "url": "assets/js/23.88b4302f.js",
    "revision": "90e458b71dd3eb951fc491654fe68d65"
  },
  {
    "url": "assets/js/24.a6844b30.js",
    "revision": "f1107ee22ada6a23ca71a9565ceb282c"
  },
  {
    "url": "assets/js/25.2e07815c.js",
    "revision": "5ca3c442d6d858c00d46bb70681b0983"
  },
  {
    "url": "assets/js/26.f3eaca70.js",
    "revision": "b8689e9ac07c9ac578953b06eec60a40"
  },
  {
    "url": "assets/js/27.c9fb41ed.js",
    "revision": "c4981145aa4cdd98ae086d0a540260a6"
  },
  {
    "url": "assets/js/28.f2c25e81.js",
    "revision": "a205f5e8fe66b500d89d9e9f5c7f61dc"
  },
  {
    "url": "assets/js/29.e940cafc.js",
    "revision": "04cfed8ee272d8ade7c177c008ed7e53"
  },
  {
    "url": "assets/js/3.0fd6f489.js",
    "revision": "31bf39661ac300baf1b8dd0fe0eb1bd2"
  },
  {
    "url": "assets/js/30.6c51a9f5.js",
    "revision": "9e0dda2c985d554a72ed6c00e12612d3"
  },
  {
    "url": "assets/js/31.3d8ad7ad.js",
    "revision": "b0e0bf3fbd527c952b851598b2e3bd01"
  },
  {
    "url": "assets/js/32.c87a3306.js",
    "revision": "8757d9c7a61d2b7e2007579ad60f061f"
  },
  {
    "url": "assets/js/33.0a962236.js",
    "revision": "dca369a87af473f264653c1535b3e37f"
  },
  {
    "url": "assets/js/34.292d6d45.js",
    "revision": "9b4f7b2651c7a58fef43f8b222188d72"
  },
  {
    "url": "assets/js/35.7cdb0bc7.js",
    "revision": "b62536b705994d82f6d250b871506712"
  },
  {
    "url": "assets/js/36.0b1c0af5.js",
    "revision": "2e808f9f53271454b8b70855704e22fa"
  },
  {
    "url": "assets/js/37.b1f79be8.js",
    "revision": "f16e54e41440ac24556211ef12e630fe"
  },
  {
    "url": "assets/js/38.163219df.js",
    "revision": "dfbe40a11eeaa1e7d24570263aeeb32b"
  },
  {
    "url": "assets/js/39.e2291e25.js",
    "revision": "ee4ef6f88292f218d70a534796a3c1b9"
  },
  {
    "url": "assets/js/4.f6ab7665.js",
    "revision": "4d20e53eb6d25f71d1abea1d70d6dc78"
  },
  {
    "url": "assets/js/40.f4bf3293.js",
    "revision": "d7e35fee2cf4f49cbc46ee30c9abe35b"
  },
  {
    "url": "assets/js/41.9ee76abe.js",
    "revision": "7cce1e74cb2e350cd22e3ba17f9d4641"
  },
  {
    "url": "assets/js/42.12f30a3b.js",
    "revision": "7cf6b09028fcbeb8529448456b69236b"
  },
  {
    "url": "assets/js/43.2c11cef9.js",
    "revision": "b30ccfdebafd8af59352272e9f7b3920"
  },
  {
    "url": "assets/js/44.be511023.js",
    "revision": "f6bde53f01af3e9ae86d2ed9c1a8f0cd"
  },
  {
    "url": "assets/js/45.5e68836d.js",
    "revision": "467c252dd6092ef646a21302bff1f7c9"
  },
  {
    "url": "assets/js/46.dcf07653.js",
    "revision": "ae24f90ee7b6d25dd5eb7873dcef0d67"
  },
  {
    "url": "assets/js/47.598889c8.js",
    "revision": "8e7baaa58607873c2ee0df420d392770"
  },
  {
    "url": "assets/js/5.e203aa1a.js",
    "revision": "08bf7171697bb981514dd95ac3c96f7b"
  },
  {
    "url": "assets/js/6.b25fa37c.js",
    "revision": "0d1a21c4b44b5bb147a5e59c05c81e33"
  },
  {
    "url": "assets/js/7.5d500630.js",
    "revision": "8f905372a6c5c568aa599243f645abea"
  },
  {
    "url": "assets/js/8.47f42958.js",
    "revision": "8050e3280eb0ee7075bc61d5b0b32981"
  },
  {
    "url": "assets/js/9.04a9874d.js",
    "revision": "6d23995276a27b0999c935ab9ec6bcbd"
  },
  {
    "url": "assets/js/app.6100065f.js",
    "revision": "e061d3056a514e920a0bdef8293d6c9b"
  },
  {
    "url": "counter/index.html",
    "revision": "4beb2c51e153f98959ce2882bbf28fc0"
  },
  {
    "url": "img/51563262972_.pic_hd.jpg",
    "revision": "663dfd17fd16e50a22688d699d7a3186"
  },
  {
    "url": "img/contact-bg.jpg",
    "revision": "90b89018c57623f25ff271dda0b322e8"
  },
  {
    "url": "img/logo.jpg",
    "revision": "4642280b71b71692fd8d5bf2bf7050cd"
  },
  {
    "url": "img/services-bg.jpg",
    "revision": "5222d76c2ce8a32d587fc6fc8e5f4da4"
  },
  {
    "url": "img/skills-bg.jpg",
    "revision": "ac55424d4f2e9cb3691f5eb9a4b65bf6"
  },
  {
    "url": "index.html",
    "revision": "bc8c5745120fe67c347a39062288196f"
  },
  {
    "url": "logo.jpg",
    "revision": "4642280b71b71692fd8d5bf2bf7050cd"
  },
  {
    "url": "nodeJs/index.html",
    "revision": "cc70f7abe8bc8236596368ddc1347edf"
  },
  {
    "url": "optimize/index.html",
    "revision": "05eaf7b45a011ade414788f2afe410b1"
  },
  {
    "url": "optimize/module.html",
    "revision": "ee9590c323d1a532e1f12856517e49f9"
  },
  {
    "url": "optimize/optimize.html",
    "revision": "e254d50bf7bee4c6d18f3f9c64d80646"
  },
  {
    "url": "optimize/source.html",
    "revision": "a34f0d0c5658ae886de53fed54e9e99b"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
