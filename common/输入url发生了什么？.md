/*
 * @Author: laifeipeng 
 * @Date: 2019-03-07 10:04:10 
 * @Last Modified by: laifeipeng
 * @Last Modified time: 2019-03-07 10:48:37
 */
1、DNS域名解析
2、简历TCP链接
3、发起HTTP请求
4、接收响应
5、浏览器解析HTML
6、浏览器布局渲染

dns预解析：<link rel="dns-prefetch" href="other.hostname.com">
http请求优化：
  1、css sprites
  2、Base64编码存储图片信息
  3、HTTP缓存
浏览器解析HTML


浏览器的构成：
1、用户界面User Interface
2、浏览器引擎Browser engine
3、渲染引擎Render engine
4、网络 Networking
5、JS解释器JavaScript Interperter
6、UI后端 UI Backend
7、数据持久化 Date Persistence

DOM树的构建、CSSOM树的构建===》渲染树的构建（Render Tree）
重排/回流---reflow
重绘---repaint


优化目标：
1、缩减白屏时间
2、降低首屏时间
3、提升交互流畅度
4、降低机器消耗

优化手段：
1、减少HTTP数量————雪碧图、脚本合并、精简代码
2、减少页面资源量————图片压缩、webp、脚本样式压缩
3、提升HTTP速度————CDN、缓存、DNS预解析
4、提升渲染速度————减少DOM数量、减少重排重绘、减少资源阻塞

5、同构直出
6、接口层合并（减少接口请求）
7、HTTP2多路复用
8、加载策略————按需加载、预加载、懒加载



另一种性能优化：
1、网络优化————DNS缓存、使用CDN、使用HTTP2
2、http请求————使用雪碧图和图片内联、合并脚本和样式文件、
3、减少资源加载时间————压缩静态资源、优化图片（压缩、webp）、资源并行下载（如下：）
    - 1、脚本异步延迟加载（async, defer）
    - 2、多域名下载文件（2-4，域名过多DNS查询会损耗时间）
    - 3、不适用@import
4、减少白屏时间————样式放顶不、脚本放底部、减少重定向、懒加载（如下）
    - 懒加载就是延迟加载，就是说需要用到的时候才加载，不用就不加载
    - 1、图片懒加载
    - 2、按需动态加载
5、减少DOM操作————重排重绘、合并DOM操作、缓存DOM信息和样式、使用文档片段、使用事件委托的方式绑定时间、使用虚拟DOM
6、缓存————浏览器缓存、html5 web存储（SessionStorage、LocalStorage、IndexedDB）