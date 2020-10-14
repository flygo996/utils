- [x] 闭包，作用域、词法作用域

- [x] new, call, apply, bind

- [x] typeof, instanced, constructor, Object.propotype.toString

- [x] Js 原始类型，引用类型【7+1】

  > - number
  > - string
  > - null
  > - undifined
  > - boolean
  > - symbol
  > - bigInt
  > - object

- [ ] js原型链，闭包

- [ ] XSS，CSRF

  > `XSS` 全称是 `Cross Site Scripting`(即`跨站脚本`)，为了和 CSS 区分，故叫它`XSS`。XSS 攻击是指浏览器中执行恶意脚本(无论是跨域还是同域)，从而拿到用户的信息并进行操作。主要分为`存储型`、`反射型`和`文档型`。防范的措施包括:
  >
  > - 一个信念: 不要相信用户的输入，对输入内容转码或者过滤，让其不可执行。
  > - 两个利用: 利用 CSP，利用 Cookie 的 HttpOnly 属性。

  > CSRF(Cross-site request forgery), 即跨站请求伪造，指的是黑客诱导用户点击链接，打开黑客的网站，然后黑客利用用户目前的登录状态发起跨站请求。
  >
  > `CSRF`攻击一般会有三种方式:
  >
  > - 自动 GET 请求
  > - 自动 POST 请求
  > - 诱导点击发送 GET 请求。
  >
  > 防范措施: `利用 Cookie 的 SameSite 属性`、`验证来源站点`和`CSRF Token`。
  >
  > > `SameSite`可以设置为三个值，`Strict`、`Lax`和`None`。
  > >
  > > **a.** 在`Strict`模式下，浏览器完全禁止第三方请求携带Cookie。比如请求`sanyuan.com`网站只能在`sanyuan.com`域名当中请求才能携带 Cookie，在其他网站请求都不能。
  > >
  > > **b.** 在`Lax`模式，就宽松一点了，但是只能在 `get 方法提交表单`况或者`a 标签发送 get 请求`的情况下可以携带 Cookie，其他情况均不能。
  > >
  > > **c.** 在`None`模式下，也就是默认模式，请求会自动携带上 Cookie。

  

- [x] tcp三次握手、4次挥手，

  > 为什么是3次握手，2次4次行不？什么时候可以传数据？
  >
  > 为什么是4次挥手，3次行不？，等待2MSL的作用（MSL：Maximum Segment Lifetime，报文最大生存时间）

- [ ] Https vs http, http1.0, http1.1, http2

- [ ] vue

  > Vue 双向绑定原理，vue 什么时候监听变化，compile过程
  >
  > Vue-router 源码，不用vue-router怎么搭建spa

- [ ] ajax如何实现、readyState五中状态的含义

- [ ] jsonp如何实现

- [ ] get和post的区别

  > 首先最直观的是语义上的区别。
  >
  > 而后又有这样一些具体的差别:
  >
  > - 从**缓存**的角度，GET 请求会被浏览器主动缓存下来，留下历史记录，而 POST 默认不会。
  > - 从**编码**的角度，GET 只能进行 URL 编码，只能接收 ASCII 字符，而 POST 没有限制。
  > - 从**参数**的角度，GET 一般放在 URL 中，因此不安全，POST 放在请求体中，更适合传输敏感信息。
  > - 从**幂等性**的角度，`GET`是**幂等**的，而`POST`不是。(`幂等`表示执行相同的操作，结果也是相同的)
  > - 从**TCP**的角度，GET 请求会把请求报文一次性发出去，而 POST 会分为两个 TCP 数据包，首先发 header 部分，如果服务器响应 100(continue)， 然后发 body 部分。(**火狐**浏览器除外，它的 POST 请求只发一个 TCP 包)

- [ ] 事件模型解释

- 编写一个元素拖拽的插件

- 编写一个contextmenu的插件

- 编写web端cookie的设置和获取方法

- xss和crsf的原理以及怎么预防

- meta viewport原理

- 前端优化策略列举

- 首屏、白屏时间如何计算

- [x] 浏览器缓存：强缓存、协商缓存【http://47.98.159.95/my_blog/http/014.html#cors】

- [x] 跨域，简单请求，非简单请求。

  > cors
  >
  > jsonp
  >
  > nginx
  >
  > postMessage, WebSocket


