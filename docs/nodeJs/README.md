## 我是关于NodeJS

## 进程（process）和线程(thread)的区别
1.他们是操作系统的基本概念，计算机核心是CPU,它承担了所有的计算任务
2.单个CPU一次只能运行一个任务
3.进程它代表CPU所能处理的单个任务，任意时刻，CPU总是运行一个进程，其他进程处于非运行状态
4.一个进程可包含多个线程
5.一个进程的内存空间是共享的，每个线程都可以使用内存共享
6.防止其他线程使用的方法是"互斥锁" (Mutual exclusion, 简 Mutex),防止多个线程同时读写同一内存区域
7.某些内存区域，只能供给固定数目的的线程使用
操作系统的设计总：
(1). 以多进程的形式，允许多个任务同时进行
(2). 以多线程的形式，允许单个任务分成不同部分执行
(3). 提供协调机制，一方面防止进程之间和线程之间产生冲突，另一方面允许进程之间和线程之间共享资源。

## nodejs是以`V8 Javascript`引擎为执行引擎的以单线程为基础
1 单线程优势
* 高性能
   避免了传统php那样频繁创建，切换线程的开销，同时资源占用小
* 线程安全
    单线程的js保证了绝对的线程安全，不用担心同一变量被多线程读写而造成程序奔溃

2 单线程的异步和非阻塞
node.js是单线程的，但他的底层访问I/O还是多线程的
同步不代表阻塞（），阻塞一定是同步
同步非阻塞（食堂打饭，a点餐，工作人员配餐时(同步)，其他人继续点餐服务（非阻塞））
异步非阻塞（等待时a去买饮料，等叫号去拿餐，等餐同时买了饮料（异步））
阻塞 （a买饮料时，餐好了，可是饮料还需很久，所以a在叫号后很久才能拿到餐，就是单线程的阻塞）

## npm link 制作一个公共模块（npm module），本地测试的方法
1.创建一个npm init -y的模块 test-featchers-cli
2.在项目跟目录下运行npm link
3.改模块会被放到本地的全局{prefix}/lib/node_modules/<package>
   a. prefix: npm config get prefix (获取该值)
   b. win: C:\Users\DELL\AppData\Roaming\npm\node_modules下会出现该模块
4.本地某项目中： npm link test-featchers-cli
5.在本地项目中 require('test-featchers-cli') 即可使用该模块
6.修改test-featchers-cli ，只需重新运行本地项目就会更新到最新
   