- [ ] https: [http://47.98.159.95/my_blog/http/015.html](http://47.98.159.95/my_blog/http/015.html#tls-1-2-握手过程)

- [ ] http2: [http://47.98.159.95/my_blog/http/017.html](http://47.98.159.95/my_blog/http/017.html#头部压缩)

- [x] script标签 的defer, async属性 https://blog.csdn.net/liuhe688/article/details/51247484 https://www.cnblogs.com/tangjiao/p/9024234.html

- [x] 如何让if(a==1 && a==2)条件成立？

- [x] js 继承 http://47.98.159.95/my_blog/js-base/006.html

- [x] v8执行一段代码的过程

  > 这就是 V8 中执行一段JS代码的整个过程，梳理一下:
  >
  > 1. 首先通过词法分析和语法分析生成 `AST`
  > 2. 将 AST 转换为字节码
  > 3. 由解释器逐行执行字节码，遇到热点代码启动编译器进行编译，生成对应的机器码, 以优化执行效率

- [ ] 

- [x] 如何理解**EventLoop**： http://47.98.159.95/my_blog/js-v8/004.html

  > 常见的微任务有MutationObserver、Promise.then(或.reject) 以及以 Promise 为基础开发的其他技术(比如fetch API), 还包括 V8 的垃圾回收过程。
  >
  > 常见的 macro task 有 **setTimeout、MessageChannel、postMessage、setImmediate**
  >
  > 常见的 micro task 有 **MutationObserver 和 Promise.then**

- [x] nodejs与浏览器的**EventLoop**的主要区别：

  > 两者最主要的区别在于浏览器中的微任务是在`每个相应的宏任务`中执行的，而nodejs中的微任务是在`不同阶段之间`执行的。
  >
  > > 梳理一下，nodejs 的 eventLoop 分为下面的几个阶段:
  > >
  > > 1. timer 阶段
  > > 2. I/O 异常回调阶段
  > > 3. 空闲、预备状态(第2阶段结束，poll 未触发之前)
  > > 4. poll 阶段
  > > 5. check 阶段
  > > 6. 关闭事件的回调阶段

- [ ] **process.nextTick** 是一个独立于 eventLoop 的任务队列。

  在每一个 eventLoop 阶段完成后会去检查这个队列，如果里面有任务，会让这部分任务`优先于微任务`执行。

- [ ] 浏览器原理，浏览器组成

- [ ] vue 的 nextTick

  > **在 vue2.5 的源码中，macrotask 降级的方案依次是：setImmediate、MessageChannel、setTimeout**
  >
  > vue 的 nextTick 方法的实现原理:
  >
  > 1. vue 用异步队列的方式来控制 DOM 更新和 nextTick 回调先后执行
  > 2. microtask 因为其高优先级特性，能确保队列中的微任务在一次事件循环前被执行完毕
  > 3. 考虑兼容问题,vue 做了 microtask 向 macrotask 的降级方案
  >
  >
  > 作者：null仔
  > 链接：https://juejin.im/post/5e04411f6fb9a0166049a073
  > 来源：掘金
  > 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

  > **vue2.6.11**的源码中降级方案为：
  >
  > Promise.then() --> MutiationObserver() --> setImmediate() --> setTimeout()

- [ ] 

## 简历亮点

- 图片懒加载：滚动到才加载，优化首屏；v-lazyload
- 首屏图片预渲染。
- 不变的数据放在localstorage，并设置过期时间
- es7装饰器，发送埋点

- 首页的预渲染（原理）
- 中文简体繁体转换脚本，直接用npm run s2t就行了

- [ ] 25.v-for key 的作用：https://juejin.im/post/5d13436f6fb9a07eca698ba0

- [ ] 28.Promise对象是什么？https://juejin.im/post/5d13436f6fb9a07eca698ba0
- [ ] 32.`$router`, `$route` 的区别

> `$route`是“路由信息对象”，包括`path，params，hash，query，fullPath，matched，name`等路由信息参数。
> `$router`是'路由实例'对象包括了路由的跳转方法，钩子函数等。

## 聊聊你对Vue.js的template编译的理解

先转化成AST树，再得到render函数返回VNode（Vue的虚拟DOM节点）

详细步骤：首先通过compile编译器把template编译出AST语法树，然后AST会经过generate（将AST语法树转化成render function字符串的过程）得到render函数，render的返回值是VNode，VNode是Vue的虚拟DOM节点，里面有标签名，子节点，文本等


作者：鶓
链接：https://juejin.im/post/5c6621565188256220140756
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

## Vue中的key到底有什么用？

`key`是为Vue中的vnode标记的唯一id,通过这个key,我们的diff操作可以更准确、更快速

diff算法的过程中,先会进行新旧节点的首尾交叉对比,当无法匹配的时候会用新节点的`key`与旧节点进行比对,然后超出差异.

> diff程可以概括为：oldCh和newCh各有两个头尾的变量StartIdx和EndIdx，它们的2个变量相互比较，一共有4种比较方式。如果4种比较都没匹配，如果设置了key，就会用key进行比较，在比较的过程中，变量会往中间靠，一旦StartIdx>EndIdx表明oldCh和newCh至少有一个已经遍历完了，就会结束比较,这四种比较方式就是首、尾、旧尾新头、旧头新尾.

- 准确: 如果不加`key`,那么vue会选择复用节点(Vue的就地更新策略),导致之前节点的状态被保留下来,会产生一系列的bug.
- 快速: key的唯一性可以被Map数据结构充分利用,相比于遍历查找的时间复杂度O(n),Map的时间复杂度仅仅为O(1).

作者：寻找海蓝96
链接：https://juejin.im/post/5d41eec26fb9a06ae439d29f
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



响应式系统简述:

- 任何一个 Vue Component 都有一个与之对应的 Watcher 实例。
- Vue 的 data 上的属性会被添加 getter 和 setter 属性。
- 当 Vue Component render 函数被执行的时候, data 上会被 触碰(touch), 即被读, getter 方法会被调用, 此时 Vue 会去记录此 Vue component 所依赖的所有 data。(这一过程被称为依赖收集)
- data 被改动时（主要是用户操作）, 即被写, setter 方法会被调用, 此时 Vue 会去通知所有依赖于此 data 的组件去调用他们的 render 函数进行更新。

作者：寻找海蓝96
链接：https://juejin.im/post/5d41eec26fb9a06ae439d29f
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



## 虚拟DOM的优劣如何?

优点:

- 保证性能下限: 虚拟DOM可以经过diff找出最小差异,然后批量进行patch,这种操作虽然比不上手动优化,但是比起粗暴的DOM操作性能要好很多,因此虚拟DOM可以保证性能下限
- 无需手动操作DOM: 虚拟DOM的diff和patch都是在一次更新中自动进行的,我们无需手动操作DOM,极大提高开发效率
- 跨平台: 虚拟DOM本质上是JavaScript对象,而DOM与平台强相关,相比之下虚拟DOM可以进行更方便地跨平台操作,例如服务器渲染、移动端开发等等

缺点:

- 无法进行极致优化: 在一些性能要求极高的应用中虚拟DOM无法进行针对性的极致优化,比如VScode采用直接手动操作DOM的方式进行极端的性能优化

作者：寻找海蓝96
链接：https://juejin.im/post/5d41eec26fb9a06ae439d29f
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。



## 虚拟DOM实现原理?

- 虚拟DOM本质上是JavaScript对象,是对真实DOM的抽象
- 状态变更时，记录新树和旧树的差异
- 最后把差异更新到真正的dom中





## 既然Vue通过数据劫持可以精准探测数据变化,为什么还需要虚拟DOM进行diff检测差异?

考点: Vue的变化侦测原理

前置知识: 依赖收集、虚拟DOM、响应式系统

现代前端框架有两种方式侦测变化,一种是pull一种是push

pull: 其代表为React,我们可以回忆一下React是如何侦测到变化的,我们通常会用`setState`API显式更新,然后React会进行一层层的Virtual Dom Diff操作找出差异,然后Patch到DOM上,React从一开始就不知道到底是哪发生了变化,只是知道「有变化了」,然后再进行比较暴力的Diff操作查找「哪发生变化了」，另外一个代表就是Angular的脏检查操作。

push: Vue的响应式系统则是push的代表,当Vue程序初始化的时候就会对数据data进行依赖的收集,一但数据发生变化,响应式系统就会立刻得知,因此Vue是一开始就知道是「在哪发生变化了」,但是这又会产生一个问题,如果你熟悉Vue的响应式系统就知道,通常一个绑定一个数据就需要一个Watcher,一但我们的绑定细粒度过高就会产生大量的Watcher,这会带来内存以及依赖追踪的开销,而细粒度过低会无法精准侦测变化,因此Vue的设计是选择中等细粒度的方案,在组件级别进行push侦测的方式,也就是那套响应式系统,通常我们会第一时间侦测到发生变化的组件,然后在组件内部进行Virtual Dom Diff获取更加具体的差异,而Virtual Dom Diff则是pull操作,Vue是push+pull结合的方式进行变化侦测的.

## Vue为什么没有类似于React中shouldComponentUpdate的


作者：寻找海蓝96
链接：https://juejin.im/post/5d41eec26fb9a06ae439d29f
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

